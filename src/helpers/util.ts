export function getContrastRatio(color1: string, color2: string) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const luminance1 = calculateLuminance(rgb1);
  const luminance2 = calculateLuminance(rgb2);

  const ratio =
    (Math.max(luminance1, luminance2) + 0.05) /
    (Math.min(luminance1, luminance2) + 0.05);

  return ratio;
}

function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

function calculateLuminance(rgb: { r: any; g: any; b: any }) {
  const { r, g, b } = rgb;
  const sRGB = [r / 255, g / 255, b / 255];

  for (let i = 0; i < 3; i++) {
    if (sRGB[i] <= 0.03928) {
      sRGB[i] = sRGB[i] / 12.92;
    } else {
      sRGB[i] = Math.pow((sRGB[i] + 0.055) / 1.055, 2.4);
    }
  }

  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}
