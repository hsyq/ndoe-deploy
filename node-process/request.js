const http = require('http')

for (let i = 0; i < 1000; i++) {
  http.get('http://localhost:3000')
}