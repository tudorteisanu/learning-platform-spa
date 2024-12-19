
function isPropValuesEqual<T>(subject: T, target: T, propName: keyof T) {
  return subject[propName] === target[propName];
}

function getUniqueItemsByProperties<T>(items: T[], propName: keyof T) {
  return items.reverse().filter((item, index, array) => {
    return index === array.findIndex(foundItem => isPropValuesEqual(foundItem, item, propName));
  }).reverse();
};

export function booleanTransformer(value: string | boolean | number) {
  switch(typeof value) {
    case 'boolean':
      return value;
    case 'string':
      return ['', 'true'].includes(value.toLocaleLowerCase());
    default:
      return Boolean(value);
  }
}

export function unionArraysByAscendPriority<T>(firstArr: T[], secondArr: T[], propName: keyof T): T[] {
  return getUniqueItemsByProperties(firstArr.concat(secondArr), propName);
}
