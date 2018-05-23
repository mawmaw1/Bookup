var colors = require('colors/safe');
require('colors');

console.table({
    query_one: {
        mongo: '13464',
        pg: colors.red('13243')
    }
})
