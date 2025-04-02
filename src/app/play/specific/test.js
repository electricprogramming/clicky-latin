/** 
 * @overload
 * @param {string} value
 * @return {void}
 */

/** 
 * @overload
 * @param {number} value
 * @param {number} [maximumFractionDigits]
 * @return {void}
 */

/**
 * @param {string | number} value
 * @param {number} [maximumFractionDigits]
 */
function printValue(value, maximumFractionDigits) {
  if (typeof value === "number") {
      const formatter = Intl.NumberFormat("en-US", {
          maximumFractionDigits,
      });
      value = formatter.format(value);
  }

  console.log(value);
}