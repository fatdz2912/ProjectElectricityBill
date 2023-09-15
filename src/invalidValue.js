export var checkEmpty = (element) =>
element.value === null || element.value === "";
export var checknumber = (value) => isNaN(value) || value < 0;
export var compareValue = (value1,value2) => value1 > value2;