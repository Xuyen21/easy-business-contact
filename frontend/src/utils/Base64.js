export function getBase64(file) {
  return new Promise(resolve => {
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    reader.onload = () => {
      // Make a fileInfo Object
      let base64String = reader.result;
      resolve(base64String);
    };
  });
};
