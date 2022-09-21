import fetch from "node-fetch";
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = "https://nt-cdn.s3.amazonaws.com/colors.json";

// Helpers
const matchColor = ({ check, filter }) =>
  check && check.toLowerCase().includes(filter && filter.toLowerCase());

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
          return matchColor({ check: color.name, filter: name });
        }

        if (hex) {
          return hex === color.hex;
        }

        if (compName) {
          return color.comp.some(({ name }) =>
            matchColor({ filter: compName, check: name })
          );
        }

        if (compHex) {
          return color.comp.some((compColor) => compHex === compColor.hex);
        }
      })
    );
};

// Leave this here
export default fetchColors;
