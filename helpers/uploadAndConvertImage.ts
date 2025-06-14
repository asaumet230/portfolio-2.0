import { ConvertedFile } from "@/interfaces";


export const uploadAndConvertImage = (file: File, format: string, onProgress: (percent: number) => void): Promise<ConvertedFile> => {

  return new Promise((resolve, reject) => {
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        onProgress(100);
        resolve(response.file);
      } else {
        reject(`Error ${xhr.statusText}`);
      }
    };

    xhr.onerror = () => reject('Error de red');
    xhr.send(formData);
  });
};
