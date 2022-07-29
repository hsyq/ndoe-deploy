const path = require('path')

module.exports = {
  // 一份配置文件可以同时管理多个 node.js 应用
  // apps 是一个数组，每一项都是一个应用的配置
  apps: [{
    // 应用名称
    name: "express-demo",

    // 应用入口文件
    script: "./server.js",

    // 启动应用的模式, 有两种：cluster和fork，默认是fork
    exec_mode: 'cluster',

    // 创建应用实例的数量
    instances: 'max',

    // 开启 watch，当文件变化后自动重启应用
    watch: true,

    // 忽略掉一些目录文件的变化。
    // 由于把日志目录放到了项目路径下，一定要将其忽略，否则应用启动产生日志，pm2 监听到变化就会重启，重启又产生日志，就会进入死循环
    ignore_watch: [
      "node_modules",
      "logs"
    ],
    // 错误日志存放路径
    err_file: path.resolve(__dirname, 'logs/error.log'),

    // 打印日志存放路径
    out_file: path.resolve(__dirname, 'logs/out.log'),

    // 设置日志文件中每条日志前面的日期格式
    log_date_format: "YYYY-MM-DD HH:mm:ss",
  }]
}