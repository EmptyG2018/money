const Component = ({ byte = 0, decimals = 2 }) => {
  if (byte === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = parseInt(Math.floor(Math.log(byte) / Math.log(1024)));

  return (
    parseFloat((byte / Math.pow(1024, i)).toFixed(decimals)) + " " + sizes[i]
  );
};

export default Component;
