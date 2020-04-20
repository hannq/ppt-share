---
auth: hannq
date: 2020-04-17
cover: ./images/cover.png
---

<h1 align="center">深入理解 Typescript 高级用法</h1>

<h6 align="right">作者: 韩念琪</h6>

<img src="./images/cover.png" width="100%" alt="cover"/>

> **前言**：这里的标题看起来是 "高级用法"，不少同学可能就表示被劝退了。其实 `Typescript` 作为一门 `强类型` 编程语言，最具特色的就是他的类型表达能力，这是很多完备的后端语言都难以媲美的 ~~说的很对，但PHP是最好的语言~~，所以如果你搞懂了他的类型系统，对将来的日常开发一定是大有裨益的，但过于灵活的类型系统也注定了 `Typescript` 无法成为一门纯粹的静态语言，不过每一行代码都有代码提示他不香嘛？

<h2>大纲</h2>

[TOC]

## 基础准备

### 预备知识

<h6> 此文档的内容默认要求读者已经具备以下知识：</h6>

1. 有 `Javascript` 或其他语言编程经验。
2. 有 `Typescript` 实际使用经验，最好在正经项目中完整地使用过。
3. 了解 `Typescript` 基础语法以及常见关键字地作用。
4. 对 `Typescript` 的 `类型系统` 架构有一个最基本的了解。

### 相关资源推荐

