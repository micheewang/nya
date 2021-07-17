export function isString(s): s is string {
  return typeof s === 'string';
}

export function noop(...args: any[]): void {}

type ComposeReturn<T> = (...args: T[]) => void;
type ComposeInput<T> = (...args: T[]) => void;
export function compose<T>(
  args1: ComposeInput<T>,
  args2: ComposeInput<T>
): ComposeReturn<T> {
  return function (...params) {
    return [args1(...params), args2(...params)];
  };
}

export function isFun(f: any): f is Function {
  return typeof f === 'function';
}
