const bookTableName = 'Book';
const bookAuthorTableName = 'Book_Author';
const authorTableName = 'Author';
const bookCityTableName = 'Book_City';
const cityTableName = 'City';

const getStamp = () => {
    const d = new Date();
    return `m${d.getMinutes()}s${d.getSeconds()}`
};

const outputFileName = `postgres-insert-script(${getStamp()}).sql`;
let output = '';

const fs = require('graceful-fs');

const jsonStringRaw = fs.readFileSync('books.json').toString();

const parsed = JSON.parse(jsonStringRaw);

const authorsIndex = {};
const authors = [];

const data = {
    books: [],
    book_authors: [],
    authors: [],
    book_cities: [],
    cities: []
};

const indices = {
    author: {} // key = author name, value = index in array (data.author)
};

const bookId = new NextId();
const authorId = new NextId();
const cityId = new NextId();

console.time('total');
console.time('parsing json');
for(let i = 0; i < parsed.length; i++){
    const current = parsed[i];

    // book
    const title = (current.title || 'Unknown Title').trim();
    const book = new Book(bookId.getNext(), title);
    data.books.push(book);

    // author
    const authors = current.authors;
    authors && authors.forEach(aName => {
        const aIndex = indices.author[aName];
        let author;
        if(aIndex){
            // author exists, we only add Book_Author
            author = data.authors[aIndex];
        }else{
            // new author, we add to data and save the indice
            author = new Author(authorId.getNext(), aName.trim());
            const newIndex = data.authors.push(author) - 1;
            indices.author[aName] = newIndex;
        }

        // add book_author
        bookAuthor = new Book_Author(book._bookid, author._authorid);
        data.book_authors.push(bookAuthor);
    });

    // add city ref
    current.cityRefs.forEach(cRef => {
        const bookCity = new Book_City(book._bookid, cRef);
        data.book_cities.push(bookCity);
    })
}
console.timeEnd('parsing json');

// determines the order of insertion
const order = ['books', 'authors', 'book_authors', 'book_cities'];



// option #1
console.time('writing to string');
order.forEach(key => {
    data[key].forEach(obj => {
        output += obj.toInsertString() + '\n';
    })
});
console.timeEnd('writing to string');

console.time('writing to file');
fs.appendFile(outputFileName, output, function (err) {
    if (err) throw err;
    console.log('Saved to file:', outputFileName);
});
console.timeEnd('writing to file');

// option #2


console.timeEnd('total');



// functions below

function Book(_bookid, title){
    assert({_bookid, title});
    this._bookid = _bookid;
    this.title = title;
    this.toInsertString = getToInsertString(bookTableName);
}

function Book_Author(bookid, authorid){
    assert({bookid, authorid});
    this.bookid = bookid;
    this.authorid = authorid;
    this.toInsertString = getToInsertString(bookAuthorTableName);
}

function Author(_authorid, name){
    assert({_authorid, name});
    this._authorid = _authorid;
    this.name = name;
    this.toInsertString = getToInsertString(authorTableName);
}

function Book_City(bookid, cityid){
    assert({bookid, cityid});
    this.bookid = bookid;
    this.cityid = cityid;
    this.toInsertString = getToInsertString(bookCityTableName);
}

function City(_cityid, name, lat, long){
    assert({_cityid, name, lat, long});
    this._cityid = _cityid;
    this.name = name;
    this.lat = lat;
    this.long = long;
    this.toInsertString = getToInsertString(cityTableName);
}

function getToInsertString(tableName){
    return function(){
        const keys = [];
        const vals = [];

        objEach(this, (key, value) => {
            if(key.indexOf('_') === 0 || typeof value === 'function'){
                return;
            }
            keys.push(key);

            vals.push(sqlSanitizeVal(value));
        });

        return `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${vals.join(', ')})`
    }
}

function sqlSanitizeVal(val){
    if(Number.isInteger(val)){
        return val;
    }else{
        return "'" + val + "'";
    }
}

function NextId(){
    this.n = 1;
    this.getNext = function(){
        return this.n++;
    }
}

function assert(args){
    const errors = [];
    objEach(args, (key, val) => {
        if(val === null || val === undefined){
            errors.push(key)
        }
    });
    if(errors.length > 0){
        throw new Error(`Argument Error, following keys were null or undefined: ` + errors.join(', '));
    }
}

function objEach(obj, fn){
    for(let key in obj){
        if(!obj.hasOwnProperty(key)) continue;
        fn(key, obj[key]);
    }
}