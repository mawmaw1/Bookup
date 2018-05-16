const { Client } = require('pg')
require('dotenv').load();
const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PW,
    port: process.env.POSTGRES_PORT,
});

client.connect().then(() => {
    const e = (key) => process.env[key];
    console.log('connected to',
        `postgres://${e('POSTGRES_USER')}:${e('POSTGRES_PW')}@${e('POSTGRES_HOST')}:${e('POSTGRES_PORT')}/${e('POSTGRES_DB')}`)
}).catch(err => {
    console.log(err);
})

client.on('error', (err) => {
  console.error('there is something with wrong!', err.stack)
})

exports.query1 = (title) => {
    const res = client.query(`
        SELECT DISTINCT Book.bookid, Book.title, array_agg(Author.name) from Book
        JOIN Book_City using (bookid) 
        JOIN Book_Author using (bookid) 
        JOIN City using (cityid) 
        JOIN Author using (authorid) 
        WHERE City.name = '${title}' 
        GROUP BY Book.bookid
        ORDER BY Book.title; 
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