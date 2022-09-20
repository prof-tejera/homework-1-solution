import fetch from "node-fetch";
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = "https://nt-cdn.s3.amazonaws.com/colors.json";

// Helpers
const matchColor = (color1, color2) =>
  color1 && color1.toLowerCase().includes(color2 && color2.toLowerCase());

const matchHex = (hex1, hex2) => hex1 === hex2;

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */
const fetchColors = ({ name, hex, compName, compHex }) => {
  return fetch(COLORS)
    .then((r) => r.json())
    .then((colors) =>
      colors.filter((color) => {
        if (name) {
          return matchColor(color.name, name);
        }

        if (hex) {
          return matchHex(color.hex, hex);
        }

        if (compName) {
          return color.comp.some(({ name }) => matchColor(name, compName));
        }

        if (compHex) {
          return color.comp.some(({ hex }) => matchColor(hex, compHex));
        }
      })
    );
};

// Leave this here
export default fetchColors;
