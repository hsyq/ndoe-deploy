const http = require('http')
const cluster = require('cluster')
const cpus = require('os').cpus()

if (cluster.isMaster) {
  // 程序启动时首先走到走到这里，根据 CPU 的核数，创建出多个子进程
  for (let i = 0; i < cpus.length; i++) {
    // 创建出一个子进程
    cluster.fork()
  }

  // 监听子进程的退出，再次 fork 出一个新的进程
  cluster.on('exit', () => {
    cluster.fork()
  })
} else {
  // fork 方法执行创建子进程，同时会再次执行该模块，此时逻辑就会走到这里
  const server = http.createServer((req, res) => {
    console.log(process.pid)
    res.end('ok')
  })

  server.listen(3000, () => {
    console.log('Server is running on 3000', 'pid: ' + process.pid)
  })
}
