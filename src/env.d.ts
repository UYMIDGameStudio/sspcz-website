/// <reference types="astro/client" />

declare module '*.yaml' {
  const data: unknown;
  export default data;
}
