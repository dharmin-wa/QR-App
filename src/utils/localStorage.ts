export const loadStateFn = (params: string = "token") => {
  const item = localStorage.getItem(params);
  return item ? JSON.parse(item) : null;
};

export const saveStateFn = (key: any, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const clearStateFn = () => localStorage.clear();

export const removeStateFn = (key: any) => localStorage.removeItem(key);
