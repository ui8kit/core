import { Entries, Tokens } from "../types";
import { colorTokens, coloredEntries } from "./color";
import { coreClassesMap } from './core';
import { sizeTokens, sizedEntries } from "./spacing";
import { srClassesMap } from './sr';
import { transformClassesMap } from './transforms';

function generateCombinationObject(entries: Entries, tokens: Tokens): Entries {
  const combinationObject: Entries = {};

  for (const classKey in entries) {
    const cssProperty: string = entries[classKey];
    for (const tokenKey in tokens) {
      const tokenValue: string = tokens[tokenKey];
      const className: string = `${classKey}-${tokenKey}`;
      combinationObject[className] = `${cssProperty}: ${tokenValue}`;
    }
  }
  return combinationObject;
}

const sizedClassesMap: Entries = generateCombinationObject(sizedEntries, sizeTokens);
const coloredClassesMap: Entries = generateCombinationObject(coloredEntries, colorTokens);

export const classMap: Entries = {
  ...coreClassesMap,
  ...sizedClassesMap,
  ...coloredClassesMap,
  ...transformClassesMap,
  ...srClassesMap
};

