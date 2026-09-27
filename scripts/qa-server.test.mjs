import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { after, before, test } from 'node:test';

const ORIGIN = 'http://127.0.0.1:4173';
let server;

before(async () => {
  server = spawn(process.execPath, ['scripts/qa-server.mjs'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('QA server did not start')), 5_000);
    server.once('exit', (code) => reject(new Error(`QA server exited with code ${code}`)));
    server.stdout.setEncoding('utf8');
    server.stdout.on('data', (chunk) => {
      if (!chunk.includes('qa server ready')) return;
      clearTimeout(timeout);
      resolve();
    });
  });
});

after(() => server?.kill());

test('serves files from dist', async () => {
  assert.equal((await fetch(`${ORIGIN}/`)).status, 200);
});

test('serves readable PDF and Word downloads with the correct media types', async () => {
  const pdf = await fetch(`${ORIGIN}/documents/paper-template.pdf`);
  assert.equal(pdf.status, 200);
  assert.equal(pdf.headers.get('content-type'), 'application/pdf');
  assert.equal(Buffer.from(await pdf.arrayBuffer()).subarray(0, 5).toString(), '%PDF-');

  const docx = await fetch(`${ORIGIN}/documents/submission-originality-responsibility-confirmation.docx`);
  assert.equal(docx.status, 200);
  assert.equal(docx.headers.get('content-type'), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  assert.equal(Buffer.from(await docx.arrayBuffer()).readUInt32LE(0), 0x04034b50);
});

test('rejects encoded traversal outside dist', async () => {
  const paths = [
    '/..%2fpackage.json',
    '/..%2f.git%2fconfig',
    '/..%2f..%2f..%2f..%2f..%2f..%2fetc%2fpasswd',
  ];

  for (const path of paths) {
    assert.equal((await fetch(`${ORIGIN}${path}`)).status, 404, path);
  }
});
