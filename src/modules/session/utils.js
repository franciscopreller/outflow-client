export function parseLines(lines) {
  return lines.map((line) => (
    line.map(fragment => parseLineFragment(fragment)).join(''))
  );
}

export function parseLineFragment(fragment) {
  let styles = `color: ${fragment.codes.fg}; background: ${fragment.codes.bg};`;
  if (fragment.codes.types) {
    fragment.codes.types.forEach((t) => {
      switch (t) {
        case 'bold':
          // For now do nothing, later change color
          // styles += ' font-weight: bold;';
          break;
        case 'italic':
          styles += ' text-decoration: italic;';
          break;
        case 'underline':
          styles += ' text-decoration: underline;';
          break;
        default:
          break;
      }
    });
  }
  // Replace all whitespaces with non breaking spaces then inject it into span
  return `<span style="${styles}">${escapeForHtml(fragment.text)}</span>`;
}

export function escapeForHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/ /g, '\u00a0')
    .replace(/(?:\r\n|\r|\n)/g, '<br />');
}
