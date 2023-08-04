export const convertToTimestamp = (timestamp) => {
  if (timestamp) {
    return timestamp.toMillis();
  }
  return null;
};
