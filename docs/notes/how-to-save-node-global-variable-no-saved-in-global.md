# 如何优雅的保存全部变量

> Node 的项目难免需要保存一些全局都要能使用的对象或者变量，保存在global就显得非常的low，而且global 是个全局的命名空间，你懂的。我发现一个很好用的工具 [typedi](https://github.com/typestack/typedi)。

## typedi

typedi 的简单模型就是创建一个命名空间，再在这个基础上做一些好用的获取与保存的方法。

### typedi.Container

这个就是我们保存对象的命名空间。

`Container.get`

一个很好用的API，他有一个神奇的地方就是 Container.get(SomeConstructor) 。他会创建一个实例，这个实例会保存在 Container 中，当你下次调用的时候获得的还是同一个实例。这样你就可以在Node项目中的任何位置，轻松的获取到之前保存的实例了，也不用担心这个实例是否被人保存过。

`Container.set`

当然你会发现当你的实例需要传递参数给 constructor 的时候用上面的方式就不能够简单的完成这个工作了（上面的传递给Constructor的参数是 Container ），这个时候就需要使用 set 方法来显示的保存对象。

```js
  import { Container } from 'typedi

  Container.set('me', Me('test'))
```

### In typescript

在 Typescript 上有不一样的API，但是基本功能都一样。[typedi in typescript](https://github.com/typestack/typedi#usage-with-typescript)

其中我觉得最大的改动应该就是依赖注入。

`import {Inject} from 'typedi'`

两种方式

方式一：

```js
  import {Service, Container, Inject} from 'typedi';

  /**
   * 这与 JS 的 typedi 调用不用，这里需要标记下可能被 Container.get 调用的 Class
   */
  @Service()
  class SomeClass {

  }

  @Service()
  class Demo {

    @Inject()
    someDependence: SomeClass

    someMethod() {
      /**
       * 这里的 this.someDependence 就已经成功注入了
       */

      this.someDependence.xxxx()
    }
  }

  const demo = Container.get(Demo)
```

方式二：

> 这种跟我们的正常的 js 差别非常大，需要懂这种语法糖

```js
  import { Container, Service } from 'typedi

  @Service()
  class SomeClass { }

  @Service()
  class Demo {
    constructor(
      private someClass: SomeClass
    ) {
      /**
       * 构造器内部都不需要写依赖相关的逻辑
       */
    }
  }

```

👆上面只是 API 调用的不同

基本上最简单的使用就是这样了，还有一些高阶的使用方式。（暂时用不到的都是垃圾）