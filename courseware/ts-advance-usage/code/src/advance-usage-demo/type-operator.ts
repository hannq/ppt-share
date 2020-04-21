/*
 * @Author: hannq
 * @Date: 2020-04-22 00:34:04
 * @Last Modified by: hannq
 * @Last Modified time: 2020-04-22 01:54:56
 * @desc 类型的过滤与分流
 */

// never 类型运算
type NeverTest = string | never // stirng
type NeverTest2 = string & never // never

// 官方提供的泛型操作符
/**
 * Exclude from T those types that are assignable to U
 */
// type Exclude<T, U> = T extends U ? never : T;

// test type guard ...
class A { }
class B { }

function foo(x: A | B) {
  if (x instanceof A) {
    // x is A
  } else {
    // x is B
  }
}

// test custom type guard ...

// 注意这里需要返回 boolean 类型
function isA(x): x is A {
  return true;
}

// 注意这里需要返回 boolean 类型
function isB(x): x is B {
  return x instanceof B;
}

function foo2(x: unknown) {
  if (isA(x)) {
    // x is A
  } else {
    // x is B
  }
}
