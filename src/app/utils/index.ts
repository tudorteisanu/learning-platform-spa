
function isPropValuesEqual<T>(subject: T, target: T, propName: keyof T) {
  return subject[propName] === target[propName];
}

function getUniqueItemsByProperties<T>(items: T[], propName: keyof T) {
  return items.reverse().filter((item, index, array) => {
    return index === array.findIndex(foundItem => isPropValuesEqual(foundItem, item, propName));
  });
};

function sortArray<T>(array: T[], property: keyof T, direction: "ASC" | "DESC" = 'ASC'): T[] {
  if (!Array.isArray(array)) {
    throw new Error("The first argument must be an array.");
  }

  const compare = (a: T, b: T) => {
    const valueA = a[property];
    const valueB = b[property];

    if (valueA == null || valueB == null) {
      return 0; // Handle undefined or null values gracefully
    }

    if (valueA < valueB) return direction === 'ASC' ? -1 : 1;
    if (valueA > valueB) return direction === 'ASC' ? 1 : -1;

    return 0;
  };

  return array.slice().sort(compare);
}

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
  return sortArray(getUniqueItemsByProperties(firstArr.concat(secondArr), propName), propName);
}
