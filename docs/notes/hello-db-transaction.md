# 数据库事务管理与在 Sequelize 的应用

> 在数据库中你可能需要对多个表格进行一次不可分隔的多表处理，这是你需要保证这若干个相关联的操作全部完成。数据库中这就是事务管理。

## MYSQL 的相关命令

`开启事务管理: START TRANSACTION`

```sql
  select * from users; /** balabala **/
  
  START TRANSACTION;
  /** 进入存档模式 **/
```

`回滚: ROLLBACK`

```sql
  START TRANSACTION;
  DELETE from user;
  ROLLBACK; /** 回到存档前 **/
```

`保存: COMMIT`

```sql
  START TRANSACTION;
  DELETE from user;
  COMMIT;
  /** 其实使用了START TRANSACTION 之后的操作是保存在内存中的，如果没有 COMMIT 操作并不会写到硬盘 **/
```

比小白黑一点点

```sql
  /** 不多逼逼, 4级英语都能懂 **/

  START TRANSACTION;
  SAVEPOINT a_unique_name

  DELETE from user;

  ROLLBACK TO a_unique_name;
```

** 这就是基本的 sql 指令。

## Sequelize 的封装

事务管理是在 Sequelize.transaction 模块中。sequelize 根据高定制与常用调用分为两种调用方式。

`简单高效（Sequelize 内部定制）`:

```js
  /**
   * @return {Promise}
   */
  sequelize.transaction(function (t) {
    /** 每次都传 {transaction: t} 的原因是为了松耦合 **/
    return User.create({
      firstName: 'Abraham',
      lastName: 'Lincoln'
    }, {transaction: t}).then((user) => {
      // call user method;
      return user.someMethod({}, {transaction: t})
    });
  }).then((result) => {
    // 回调中最后返回的结果
  }).catch((error) => {
    // 只能简单针对报错文本进行操作
  });
```

`高定制化（开发者高度定制）`:

```js
  sequelize.transaction().then((t) => {
    return User.create({
      firstName: 'Abraham',
      lastName: 'Lincoln',
    }, {transaction: t}).then((user) => {
      // call user method
      return user.method({}, {transaction: t}))
    }).then(() => {
      return t.commit();
    }).catch((err) => {
      return t.rollback();
    })
  })
```

最简单的开始，就到这里。
