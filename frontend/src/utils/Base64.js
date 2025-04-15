export function getBase64(file) {
  return new Promise(resolve => {
    let fileInfo;
    let baseURL = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    reader.onload = () => {
      // Make a fileInfo Object
      let base64String = reader.result;
      // Remove the prefix to get only the base64 data
      const base64Content = base64String.split(',')[1];
      console.log(base64Content);
      resolve(base64Content);
    };
  });
};
