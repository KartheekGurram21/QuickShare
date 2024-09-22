export const downloadBlob = (data, fileName, fileType) => {
    const blob = new Blob([data], { type: fileType });
    const downloadUrl = URL.createObjectURL(blob);

    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName || 'downloaded_file');
    document.body.appendChild(link);
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(downloadUrl);
};
