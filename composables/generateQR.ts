import QRCode from "qrcode";

const generateQR = async (url: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(url);
  } catch (err) {
    console.error(err);
    return "";
  }
};
export default generateQR;
