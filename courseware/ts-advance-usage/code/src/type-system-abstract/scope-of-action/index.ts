/*
 * @Author: hannq
 * @Date: 2020-04-20 00:34:07
 * @Last Modified by: hannq
 * @Last Modified time: 2020-04-20 02:04:26
 * @desc 测试 typescript 中的类型作用域
 */

// 这里的类型虽然使用 declare 修饰，但依然无法作用到全局，下述代码会报错
// const ModuleFoo: ModuleFoo = ''

// 这里可以直接取到全局作用域的类型
const TestModuleGlobalFoo = ModuleGlobalFoo;
const TestGlobalFoo = GlobalFoo;

// 泛型操作符作用域
type TypeOperator<T> = T;
// 这里传入的泛型 T 与外界互不干扰
type TypeOperator2<T> = T;

// 函数作用域
function Foo<T> () {
  return function(param: T) {
    return param;
  }
}

const myFooStr = Foo<string>();
// const myFooStr: (param: string) => string
// 这里触发了闭包，类型依然可以被保留
const myFooNum = Foo<number>();
// const myFooNum: (param: number) => number
// 这里触发了闭包，类型也会保持相互独立，互不干涉
