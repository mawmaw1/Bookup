const { Client } = require('pg')
require('dotenv').load();
const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PW,
    port: process.env.POSTGRES_PORT,
})

client.connect()

exports.query1 = (title) => {
    const res = client.query(`
        select Book.title, Author.name FROM Book
        join Book_City USING (bookid)
        join Book_Author using (bookid)  
        join City using (cityid)
        join Author using (authorid)  
        WHERE City.name = '${title}'    
    `)
    return res
}

exports.query2 = (title) => {
    const res = client.query(`
        SELECT City.* from Book
        join Book_City using (bookid)
        join City using (cityid)
        where Book.title = '${title}'  
    `)
    return res
}