import { xpath } from "./crawler.js";
import { parse } from "./parser.js";
import { cleanString, substring } from "./strings.js";

export const proxyHandler = {
  set(obj, prop, value) {
    // skip values which are undefined
    if (typeof value !== "undefined") {
      obj[prop] = value;

      // set the value on any element that has a `:value` attribute with the specified prop
      for (const node of xpath("//@*[name()=':value']")) {
        const attributeProp = node.value;

        if (attributeProp === prop) {
          const el = node.ownerElement;
          el.value = value;
        }
      }

      // update the classes on any element that has a `:class` attribute which
      // uses the specified prop
      for (const node of xpath("//@*[name()=':class']")) {
        // TODO: Use EVAL here instead of parsing?

        const attributeProp = substring(node.value, null, "==");

        if (attributeProp === prop) {
          const el = node.ownerElement;

          const attributeValue = el.attributes[":class"].value;
          const evaluator = parse(substring(attributeValue, "==", "?"));

          // get the values when the result is true/false
          const trueResult = cleanString(substring(attributeValue, "?", ":"));
          const falseResult = cleanString(substring(attributeValue, ":"));

          // compare the current value to the evaluator
          const value = window.conjure[prop];

          if (value === evaluator) {
            el.classList.add(trueResult);
            el.classList.remove(falseResult);
          } else {
            el.classList.add(falseResult);
            el.classList.remove(trueResult);
          }
        }
      }
    }

    return true;
  },
};
