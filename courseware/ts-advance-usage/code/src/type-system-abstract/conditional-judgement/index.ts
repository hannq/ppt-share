/*
 * @Author: hannq
 * @Date: 2020-04-19 17:15:11
 * @Last Modified by: hannq
 * @Last Modified time: 2020-04-19 17:16:11
 * @desc 测试 typescript 中的 条件类型(Conditional Types)
 */

type num = 1;
type str = 'hello world';

type IsNumber<N> = N extends number ? 'yes, is a number' : 'no, not a number';

type result1 = IsNumber<num>; // "yes, is a number"
type result2 = IsNumber<str>; // "no, not a number"
