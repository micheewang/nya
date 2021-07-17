'use strict';

import { isString } from './util';

const NYA_ELEMENT = Symbol('nya.element');

type $ElementNode = string | number | $Element | false | null;
type $ElementChildren = $ElementNode[];

interface $ElementAttributes {
  className?: string;
  id?: string;

  [attrName: string]: any;
}

export interface $Element {
  $type: typeof NYA_ELEMENT;
  tag: string;
  ref?: null | Element;
  attrs?: $ElementAttributes;
  children: $ElementChildren;
}

type CreateElementAttrProps =
  | $ElementAttributes
  | $ElementNode
  | $ElementNode[];

type CreateElementChildrenProps = $ElementNode | $ElementNode[];

export function isElement(el: any): el is $Element {
  return Boolean(el?.$type === NYA_ELEMENT);
}

/**
 * ('div');
 * ('div', 'test');
 * ('div', ['test']);
 * ('div', {});
 * ('div', {}, ['test']);
 * ('div', {}, 'test');
 */
export function createElement(
  tag: string,
  attrs?: CreateElementAttrProps,
  children?: CreateElementChildrenProps
): $Element {
  if (children === undefined) {
    if (Array.isArray(attrs)) {
      children = attrs as $ElementNode[];
      attrs = {} as $ElementAttributes;
    } else if (isString(attrs) || isElement(attrs)) {
      children = [attrs] as $ElementNode[];
      attrs = {} as $ElementAttributes;
    }
  } else {
    if (!Array.isArray(children)) {
      children = [children];
    }
  }

  return {
    $type: NYA_ELEMENT,
    tag,
    children: children as $ElementChildren,
    attrs: attrs as $ElementAttributes,
    ref: null,
  };
}

export const TAG = new Proxy<{
  [s: string]: (
    attrs: CreateElementAttrProps,
    children: CreateElementChildrenProps
  ) => $Element;
}>(
  {},
  {
    get(obj, prop: string) {
      return obj[prop]
        ? obj[prop]
        : (obj[prop] = (attrs, children) =>
            createElement(prop.toLowerCase(), attrs, children));
    },
  }
);
