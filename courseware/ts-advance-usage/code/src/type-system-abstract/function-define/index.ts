/*
 * @Author: hannq
 * @Date: 2020-04-20 00:16:59
 * @Last Modified by: hannq
 * @Last Modified time: 2020-04-20 00:20:43
 * @desc 测试 typescript 中的泛型操作符
 */

// 这里我们就定义了一个最简单的泛型操作符
type foo<T> = T;

// 这里我们就对入参 T 进行了类型约束
type foo2<T extends string> = T;

// 这里我们就对入参 T 增加了默认值
type foo3<T extends string = 'hello world'> = T;
