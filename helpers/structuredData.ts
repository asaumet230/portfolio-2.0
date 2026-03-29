export function toJsonLd(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
