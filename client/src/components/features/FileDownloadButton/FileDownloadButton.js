import { API_URL } from '../../../config';

export const FileDownloadButton = (props) => {
  const handleDownload = (e) => {
    e.preventDefault();

    fetch(`${API_URL}${props.fileEndpointPath}`, { method: 'GET' })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response error');
        }
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${props.fileName}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((error) => {
        console.error('Error downloading the file:', error);
      });
  };

  return (
    <div>
      <button onClick={handleDownload}>Pobierz</button>
    </div>
  );
};
