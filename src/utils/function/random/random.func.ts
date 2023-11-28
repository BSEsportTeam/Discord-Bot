export const generateRandomValue = (max: number): number => {
  const random = Math.random();
  return Math.floor(random * (max + 1));
};

export const getRandomValueFromArray = <T>(array: T[]): T | undefined => {
  if (array.length === 0) {
    return undefined; // Return undefined if the array is empty
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};