/**
 * NFC bookmark series 《我还是昨天的我吗》 — ISSUE 03 · 预热 Preheat 2026.
 * Seven physical bookmarks; each carries an NFC tag and QR code pointing at
 * `sspcz.org/b/[id]`. This file is the single source for the landing pages
 * under src/pages/b/. Content is fixed by the committee — do not edit copy.
 */

export interface Bookmark {
  /** URL id, printed into the NFC tag and QR code — never change. */
  id: string;
  /** Series number, 01–07. */
  no: string;
  /** Series section label, e.g. §1 变 · FLUX. */
  section: string;
  name_cn: string;
  name_en: string;
  /** School / dates line. */
  meta: string;
  quote_cn: string;
  /** Empty string when the card carries no English rendering. */
  quote_en: string;
  source: string;
  context: string;
}

export const bookmarks: Bookmark[] = [
  {
    id: '7q',
    no: '01',
    section: '§1 变 · FLUX',
    name_cn: '赫拉克利特',
    name_en: 'Heraclitus',
    meta: '流变论者 · 以弗所学派 · 约前540–480',
    quote_cn: '人不能两次踏入同一条河流。',
    quote_en: 'No man ever steps in the same river twice.',
    source: '论自然 · 残篇 B12',
    context: '水在流,踏入河的你也在变。赫拉克利特立起「变」的一极:万物流转,无物常驻。',
  },
  {
    id: 'k3',
    no: '02',
    section: '§2 不变 · BEING',
    name_cn: '巴门尼德',
    name_en: 'Parmenides',
    meta: '存在论者 · 埃利亚学派 · 约前515',
    quote_cn: '能被思考的,与能存在的,是同一的。',
    quote_en: 'For thinking and being are the same.',
    source: '论自然 · 残篇 B3',
    context: '与赫拉克利特相对的一极:真正「存在」的东西不生不灭、不动不变;变化只是名称。',
  },
  {
    id: 'x9',
    no: '03',
    section: '§3 求索 · INQUIRY',
    name_cn: '苏格拉底',
    name_en: 'Socrates',
    meta: '诘问法 · 雅典 · 前470–399',
    quote_cn: '未经省察的人生,是不值得过的。',
    quote_en: 'The unexamined life is not worth living.',
    source: '申辩篇 · 38A',
    context: '法庭之上,苏格拉底为自己的哲学生活辩护时所说。省察,是哲学的第一个动作。',
  },
  {
    id: 'm2',
    no: '04',
    section: '§4 教育 · EDUCATION',
    name_cn: '康德',
    name_en: 'Immanuel Kant',
    meta: '批判哲学 · 1724–1804',
    quote_cn: '人,只有通过教育,才能成为人。',
    quote_en: 'Man can only become man through education.',
    source: '论教育学 · Über Pädagogik',
    context: '人并非生而为「人」——在康德看来,教育是从自然通向人性的那道门。',
  },
  {
    id: 'p8',
    no: '05',
    section: '§5 人 · HUMANITY',
    name_cn: '亚里士多德',
    name_en: 'Aristotle',
    meta: '吕克昂 · 逍遥学派 · 前384–322',
    quote_cn: '人,在本性上,是趋向城邦的动物。',
    quote_en: 'Man is by nature a political animal.',
    source: '政治学 · 1253a',
    context: '人天然要生活在共同体之中;在亚里士多德那里,脱离城邦者,非神即兽。',
  },
  {
    id: 'w4',
    no: '06',
    section: '§6 责任 · RESPONSIBILITY',
    name_cn: '汉娜·阿伦特',
    name_en: 'Hannah Arendt',
    meta: '政治哲学 · 行动者 · 1906–1975',
    quote_cn: '没有人有权利,仅仅是服从。',
    quote_en: 'No one has the right merely to obey.',
    source: '1964 年访谈',
    context: '面对「我只是服从命令」的辩解,阿伦特回答:服从不能替代思考与判断。',
  },
  {
    id: 'e6',
    no: '07',
    section: '§7 化 · TRANSFORMATION',
    name_cn: '庄子',
    name_en: 'Zhuangzi',
    meta: '道家 · 约前369–286',
    quote_cn: '不知周之梦为胡蝶与?胡蝶之梦为周与?',
    quote_en: '',
    source: '庄子 · 齐物论',
    context: '《齐物论》以此收束:周与胡蝶必有分——此之谓物化。是庄周梦见了蝴蝶,还是蝴蝶梦见了庄周?',
  },
];
