/*
 * @Author: hannq
 * @Date: 2020-04-20 00:34:07
 * @Last Modified by: hannq
 * @Last Modified time: 2020-04-20 02:11:34
 * @desc 测试 typescript 类型递归
 */

// shift action
type ShiftAction<T extends any[]> = ((...args: T) => any) extends ((arg1: any, ...rest: infer R) => any) ? R : never;

type combineTupleTypeWithTecursion<T extends any[], E = {}> = {
  1: E,
  0: combineTupleTypeWithTecursion<ShiftAction<T>, E & T[0]>
}[T extends [] ? 1 : 0]

type test = [{ a: string }, { b: number }];
type testResult = combineTupleTypeWithTecursion<test>; // { a: string; } & { b: number; }

// translate to javascript
function combineTupleTypeWithTecursion(T: object[], E: object = {}): object {
  return T.length ? combineTupleTypeWithTecursion(T.slice(1), { ...E, ...T[0] }) : E
}

const testData = [{ a: 'hello world' }, { b: 100 }];
// 此时函数的返回值为 { a: 'hello world', b: 100 }
combineTupleTypeWithTecursion(testData);
