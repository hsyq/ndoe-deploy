const express = require('express')
const Mock = require('mockjs')

const app = express()

app.get("/api/users", (req, res) => {
  const userList = Mock.mock({
    'userList|10': [{
      'id|+1': 1,
      'name': '@cname',
      'email': '@email'
    }]
  })

  setTimeout(() => {
    throw new Error('服务器故障')
  }, 5000)

  res.status(200)
  res.json(userList)
})

app.listen(3000, () => {
  console.log("服务启动: 3000")
})
