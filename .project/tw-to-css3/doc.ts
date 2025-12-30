import { classMap } from "./classes";

export const generateTableContent = (): string => {
  let tableContent: string = '<table><thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>';

  for (const key in classMap) {
    tableContent += `<tr><td>${key}</td><td>${classMap[key]}</td></tr>`;
  }

  tableContent += '</tbody></table>';

  return tableContent;
};
