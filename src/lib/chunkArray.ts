export const chunkArray = <T>(array: Array<T>, chunkSize: number) => {
  const numberOfChunks = Math.ceil(array.length / chunkSize);

  return [...Array(numberOfChunks)].map((_, index) =>
    array.slice(index * chunkSize, (index + 1) * chunkSize),
  );
};
