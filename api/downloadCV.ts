
//* FROM SERVER:
export const downloadCV = async () => {

  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/files/download/`);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'andres-felipe-CV.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();

  } catch (error) {
    console.log(error);
  }
}

//* FROM NEXT 13 SERVER:
export const handleDownload = async () => {
  const response = await fetch('/api/downloadcv', {
    method: 'GET',
  });

  if (response.ok) {

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'andres-felipe-saumet-web-mobil-developer.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();

  } else {

    console.error('Error al descargar el archivo');
  }
};