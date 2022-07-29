const http = require('http')
const { fork } = require('child_process')

const server = http.createServer((req, res) => {
  if (req.url == '/sum') {
    // fork 方法接收一个模块路径，然后开启一个子进程，将模块在子进程中运行
    // childProcess表示创建的子进程
    let childProcess = fork('./sum.js')

    // 发消息给子进程
    childProcess.send('子进程开始计算')

    // 父进程中监听子进程的消息
    childProcess.on('message', (data) => {
      res.end(data + '')
    })

    // 监听子进程的关闭事件
    childProcess.on('close', () => {
      // 子进程正常退出和报错挂掉，都会走到这里
      console.log('子进程关闭')
      childProcess.kill()
    })

    // 监听子进程的错误事件
    childProcess.on('error', () => {
      console.log('子进程报错')
      childProcess.kill()
    })
  }

  if (req.url == '/hello') {
    res.end('hello')
  }

  if (req.url == '/error') {
    throw new Error('父进程出错')
    res.end('hello')
  }
})

server.listen(3000, () => {
  console.log('Server is running on 3000')
})
