export const loadStateFn = (params = "token") => localStorage.getItem(params);

export const saveStateFn = (key: any, value: any) =>
  localStorage.setItem(key, value);

export const clearStateFn = () => localStorage.clear();

export const removeStateFn = (key: any) => localStorage.removeItem(key);
