export class SafeString {
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}

function htmlEscape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function html(strings, ...values) {
  let [result] = strings;

  for (const [i, val] of values.entries()) {
    const valArray = Array.isArray(val) ? val : [val];
    const processedVal = valArray
      .map((item) => item instanceof SafeString ? item.value : htmlEscape(item))
      .join("");

    result += processedVal + strings[i + 1];
  }

  return new SafeString(result);
}
