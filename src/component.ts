'use strict';

import { testFuntion } from './tool';

const NYA_COMPONENT = Symbol('nya.component');

type Getter = () => any;
export type Lifecycle = () => void;
export type Const = () => void;

export interface Component {
  type: typeof NYA_COMPONENT;
  props: ComponentCreaterProps;
  children: any;

  $const: Const;
  templet: null | any;
  vNode: any;
  parentNode: null | Element;

  getter: null | Getter;

  mouted: null | Lifecycle;
  update: null | Lifecycle;
  unMouted: null | Lifecycle;
}

interface ComponentCreaterProps {
  [key: string]: any;
}

export function ComponentCreater(
  $const: Const,
  props: ComponentCreaterProps = {},
  children: any
): Component {
  return {
    type: NYA_COMPONENT,
    $const,
    children,
    props,
    templet: null,
    vNode: null,
    parentNode: null,
    getter: null,
    mouted: null,
    update: null,
    unMouted: null,
  };
}

export function createComponent(
  func: () => Component
): (p: ComponentCreaterProps, c: any) => Component {
  testFuntion(func);
  return (props, children) => ComponentCreater(func, props, children);
}
