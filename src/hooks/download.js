const useDownload = () => {
  const download = (result, name='') => {
    var blob = new Blob([result], { type: "application/octet-stream" });
    var url = URL.createObjectURL(blob);
    var exportLink = document.createElement("a");
    exportLink.setAttribute("download", name);
    exportLink.href = url;
    document.body.appendChild(exportLink);
    exportLink.click();
  };

  return { download };
};

export default useDownload;
