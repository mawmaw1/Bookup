const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: '212.47.237.59',
    database: 'postgres',
    password: 'kukenrbra',
    port: 7655,
})

client.connect()

exports.query2 = (title) => {
    const res = client.query(`
        SELECT City.* from Book
        join Book_City using (bookid)
        join City using (cityid)
        where Book.title = '${title}'  
    `)
    return res
}