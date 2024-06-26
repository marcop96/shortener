export default function validateURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    alert("Invalid URL");
    return false;
  }
}
