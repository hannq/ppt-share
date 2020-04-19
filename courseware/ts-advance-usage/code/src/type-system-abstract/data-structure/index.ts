/*
 * @Author: hannq
 * @Date: 2020-04-19 17:16:36
 * @Last Modified by: hannq
 * @Last Modified time: 2020-04-20 01:58:03
 * @desc 测试 typescript 中的数据结构
 */

// util
type ReplaceValByOwnKey<T, S extends any> = { [P in keyof T]: S[P] };

// shift action
type ShiftAction<T extends any[]> = ((...args: T) => any) extends ((arg1: any, ...rest: infer R) => any) ? R : never;

// unshift action
type UnshiftAction<T extends any[], A> = ((args1: A, ...rest: T) => any) extends ((...args: infer R) => any) ? R : never;

// pop action
type PopAction<T extends any[]> = ReplaceValByOwnKey<ShiftAction<T>, T>;

// push action
type PushAction<T extends any[], E> = ReplaceValByOwnKey<UnshiftAction<T, any>, T & { [k: string]: E }>;

// test ...
type tuple = ['vue', 'react', 'angular'];

type resultWithShiftAction = ShiftAction<tuple>; // ["react", "angular"]
type resultWithUnshiftAction = UnshiftAction<tuple, 'jquery'>; // ["jquery", "vue", "react", "angular"]
type resultWithPopAction = PopAction<tuple>; // ["vue", "react"]
type resultWithPushAction = PushAction<tuple, 'jquery'>; // ["vue", "react", "angular", "jquery"]

// Union Types ...

type key = 'vue' | 'react';

type MappedType = { [k in key]: string } // type MappedType = { vue: string; react: string; }

// get Union Types dynamicly ...

interface Student {
  name: string;
  age: number;
}

type studentKey = keyof Student; // "name" | "age"

// get tuple type ...

type framework = ['vue', 'react', 'angular'];

type frameworkVal1 = framework[number]; // "vue" | "react" | "angular"
type frameworkVal2 = framework[any]; // "vue" | "react" | "angular"

// map func for Union Types ...

type myUnionTypes = "vue" | "react" | "angular"

type UnionTypesMap2Func<T> = T extends any ? () => T : never;

type myUnionTypes2FuncResult = UnionTypesMap2Func<myUnionTypes>;
// (() => "vue") | (() => "react") | (() => "angular")

export {}
