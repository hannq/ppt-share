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

1. 了解 `Typescript` 使用场景及价值
2. 了解 `Typescript` 基础语法以及常见的基础类型
3. 对 `Typescript` 的 `类型系统` 架构有一个最基础的了解

### 相关资源推荐

1. [Typescript 官网](https://www.typescriptlang.org/)
2. [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
3. [TypeScript GitHub地址](https://github.com/microsoft/TypeScript)

## 背景

初用 `Typescript` 开发的同学一定有这样的困惑：

1. 代码代码提示并不智能，似乎只能显式的定义类型，才能有代码提示，无法理解这样的编程语言居然有这么多人趋之若鹜。
2. 各种各样的类型报错苦不堪言，本以为听信网上说 `Typescript` 可以提高代码可维护性，结果却发现徒增了不少开发负担。
3. 显式地定义所有的类型似乎能应付大部分常见，但遇到有些复杂的情况却发现无能为力，只能含恨写下若干的 `as any` 默默等待代码 `review` 时的公开处刑。
4. 项目急时间紧却发现 `Typescript` 成了首要难题，思索片刻决定投靠的 `Anyscript`，快速开发业务逻辑，待到春暖花开时再回来补充类型。双倍的工作量，双倍的快乐只有自己才懂。

为了避免以上悲剧的发生或者重演，同学，只有在对它有更加深刻的理解之后，才能在开发时游刃有余、在撸码时纵横捭阖。

## Typescript 类型系统简述

> **思考题**：有人说 `Typescript` = `Type`  + `Javascript`，那么抛开 `Javascript` 不谈，这里的 `Type` 是一门完备的编程语言吗？

### Typescript 的类型是支持单独被编写的

### Typescript 的类型是支持逻辑运算的

### Typescript 的类型是支持数据结构的

### Typescript 的类型是支持作用域的

### Typescript 的类型是支持递归的

### 小结

## "高级用法" 的使用场景与价值

### 哪些用法可以被称为 "高级用法"

### 举例说明 "高级用法" 的使用场景

### 为什么需要这些 "高级用法"

### 小结

## 类型推导与泛型操作符

### 类型推导与代码哲学

### 什么是泛型操作符

### 如何使用泛型操作符更好地辅助类型推导

### 小结

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
    // compilerOptions Configuration ... 
    "noImplicitAny": true,
    "plugins": [
      {
        // 配置插件名称，也可以填写本地路径
        "name": "sample-ts-plugin"
        // 这里可以给插件传参 ...
      }
      // 支持同时引入多个插件 ...
    ]
  }
}
```

<h5>几个需要注意的地方:</h5>

1. 如果使用 `VSCode` 开发，记得务必 [using-the-workspace-version-of-typescript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)，否则可能导致插件不生效。
2. `Typescript Service Plugins` 产生的告警或者报错不会影响编译结果。
3. 如果配置完了不生效可以先尝试重启你的编辑器。

### 市面上已有的 Typescript Service Plugins 举例介绍

> 具体使用细节请用编辑器打开我提供的 demo，自行体验。

#### [typescript-plugin-css-modules](https://www.npmjs.com/package/typescript-plugin-css-modules)

<h5>插件安装</h5>

```bash
npm install --save-dev typescript-styled-plugin typescript
```

<h5>配置方法</h5>

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-styled-plugin"
        // 具体配置参数请查看官方文档
      }
    ]
  }
}
```

<h5>插件基本介绍与使用场景</h5>

此插件可以用来缓解在使用 `CSS Module` 时没有代码提示的困境，主要思路就是通过读取对应的 CSS Module 文件并解析成对应的  `AST`，并生成对应的类型文件从而支持对应的代码提示。但是根据反馈来看，似乎某些场景下表现并不尽人意，是否值得大规模使用有待商榷。

类似实现思路的还有 [typings-for-css-modules-loader](https://www.npmjs.com/package/@teamsupercell/typings-for-css-modules-loader)，功能来说肯定是 `webpack loader` 更加强大，但是 `Typescript Plugin` 更加轻量、入侵度也越低，取舍与否，见仁见智吧

#### [typescript-eslint-plugin](https://www.npmjs.com/package/typescript-eslint-plugin)

<h5>插件安装</h5>

```bash
npm install --save-dev eslint typescript-eslint-plugin
```

<h5>配置方法</h5>

在 `.eslintrc.*` 文件中，添加对应的 `eslint` 配置

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-eslint-plugin"
        // 默认会读取 `.eslintrc.*` 文件
        // 具体配置参数请查看官方文档
      }
    ]
  }
}
```

<h5>插件基本介绍与使用场景</h5>

此插件可以让 `Typescript` 原生支持 `eslint` 检查及告警，编辑器不需要安装任何插件即可自持，但是报错并不影响编译结果。

#### [typescript-styled-plugin](https://www.npmjs.com/package/typescript-styled-plugin)

<h5>插件安装</h5>

```bash
npm install --save-dev typescript-styled-plugin typescript
```

<h5>配置方法</h5>

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-styled-plugin"
        // 具体配置参数请查看官方文档
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