// @flow
import {
  printChildren,
  printElement,
  printElementAsLeaf,
  printProps,
} from 'pretty-format/build/plugins/lib/markup';

type VNode = {
  sel: ?string,
  data: ?Object,
  children: ?((string | VNode)[]),
  elm: ?Node,
  text: ?string,
  key: ?(string | number),
};

/* extract only tag name
import Tokenizer from 'css-selector-tokenizer';

const elementType = (elem: VNode): string => {
  const { nodes } = Tokenizer.parse(elem.sel || 'UNDEFINED').nodes[0];
  return (
    (nodes.find(node => node.type === 'element') || {}).name || 'UNDEFINED'
  );
};
*/
const elementType = (elem: VNode): string => elem.sel || 'UNDEFINED';

const elementProps = (elem: VNode): Object => {
  const data = elem.data || {};

  // avoid rendering ns={undefined} everywhere for JSX snabbdom nodes
  if (data.ns === undefined) delete data.ns;

  // transfer data.props, avoiding conflicts
  Object.keys(data.props || {})
    .filter(key => data[key] === undefined)
    .forEach(key => {
      data[key] = data.props[key];
      delete data.props[key];
    });
  // data.props might be empty now
  if (!Object.keys(data.props || {}).length) delete data.props;

  return data;
};

const elementChildren = (elem: VNode): (Object | string)[] =>
  (elem.children || []).map(
    // replace text nodes with plain strings for printChildren rendering
    child => {
      if (child === null || child === undefined) {
        return '';
      }

      return typeof child === 'object' && child.text !== undefined
        ? String(child.text)
        : child;
    },
  );

export const serialize = (
  elem: VNode,
  config: Object,
  indentation: string,
  depth: any,
  refs: any,
  printer: any,
): string => {
  const type = elementType(elem);
  const props = elementProps(elem);
  const children = elementChildren(elem);
  return ++depth > config.maxDepth // eslint-disable-line no-param-reassign, no-plusplus
    ? printElementAsLeaf(type, config)
    : printElement(
        type,
        printProps(
          Object.keys(props),
          props,
          config,
          indentation + config.indent,
          depth,
          refs,
          printer,
        ),
        printChildren(
          children,
          config,
          indentation + config.indent,
          depth,
          refs,
          printer,
        ),
        config,
        indentation,
      );
};

export const test = (val: any): boolean =>
  val &&
  typeof val === 'object' &&
  ((val.sel && val.data) || val.text !== undefined);

export default { test, serialize };
