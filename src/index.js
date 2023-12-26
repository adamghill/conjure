import { proxyHandler } from "./proxy.js";
import { parse } from "./parser.js";

(() => {
  CONJURE_USE_EVAL = CONJURE_USE_EVAL || false;

  // global proxy object to store values
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
  window.conjure = window.conjure || new Proxy({}, proxyHandler);

  /**
   * Main function
   */
  (() => {
    document.addEventListener("DOMContentLoaded", () => {
      ["click"].forEach((action) => {
        document.addEventListener(action, (e) => {
          const attributeName = `:${action}`;

          if (e.target.hasAttribute(attributeName)) {
            setProxy(e.target, attributeName);
          }
        });
      });
    });
  })();

  /**
   * Sets the value on the proxy object.
   * @param {Element} el
   * @param {String} attributeName
   */
  function setProxy(el, attributeName) {
    const attributeValue = el.attributes[attributeName].value;

    let [prop, value] = attributeValue.split("=");
    prop = prop.trim();
    value = value.trim();

    // handle getting a value from the conjure proxy object
    if (value.startsWith("conjure.")) {
      value = value.substring(8, value.length);

      if (typeof window.conjure[value] !== "undefined") {
        value = window.conjure[value];
      }
    } else {
      value = parse(value);
    }

    window.conjure[prop] = value;
  }
})();
