export const dateConverter = (timestamp) => {
  //const date = new Date(timestamp);
  //return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  return timestamp.substring(0, 10);
};
