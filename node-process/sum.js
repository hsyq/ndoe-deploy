function getSum() {
  let sum = 0
  for (let i = 0; i < 10000 * 1000 * 100; i++) {
    sum += 1
  }

  return sum
}

// 子进程运行5s后，模拟进程挂掉
// setTimeout(() => {
//   throw new Error('报错')
// }, 1000 * 5)

// process 是 node.js 中一个全局对象，表示当前进程。在这里也就是子进程
// 监听主进程发来的消息
process.on('message', (data) => {
  console.log('主进程的消息：', data)

  // 执行计算逻辑
  const result = getSum()
  // 将计算结果发送给父进程
  process.send(result)
})
