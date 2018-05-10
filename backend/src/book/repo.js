/**
 * Created by Kristian Nielsen on 07-05-2018.
 */
const books = [
    {
        'author': 'Magnus',
        'title': 'Laktose og Mig'
    },
    {
        'author': 'Kristoffer Noga',
        'title': 'Tesla Drømmen'
    }
];

module.exports = {
    get (id) {

        return books[id];

    }
};