1. [Typescript 官网](https://www.typescriptlang.org/)
2. [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
3. [TypeScript GitHub地址](https://github.com/microsoft/TypeScript)

## 背景

初用 `Typescript` 开发的同学一定有这样的困扰：

1. 代码代码提示并不智能，似乎只能显式的定义类型，才能有代码提示，无法理解这样的编程语言居然有这么多人趋之若鹜。
2. 各种各样的类型报错苦不堪言，本以为听信网上说 `Typescript` 可以提高代码可维护性，结果却发现徒增了不少开发负担。
3. 显式地定义所有的类型似乎能应付大部分常见，但遇到有些复杂的情况却发现无能为力，只能含恨写下若干的 `as any` 默默等待代码 `review` 时的公开处刑。
4. 项目急时间紧却发现 `Typescript` 成了首要难题，思索片刻决定投靠的 `Anyscript`，快速开发业务逻辑，待到春暖花开时再回来补充类型。双倍的工作量，双倍的快乐只有自己才懂。

为了避免以上悲剧的发生或者重演，我们只有在对它有更加深刻的理解之后，才能在开发时游刃有余、在撸码时纵横捭阖。

## Typescript 类型系统简述

> **思考题**：有人说 `Typescript` = `Type`  + `Javascript`，那么抛开 `Javascript` 不谈，这里的 `Type` 是一门完备的编程语言吗？

### Typescript 的类型是支持定义 "函数定义" 的

有过编程经验的同学都知道，函数是一门编程语言中最基础的功能之一，函数是过程化、面向对象、函数式编程中程序封装的基本单元，其重要程度不言而喻。

函数可以帮助我们做很多事，比如 ：

- 函数可以把程序封装成一个个功能，并形成函数内部的变量作用域，通过静态变量保存函数状态，通过返回值返回结果。
- 函数可以帮助我们实现过程的复用，如果一段逻辑可以被使用多次，就封装成函数，被其它过程多次调用。
- 函数也可以帮我们更好地组织代码结构，帮助我们更好地维护代码。

<h5>那么言归正传，如何在 Typescript 类型系统中定义函数呢？</h5>

`Typescript` 中类型系统中的的函数被称作  `泛型操作符`，其定义的简单的方式就是使用 `type` 关键字：

```typescript
// 这里我们就定义了一个最简单的泛型操作符
type foo<T> = T;
```

这里的代码如何理解呢，其实这里我把代码转换成大家最熟悉的 `Javascript` 代码其实就不难理解了：

```javascript
// 把上面的类型代码转换成 `JavaScript` 代码
function foo(T) {
	return T
}
```

那么看到这里有同学心里要[犯嘀咕](https://zhidao.baidu.com/question/2051880054084169907.html)了，心想你这不是忽悠我嘛？这不就是  `Typescript` 中定义类型的方式嘛？这玩意儿我可太熟了，这玩意儿不就和 `interface` 一样的嘛，我还知道 `Type` 关键字和 `interface` 关键字有啥细微的区别呢！

嗯，同学你说的太对了，不过你不要着急，接着听我说，其实类型系统中的函数还支持对入参的约束。

```typescript
// 这里我们就对入参 T 进行了类型约束
type foo<T extends string> = T;
```

那么把这里的代码转换成我们常见的 `Typescript`  是什么样子的呢？

```typescript
function foo(T: string) {
	return T
}
```

当然啦我们也可以给它设置默认值：

```typescript
// 这里我们就对入参 T 增加了默认值
type foo<T extends string = 'hello world'> = T;
```

那么这里的代码转换成我们常见的 `Typescript`  就是这样的：

```typescript
function foo(T: string = 'hello world') {
	return T
}
```

看到这里肯定有同学迫不及待地想要提问了：**那能不能像 JS 里的函数一样支持剩余参数呢？**

很遗憾，目前暂时是不支持的，但是在我们日常开发中一定是有这样的需求存在的。那就真的没有办法了嘛？其实也不一定，我们可以通过一些骚操作来模拟这种场景，当然这个是后话了，这里就不作拓展了。

### Typescript 的类型是支持 "条件判断" 的

> 人生总会面临很多选择，编程也是一样。
>
> <p align="right">——我瞎编的<p>

条件判断也是编程语言中最基础的功能之一，也是我们日常撸码过程成最常用的功能，无论是 `if else` 还是 `三元运算符`，相信大家都有使用过。

<h5>那么在 Typescript 类型系统中的类型判断要怎么实现呢？</h5>

其实这在 `Typescript` 官方文档被称为 `条件类型(Conditional Types)`，定义的方法也非常简单，就是使用 `extends` 关键字。

```typescript
T extends U ? X : Y;
```

这里相信聪明的你一眼就看出来了，这不就是 `三元运算符` 嘛！是的，而且这和三元运算符的也发也非常像，如果 `T extends U` 为 `true` 那么 返回 `X` ，否则返回 `Y`。

结合之前刚刚讲过的 "函数"，我们就可以简单的拓展一下：

```typescript
type num = 1;
type str = 'hello world';

type IsNumber<N> = N extends number ? 'yes, is a number' : 'no, not a number';

type result1 = IsNumber<num>; // "yes, is a number"
type result2 = IsNumber<str>; // "no, not a number"
```

这里我们就实现了一个简单的带判断逻辑的函数。

### Typescript 的类型是支持 "数据结构" 的

#### 模拟真实数组

看到这里肯定有同学就笑了，这还不简单，就举例来说，`Typescript` 中最常见数据类型就是 `数组（Array）` 或者 `元组（tuple）`。

同学你说的很对，**那你知道如何对 `元组类型` 作 `push`、`pop`、`shift`、`unshift` 这些行为操作吗？**

其实这些操作都是可以被实现的：

```typescript
// 这里定义一个工具类型，简化代码
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
```

> **注意**：这里的代码仅用于测试，操作某些复杂类型可能会报错，需要做进一步兼容处理，这里简化了相关代码，请勿用于生产环境！

相信读到这里，大部分同学应该可以已经可以感受到 `Typescript` 类型系统的强大之处了，其实这里还是继续完善，为元组增加 `concat` 、`map` 等数组的常用的功能，这里不作详细探讨，留给同学们自己课后尝试吧。

但是其实上面提到的 "数据类型" 并不是我这里想讲解的 "数据类型"，上述的数据类型本质上还是服务于代码逻辑的数据类型，其实并不是服务于 `类型系统` 本身的数据类型。

上面这句话的怎么理解呢？

不管是 `数组` 还是 `元组`，在广义的理解中，其实都是用来对 **数据** 作 **批量操作**，同理，服务于 `类型系统` 本身的数据结构，应该也可以对 **类型** 作 **批量操作**。

那么如何对 **类型** 作 **批量操作** 呢？或者说服务于 `类型系统` 中的 **数组** 是什么呢？

下面就引出了本小节真正的 "数组"：`联合类型(Union Types)`

说起 `联合类型(Union Types)` ，相信使用过 `Typescript` 同学的一定对它又爱又恨：

1. 定义函数入参的时候，当同一个位置的参数允许传入多种参数类型，使用 `联合类型(Union Types)` 会非常的方便，但想智能地推导出返回值的类型地时候却又犯了难。
2. 当函数入参个数不确定地时候，又不愿意写出 `(...args: any[]) => void` 这种毫无卵用的参数类型定义。
3. 使用 `联合类型(Union Types)` 时，虽然有 `类型守卫（Type guard）`，但是某些场景下依然不够好用。

其实当你对它有足够的了解时，你就会发现 `联合类型(Union Types)` 比 `交叉类型(Intersection Types)` 不知道高到哪里去了，~~我和它谈笑风生~~。

#### 类型系统中的 "数组"

<h5>下面就让我们更加深入地了解一下 联合类型(Union Types)：</h5>

<h6>如何遍历 联合类型(Union Types) 呢？</h6>

既然目标是 **批量操作类型**，自然少不了类型的 **遍历**，和大多数编程语言方法一样，在 `Typescript` 类型系统中也是 `in` 关键字来遍历。

```typescript
type key = 'vue' | 'react';

type MappedType = { [k in key]: string } // { vue: string; react: string; }
```

你看，通过  `in` 关键字，我们可以很容易地遍历 `联合类型(Union Types)`，并对类型作一些变换操作。

但有时候并不是所有所有 `联合类型(Union Types)` 都是我们显式地定义出来的。

<h6>我们想动态地推导出 联合类型(Union Types) 类型有哪些方法呢？</h6>

可以使用 `keyof` 关键字动态地取出某个键值对类型的 `key`

```typescript
interface Student {
  name: string;
  age: number;
}

type studentKey = keyof Student; // "name" | "age"
```

同样的我们也可以通过一些方法取出 `元组类型` 子类型

```typescript
type framework = ['vue', 'react', 'angular'];

type frameworkVal1 = framework[number]; // "vue" | "react" | "angular"
type frameworkVal2 = framework[any]; // "vue" | "react" | "angular"
```

#### 实战应用

看到这里，有的同学可能要问了，你既然说 `联合类型(Union Types)` 可以批量操作类型，**那我想把某一组类型批量映射成另一种类型，该怎么操作呢**？

方法其实有很多，这里提供一种思路，抛砖引玉一下，别的方法就留给同学们自行研究吧。

其实分析一下上面那个需求，不难看出，这个需求其实和数组的 `map` 方法有点相似

<h6>那么如何实现一个操作 联合类型(Union Types) 的 map 函数呢？</h6>

```typescript
// 这里的 placeholder 可以键入任何你所希望映射成为的类型
type UnionTypesMap<T> = T extends any ? 'placeholder' : never;
```

其实这里聪明的同学已经看出来，我们只是利用了 `条件类型(Conditional Types)`，使其的判断条件总是为 `true`，那么它就总是会返回左边的类型，我们就可以拿到 `泛型操作符` 的入参并自定义我们的操作。

让我们趁热打铁，再举个具体的栗子：把 **联合类型(Union Types)** 的每一项映射成某个函数的 **返回值**。

```typescript
type UnionTypesMap2Func<T> = T extends any ? () => T : never;

type myUnionTypes = "vue" | "react" | "angular";

type myUnionTypes2FuncResult = UnionTypesMap2Func<myUnionTypes>;
// (() => "vue") | (() => "react") | (() => "angular")
```

相信有了上述内容的学习，我们已经对 `联合类型(Union Types)` 有了一个相对全面的了解，后续在此基础之上在作一些高级的拓展，也如砍瓜切菜一般简单了。

### Typescript 的类型是支持  "作用域" 的

#### 全局作用域

就像常见的编程语言一样，在 `Typescript` 的类型系统中，也是支持 **全局作用域** 的。换句话说，你可以在没有 **导入** 的前提下，在 **任意文件任意位置** 直接获取到并且使用它。

通常使用 `declare` 关键字来修饰，例如我们常见的 `图片资源` 的类型定义： 

```typescript
declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
```

当然我们也可以在 **全局作用域** 内声明一个类型：

```typescript
declare type str = string;
declare interface Foo {
  propA: string;
  propB: number;
}
```

需要注意的是，如何你的模块使用了 `export` 关键字导出了内容，上述的声明方式可能会失效，如果你依然想要将类型声明到全局，那么你就需要显式地声明到全局：

```typescript
declare global {
  const ModuleGlobalFoo: string;
}
```

#### 模块作用域

就像 `nodejs` 中的模块一样，每个文件都是一个模块，每个模块都是独立的模块作用域。这里模块作用域触发的条件之一就是使用 `export` 关键字导出内容。

每一个模块中定义的内容是无法直接在其他模块中直接获取到的，如果有需要的话，可以使用 `import` 关键字按需导入。

#### 泛型操作符作用域&函数作用域

泛型操作符是存在作用域的，还记得这一章的第一节为了方便大家理解，我把泛型操作符类比为函数吗？既然可以类比为函数，那么函数所具备的性质，泛型操作符自然也可以具备，所以存在泛型操作符作用域自然也就很好理解了。

这里定义的两个同名的 `T` 并不会相互影响：

```typescript
type TypeOperator<T> = T;
type TypeOperator2<T> = T;
```

上述是关于泛型操作符作用域的描述，下面我们聊一聊真正的函数作用域：

**类型也可以支持闭包**：

```typescript
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
```

### Typescript 的类型是支持 "递归" 的

`Typescript` 中的类型也是可以支持递归的，递归相关的问题比较抽象，这里还是举例来讲解，同时为了方便大家的理解，我也会像第一节一样，把类型递归的逻辑用 `Javascript` 语法描述一遍。

首先来让我们举个栗子：

<h6>假如现在需要把一个任意长度的元组类型中的子类型依次取出，并用 `&` 拼接并返回。</h6>

这里解决的方法其实非常非常多，解决的思路也非常非常多，由于这一小节讲的是 **递归**，所以我们使用递归的方式来解决。废话不罗嗦，先上代码：

```typescript
// shift action
type ShiftAction<T extends any[]> = ((...args: T) => any) extends ((arg1: any, ...rest: infer R) => any) ? R : never;

type combineTupleTypeWithTecursion<T extends any[], E = {}> = {
  1: E,
  0: combineTupleTypeWithTecursion<ShiftAction<T>, E & T[0]>
}[T extends [] ? 1 : 0]

type test = [{ a: string }, { b: number }];
type testResult = combineTupleTypeWithTecursion<test>; // { a: string; } & { b: number; }
```

看到上面的代码是不是一脸懵逼？没关系，接下来我们用普通的 `Typescript` 代码来 "翻译" 一下上述的代码。

```typescript
function combineTupleTypeWithTecursion(T: object[], E: object = {}): object {
  return T.length ? combineTupleTypeWithTecursion(T.slice(1), { ...E, ...T[0] }) : E
}

const testData = [{ a: 'hello world' }, { b: 100 }];
// 此时函数的返回值为 { a: 'hello world', b: 100 }
combineTupleTypeWithTecursion(testData);
```

看到这儿，相信聪明的同学一下子就懂了，原来类型的递归与普通函数的递归本质上是一样的。如果触发结束条件，就直接返回，否则就一直地递归调用下去，所传递的第二个参数用来保存上一次递归的计算结果。

当然熟悉递归的同学都知道，常见的编程语言中，递归行为非常消耗计算机资源的，一旦超出了最大限制那么程序就会崩溃。同理类型中的递归也是一样的，如果递归地过深，类型系统一样会崩溃，所以这里的代码大家理解就好，尽量不要在生产环境使用哈。

### 小结

还记得一开始提出的思考题吗？其实通过上述的学习，我们完全可以自信地说出，`Typescript` 的 `Type` 本身也是一套完备的编程语言，甚至可以说是完备的图灵语言。因此类型本身也是可以用来编程的，你完全可以用它来编写一些有趣的东西，更别说是搞定日常开发中遇到的简单的业务场景了。

## "高级用法" 的使用场景与价值

### 哪些用法可以被称为 "高级用法"

其实所谓 "高级用法"，不过是用来解决某些特定的场景而产生的特定的约定俗称的写法或者语法糖。那高级用法重要吗？重要，也不重要。怎理解呢，根据编程中的 "二八原则"，20%的知识储备已经可以解决80%的需求问题，但是这剩余的20%，就是入门与熟练的分水岭。

其实只要当我们仔细翻阅一遍官方提供的 [handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)，就已经可以应付日常开发了。但是就像本文一开头说的那样，你是否觉得：

1.  `Typescript` 在某些场景下用起来很费劲，远不及 `Javascript` 灵活度的十分之一。
2. 你是否为自己使用 `Javascript` 中了某些 **骚操作** 用极简短的代码解决了某个复杂的代码而沾沾自喜，但却为不正确的 **返回类型** 挠秃了头。
3. 你是否明知用了若干 `as xxx` 会让你的代码看起来很挫，但却无能为力，含恨而终。

同学，当你使用某种办法解决了上述的这些问题，那么这种用法就可以被称作 "高级用法"。

### 举例说明 "高级用法" 的使用场景

举个栗子：在 `Redux` 中有一个叫作 `combineReducers` 的函数，因为某些场景，我们需要增加一个 `combineReducersParamFactory` 的函数，该函数支持传入多个函数，传入函数的返回值为作为`combineReducers` 的入参，我们需要整合多个入参数函数的返回值，并生成最终的对象供 `combineReducers` 函数使用。

思考一下逻辑，发现其实并不复杂，用 `Javascript` 可以很容易地实现出来：

```javascript
/**
 * 合并多个参数的返回数值并返回
 * @param { Function[] } reducerCreators
 * @returns { Object }
 */
function combineReducersParamFactory(...reducerCreators) {
  return reducerCreators.reduce((acc, creator) => ({ ...acc, ...creator() }), {})
}

// test ...

function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const ret = combineReducersParamFactory(
  () => ({ todosReducer }),
  () => ({ counterReducer })
);
// { todosReducer: [Function: todosReducer], counterReducer: [Function: counterReducer] }
```

但如果用需要配备对应的类型，应该如何编写呢？

```typescript
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

// 这里不需要显示传入类型，这里就可以得到正确的代码提示
const ret = combineReducersParamFactory(
  () => ({ todosReducer }),
  () => ({ counterReducer })
);
// { todosReducer: [Function: todosReducer], counterReducer: [Function: counterReducer] }
```

你看，类型经过精心编排之后，就是可以让调用者不增加任何负担的前提下，享受到代码提示的快乐。

### 小结

经过这一章节的学习，我们可以明确了解到，经过我们精心编排的类型，可以变得非常的智能，可以让调用者几乎零成本地享受到代码提示的快乐。或许在编排类型时所耗费的时间成本比较大，但是一旦我们编排完成，就可以极大地减少调用者的脑力负担，让调用者享受到编程的快乐。

## 类型推导与泛型操作符

### 流动的类型（类型编写思路）

熟悉 **函数式编程** 的同学一定对 **数据流动** 的概念有较为深刻的理解。当你在 "上游" 改变了一个值之后，"下游" 相关的会跟着自动更新。有 **响应式编程** 经验的同学这是时候应该迫不及待地想举手了，同学把手放下，这里我们并不想深入地讨论 **流式编程思想**，之所以引出这些概念，是想类比出本小节的重点: **流动的类型**。

是的，编写类型系统的思路是可以借鉴 **函数式编程** 的思想的。因此某一个类型发生变化时，其他相关的类型也会自动更新，并且当代码的臃肿到不可维护的时候，你会得到一个友好的提示，整个类型系统就好像一个被精心设计过的约束系统。

### Typescript 代码哲学

聊完了类型系统的编写思路，咱们再来聊一聊代码哲学。其实之所以现在 `Typescript` 越来越火，撇开哪些聊烂了的优势不谈，其实最大的优势在于强大的类型表现能力，以及编辑器（VSCode）完备的代码提示能力。

那么在这些优势的基础上，我个人拓展了一些编码哲学（习惯），这里见人见智，大佬轻喷~：

1. 减少不必要的显式类型定义，尽可能多地使用类型推导，让类型的流动像呼吸一样自然。
2. 尽可能少地使用 `any` 或 `as any`，注意这里并不是说不能用，而是你判断出目前情况下使用 `any` 是最优解。
3. 如果确定要使用 `any` 作为类型，优先考虑一下是否可以使用 `unknown` 类型替代，毕竟 `any` 会破坏类型的流动。
4. 尽可能少地使用 `as xxx`，如果大量使用这种方式纠正类型，那么大概率你对 **类型流动** 理解的还不够透彻。 

## 常见类型推导实现逻辑梳理与实践入门

### 常见的类型推导案例与实现逻辑梳理

### 手把手带你实现一个简单的类型推导案例

### 常见的类型推导实现小技巧

### 小结

## 常见泛型操作符实现逻辑梳理与实践入门

### 常见泛型操作符实现介绍与实现逻辑梳理

### 手把手带你实现一个简单的泛型操作符案例

### 常见的泛型操作符实现小技巧

### 小结

## 定制化扩展你的 Typescript

### Typescript Service Plugins 的产生背景、功能定位、基础使用

#### 产生背景

说起 `Typescript` 的编译手段大部分同学应该都不会陌生，无论是在 `webpack` 中使用 `ts-loader` 或 `babel-loader`，还是在 `gulp` 中使用 `gulp-typescript`，亦或是直接使用 `Typescript` 自带的命令行工具，相信大部分同学也都已经驾轻就熟了，这里不做赘述。

这里我们把目光聚焦到撸码体验上，相信有使用过 `Typescritp` 开发前端项目的同学一定有过各种各样的困扰，这里列举几个常见的问题：

1. 在处理 CSS Module 的样式资源的类型定义时，不满足于使用 `declare module '*.module.css'` 这种毫无卵用的类型定义。
2. 不想给编辑器安装各种各样的插件，下次启动编辑器的时间明显变长，小破电脑不堪重负，而且每次重装系统都是一次噩梦降临。
3. 不想妥协于同事的使用习惯，想使用自己熟悉的编辑器。
4. 并不满足于官方已有的代码提示，想让自己的编辑器更加地贴心与智能。

<h6><font color="#000">为了提供更加贴心的开发体验，Typescript 官方提供一种解决思路——Typescript Service Plugins</font></h6>

#### 功能定位

<h6>以下内容摘自官方 WIKI：</h6>

> In TypeScript 2.2 and later, developers can enable *language service plugins* to **augment the TypeScript code editing experience**.

其实官方文档已经写的很清楚了，这玩意儿旨在优化 `Typescript` 代码的 **编写体验**。所以想利用这玩意儿改变编译结果或是想自创新语法的还是省省吧<font color="#999"> ~~嗯，我在说我自己呢~~</font>！

那么 `Typescript Service Plugins` 的可以用来做哪些事呢？

官方也有明确的回答：

>plugins are for augmenting the editing experience. Some examples of things plugins might do:
>
>- Provide errors from a linter inline in the editor
>- Filter the completion list to remove certain properties from `window`
>- Redirect "Go to definition" to go to a different location for certain identifiers
>- Enable new errors or completions in string literals for a custom templating language

同样官方也给出了不推荐使用 `Typescript Service Plugins` 的场景：

>Examples of things language plugins cannot do:
>
>- Add new custom syntax to TypeScript
>- Change how the compiler emits JavaScript
>- Customize the type system to change what is or isn't an error when running `tsc`

好了，相信读到这里大家一定对 `Typescript Service Plugins` 有了一个大致的了解，下面我会介绍一下    `Typescript Service Plugins` 的安装与使用。

#### 如何安装以及如何配置 Typescript Service Plugins

<h5>Typescript Service Plugins 的安装方法</h5>

```bash
# 就像安装普通的 `npm` 包一样
npm install --save-dev your_plugin_name
```

<h5>如何在 tsconfig.json 中配置 Typescript Service Plugins</h5>

```json
{
  "compilerOptions": {
    /** compilerOptions Configuration ... */
    "noImplicitAny": true,
    "plugins": [
      {
        /** 配置插件名称，也可以填写本地路径 */
        "name": "sample-ts-plugin"
        /** 这里可以给插件传参 ... */
      }
      /** 支持同时引入多个插件 ... */
    ]
  }
}
```

<h5>几个需要注意的地方:</h5>

1. 如果使用 `VSCode` 开发，记得务必 [using the workspace version of typescript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)，否则可能导致插件不生效。
2. `Typescript Service Plugins` 产生的告警或者报错不会影响编译结果。
3. 如果配置完了不生效可以先尝试重启你的编辑器。

### 市面上已有的 Typescript Service Plugins 举例介绍

> 具体使用细节请用编辑器打开我提供的 demo，自行体验。

#### 示例插件：[typescript-plugin-css-modules](https://www.npmjs.com/package/typescript-plugin-css-modules)

<h5>插件安装</h5>

```bash
npm install --save-dev typescript-styled-plugin typescript
```

<h5>配置方法</h5>

<h6>在 tsconfig.json 中增加配置</h6>

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-styled-plugin"
        /** 具体配置参数请查看官方文档 */
      }
    ]
  }
}
```

<h5>插件基本介绍与使用场景</h5>

此插件可以用来缓解在使用 `CSS Module` 时没有代码提示的困境，主要思路就是通过读取对应的 CSS Module 文件并解析成对应的  `AST`，并生成对应的类型文件从而支持对应的代码提示。但是根据反馈来看，似乎某些场景下表现并不尽人意，是否值得大规模使用有待商榷。

类似实现思路的还有 [typings-for-css-modules-loader](https://www.npmjs.com/package/@teamsupercell/typings-for-css-modules-loader)，功能来说肯定是 `webpack loader` 更加强大，但是 `Typescript Plugin` 更加轻量、入侵度也越低，取舍与否，见仁见智吧

#### 示例插件：[typescript-eslint-language-service](https://www.npmjs.com/package/typescript-eslint-language-service)

<h5>插件安装</h5>

```bash
npm install --save-dev eslint typescript-eslint-language-service
```

<h5>配置方法</h5>

在 `.eslintrc.*` 文件中，添加对应的 `eslint` 配置

<h6>在 tsconfig.json 中增加配置</h6>

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-eslint-language-service"
        /** 默认会读取 `.eslintrc.*` 文件 */
        /** 具体配置参数请查看官方文档 */
      }
    ]
  }
}
```

