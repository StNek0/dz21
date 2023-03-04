const http = require('http')
const fs = require('fs')
const path = require('path') // для формирования корректных путей

const PORT = 3000

const server = http.createServer((req, res) => {
    console.log('server req')

    res.setHeader('Content-Type', 'text/html')

    const createPath = (page) => path.resolve(__dirname, 'pages', page)
    let basePath = ''

    // базовая имплементация роутинга
    switch (req.url) {
        case '/page1.html':
            res.statusCode = 301
            res.setHeader('Location', 'page1')
            res.end()
        case '/page2.html':
            basePath = createPath('page2')
            res.statusCode = 200
            break
        case '/page3.html':
            basePath = createPath('page3')
            res.statusCode = 200
            break
            case '/page4.json':
            basePath = createPath('page3')
            res.statusCode = 200
            break
        default:
            basePath = createPath('error')
            res.statusCode = 404
            break
    }

    fs.readFile('./data.json', (error, data) => {
        res.setHeader('Content-Type', 'application/json')
        res.write(data)
        res.end()
    })
    

    /* const data = JSON.stringify([
        { name: 'Евгений Олегович', age: 123456789 },
        { name: 'Дух Коммунизма', age: 987654321 }
    ])
    res.write(data)
    res.end() */

})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})
