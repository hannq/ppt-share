/*
 * @Author: hannq
 * @Date: 2020-04-20 01:07:46
 * @Last Modified by: hannq
 * @Last Modified time: 2020-04-20 01:25:21
 * @desc 测试 typescript 模块作用域
 */

// 这里虽然使用了 declare 关键字来声明，但却无法在外部获取到
declare interface ModuleFoo {
  propA: string;
  propB: number;
}

// 一旦触发了模块作用域，那么你就需要显式地声明全局类型
declare global {
  const ModuleGlobalFoo: string;
}

// export 是触发模块作用域的标志
export { }
