/*
 * @Author: hannq
 * @Date: 2020-04-18 15:11:14
 * @Last Modified by: hannq
 * @Last Modified time: 2020-04-18 19:33:22
 * @desc 测试 typescript-plugin-css-modules 是否自动提示 class 名称
 */

import styles from './index.module.css';
import stylesLess from './index.module.less';

export const AppWitchCssModule = () => (
  <section className={styles.app}>
    <header className={styles["app-header"]}></header>
  </section>
)

export const AppWithLessModule = () => (
  <section className={stylesLess.app}>
    <header className={stylesLess["app-header"]}></header>
  </section>
)

