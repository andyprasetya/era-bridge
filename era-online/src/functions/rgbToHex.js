// Convert RGB to hex
function componentToHex(c) {
  if (!c) c = Math.floor(Math.random() * 256);
  let xInt = parseInt(c);
  if (xInt < 0 || xInt > 255) {
    xInt = 255;
  }
  const hex = xInt.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
