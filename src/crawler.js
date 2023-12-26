/**
 * XPath query for the document that yields nodes.
 * From https://denizaksimsek.com/2023/xpath/.
 * @param  {...any} args
 */
export function* xpath(...args) {
  let path,
    root = document;

  if (args.length > 1) {
    [root, path] = args;
  } else {
    [path] = args;
  }

  const nodeIterator = document.evaluate(
    path,
    root,
    null,
    XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
    null
  );

  try {
    for (
      let node = nodeIterator.iterateNext();
      node != null;
      node = nodeIterator.iterateNext()
    ) {
      yield node;
    }
  } catch (err) {
    // console.log(err);
  }
}
