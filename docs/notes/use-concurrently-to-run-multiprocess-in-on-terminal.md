# concurrently 

## why

有很多的命令其实是相关的，并且这些命令不是立马就能够返回的，比如 watch 。那么这个时候就需要开多个端口的执行命令，并查看命令。非常不方便。concurrently 可以让这些命令在同一个端口输出

## how

每一个命令如果失败了就会放回信号，那么只需要在最高层监听这些命令，如果有其中一个返回就主动关闭其他的。
为什么好用，可以在输入的时候在输入日志前打上相应的颜色与标记，这样就能够清楚的分清日志

## use

`concurrently "command" "command"`

执行相应的命令

`concurrently -k`

如果其中一个挂了就全部关闭

## 其他

[文档](https://www.npmjs.com/package/concurrently)