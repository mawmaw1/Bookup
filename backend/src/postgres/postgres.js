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
        SELECT DISTINCT Book.bookid, Book.title, array_agg(Author.name) AS "authors" FROM Book
        JOIN Book_City USING (bookid) 
        JOIN Book_Author USING (bookid) 
        JOIN City USING (cityid) 
        JOIN Author USING (authorid) 
        WHERE City.name = '${title}' 
        GROUP BY Book.bookid
        ORDER BY Book.title; 
    `)

    return res
}

exports.query2 = (title) => {
    const res = client.query(`
        SELECT City.* FROM Book
        JOIN Book_City USING (bookid)
        JOIN City USING (cityid)
        WHERE Book.title = '${title}';  
    `)
    return res
}

exports.query3 = (author) => {
    const res = client.query(`
        SELECT Book.*, array_to_json(array_agg(City.*)) AS "cities" FROM Book
        JOIN Book_City USING (bookid) 
        JOIN Book_Author USING (bookid) 
        JOIN City USING (cityid) 
        JOIN Author USING (authorid) 
        WHERE Author.name = '${author}' 
        GROUP BY Book.bookid;
    `)
    return res
}