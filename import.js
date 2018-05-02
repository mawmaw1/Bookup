const fs = require('graceful-fs');
const folder = './files2/';

const cities = fs.readFileSync('cities.txt').toString().split("\n");

const regAuth = /Author:.*/g;
const regTitle = /Title:.*/g;
let stream = fs.createWriteStream("data.json", { flags: 'a' });
let fileCount = 1;

fs.readdir(folder, (err, files) => {
    files.forEach(file => {
        fs.readFile(folder + file, function (err, buf) {
            if (err) console.log(err, file)
            console.log(`Working on: ${fileCount++} out of 37000~ - the current file is ${file}`)
            try {
                let removedWords = buf.toString().replace(/\b[a-z]+/g, '')
                let matchedCities = []

                let authorFound = buf.toString().match(regAuth);
                let author = authorFound[0].substring(6)

                let titleFound = buf.toString().match(regTitle);
                let title = titleFound[0].substring(7)

                let id = file.substring(0, file.lastIndexOf("."))


                for (i in cities) {
                    let rege = "\\b(" + cities[i] + ")\\b";
                    let re = new RegExp(rege);
                    if (removedWords.toString().match(rege)) {
                        matchedCities.push(cities[i])
                    }
                }
                let uniq = a => [...new Set(a)];
                let distinctCities = uniq(matchedCities)


                let book = { "id": id, "Author": author, "Title": title, "Cities": distinctCities }
                stream.write(JSON.stringify(book) + "," + "\n")
            } catch (e) {
                console.log(e, file)
            }
        });

    })

})


