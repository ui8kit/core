// convert.ts

import { classMap } from "./classes";
import { squareBracketClassesMap } from "./classes/squareBracket";

export function convertTailwindToCSS(classes: string): string {
    const classNames = classes.trim().split(' ');
    let cssString = '';
    
    classNames.forEach(className => {
        const cssProp = classMap[className];
        if (cssProp) {
            cssString += `\t${cssProp};\n`;
        } else {
            const matches = className.match(/(.+?)\[(.+?)\]/);
            if (matches) {
                const baseClassName = matches[1];
                const value = matches[2];
                const baseClassKey = Object.keys(squareBracketClassesMap).find(key => baseClassName.startsWith(key));
                if (baseClassKey) {
                    const cssPrefix = squareBracketClassesMap[baseClassKey];
                    cssString += `\t${cssPrefix} ${value};\n`;
                }
            }
        }
    });
    
    return cssString.trim();
}

