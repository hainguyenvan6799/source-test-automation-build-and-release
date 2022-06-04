/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
function getSpecificValueInObject(object, keyName: string, value: string, arr: Array<Record<string, any>> = []) {
  if (object && object[keyName] === value) {
    arr.push(object);
  }

  for (const property in object) {
    typeof object[property] === 'object' &&
      getSpecificValueInObject(object[property], keyName, value, arr);
  }
  return arr;
}

export {
  getSpecificValueInObject
};