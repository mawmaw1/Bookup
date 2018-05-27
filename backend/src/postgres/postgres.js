const { Client } = require('pg')
require('dotenv').load();
const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PW,
    port: process.env.POSTGRES_PORT,
});

exports.connect = () => {
    client.on('error', (err) => {
        console.error('there is something with wrong!', err.stack)
    })

    return client.connect().then(() => {
        const e = (key) => process.env[key];
        console.log('connected to',
            `postgres://${e('POSTGRES_USER')}:${e('POSTGRES_PW')}@${e('POSTGRES_HOST')}:${e('POSTGRES_PORT')}/${e('POSTGRES_DB')}`)
    }).catch(err => {
        console.log(err);
    })
}

exports.disconnect = async() => {
    await client.end()
}


exports.query1 = (title) => {
    const res = client.query(`
        SELECT book.bookid, book.title, array_agg(author.name) AS "authors" FROM book
        JOIN book_city USING (bookid) 
        LEFT OUTER JOIN book_author ON (book.bookid = book_author.bookid) 
        JOIN city USING (cityid) 
        LEFT OUTER JOIN author ON (author.authorid = book_author.authorid) 
        WHERE city.name = '${title}' 
        GROUP BY book.bookid
        ORDER BY book.title; 
    `)

    return res
}

exports.query2 = (title) => {
    const res = client.query(`
        SELECT city.* FROM Book
        JOIN book_city USING (bookid)
        JOIN city USING (cityid)
        WHERE book.title = '${title}';  
    `)
    return res
}

exports.query3 = (author) => {
    const res = client.query(`
        SELECT book.*, array_to_json(array_agg(city.*)) AS "cities" FROM book
        JOIN book_city USING (bookid) 
        JOIN book_author USING (bookid) 
        JOIN city USING (cityid) 
        JOIN author USING (authorid) 
        WHERE author.name = '${author}' 
        GROUP BY book.bookid;
    `)
    return res
}

exports.query4 = (lat, long) => {
    // CREATE EXTENSION cube;
    // CREATE EXTENSION earthdistance;
    // Allows us to use the <@> operator which returns the distance in miles instead of degrees. 
    // 6.21371192 miles == 10 km
    const res = client.query(`
        SELECT book.*, array_to_json(array_agg(city.*)) AS "cities" FROM book
        JOIN book_city USING (bookid) 
        JOIN city USING (cityid) 
        WHERE position <@> point (${long}, ${lat}) < 6.21371192 
        GROUP BY book.bookid
        ORDER BY book.title;
    `)
    return res
}