<h5>插件基本介绍与使用场景</h5>

此插件可以让 `Typescript` 原生支持 `eslint` 检查及告警，编辑器不需要安装任何插件即可自持，但是报错并不影响编译结果。

#### 示例插件：[typescript-styled-plugin](https://www.npmjs.com/package/typescript-styled-plugin)

<h5>插件安装</h5>

```bash
npm install --save-dev typescript-styled-plugin typescript
```

<h5>配置方法</h5>

<h6>在 tsconfig.json 中增加配置</h6>

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-styled-plugin"
        /** 具体配置参数请查看官方文档 */
      }
    ]
  }
}
```

<h5>插件基本介绍与使用场景</h5>

此插件可以为 [styled-components](https://www.npmjs.com/package/styled-components) 的样式字符串模板提供 `属性/属性值` 做语法检查。
同时也推荐安装 `VSCode` 插件 [vscode-styled-components](https://github.com/styled-components/vscode-styled-components)，为你的样式字符串模板提供代码提示以及语法高亮。

### 如何自己写一个 Typescript Service Plugins

### 参考资料链接

1. [Using the Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
2. [Using the Language Service API](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API)
3. [Writing a Language Service Plugin](https://github.com/microsoft/TypeScript/wiki/Writing-a-Language-Service-Plugin)
4. [Useful Links for TypeScript Issue Management](https://github.com/microsoft/TypeScript/wiki/Useful-Links-for-TypeScript-Issue-Management)

### 小结

## Q&A

### 可以利用 Typescript Service Plugin（例如配置 eslint 规则）阻塞编译或者在编译时告警吗？

**答**：不可以，所有可以使用 `Typescript Plugin` 的场景一定都是编码阶段的，而且官方对 plugins 的定位局限在了 `只改善编写体验` 这方面，你并不能自定义语法或者自定义规则来改变编译结果，不过你可以考虑使用自定义 `compiler`，当然这是另一个话题了。

以下引用自官方文档：

> TypeScript Language Service Plugins ("plugins") are for changing the **editing experience only**. The core TypeScript language remains the same. Plugins can't add new language features such as new syntax or different typechecking behavior, and **plugins aren't loaded during normal commandline typechecking or emitting**.

