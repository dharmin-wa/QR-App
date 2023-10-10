import moment from "moment";

export const equal = (obj1: any, obj2: any = 0) => obj1 === obj2;

export const lowerCase = (value: string) => value?.toLowerCase();

export const upperCase = (value: string) => value?.toUpperCase();

export const ternary = (bool: boolean, truthy: any, falsy: any) =>
  bool ? truthy : falsy;

export const length = (obj: any) => obj?.length;

export const head = (obj: Array<any>) => obj?.[0];

export const last = (obj: Array<any>) => obj[length(obj) - 1];

export const getObject = (array: Array<any>, key: string | number) => {
  return array.find((obj) => equal(obj.name, key));
};

export const values = (object: any) => (object ? Object.values(object) : []);

export const keys = (object: any) => (object ? Object.keys(object) : []);

export const isArray = (obj: any) => Array.isArray(obj);

export const getMonth = (value: string | number) => {
  const joinedAtDate = moment(value);
  return joinedAtDate.format("MMMM");
};

export const getYear = (value: string | number) => {
  const joinedAtDate = moment(value);
  return joinedAtDate.year();
};

export const checkUndefined = (obj: any) => obj === undefined;

export const typeOf = (val: any, type: any) => equal(typeof val, type);

export const capitalizedString = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);
