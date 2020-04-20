/*
 * @Author: mikey.zhaopeng
 * @Date: 2020-04-20 16:28:45
 * @Last Modified by: hannq
 * @Last Modified time: 2020-04-20 20:24:55
 *
 */

type Combine<T> = (T extends any ? (args: T) => any : never) extends (args: infer A) => any ? A : never;

/**
 * 合并多个参数的返回数值并返回
 * @param { Function[] } reducerCreators
 * @returns { Object }
 */
function combineReducersParamFactory<T extends ((...args) => object)[]>(...reducerCreators: T): Combine<ReturnType<T[number]>> {
  return reducerCreators.reduce<any>((acc, creator) => ({ ...acc, ...creator() }), {});
}

// test ...

function todosReducer(state: object[], action: { [x: string]: string}) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

function counterReducer(state: number, action: { [x: string]: string}) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// 这里就可以得到正确的类型推导
const ret = combineReducersParamFactory(
  () => ({ todosReducer }),
  () => ({ counterReducer })
);
// { todosReducer: [Function: todosReducer], counterReducer: [Function: counterReducer] }
