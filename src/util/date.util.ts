export const dateToNumber = (date: Date | string | number): number => {
  if (!date) {
    return -1;
  }

  if (date instanceof Date) {
    return date.getTime();
  }

  date = new Date(date);

  return date.getTime();
};
