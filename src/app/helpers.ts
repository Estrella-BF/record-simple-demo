export const blobToB64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, _reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};
