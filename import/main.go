package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/sbl/ner"
)

// Requires https://github.com/mit-nlp/MITIE to be installed
// can be installed with homebrew

// import cities:
// tsv:
// mongoimport --drop --db gutenberg --collection cities --type tsv --headerline --file /data/db/utf_cities.tsv
// json:
// mongoimport --db gutenberg --collection books --file /data/db/books.json --jsonArray --drop

/* index:
db.books.createIndex({'cityRefs': 1})
db.books.createIndex({'authors': 1})
db.cities.createIndex({'cityName': 1})
db.cities.createIndex({'location': '2dsphere'})
*/

func mitieExt(path string) *ner.Extractor {
	ext, err := ner.NewExtractor(path)
	if err != nil {
		log.Panic(err)
	}
	fmt.Println("MITIE loaded")
	return ext
}

func setupLogs() *os.File {
	logs, err := os.OpenFile("logs", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Panic(err)
	}
	log.SetOutput(logs)
	return logs
}

func main() {
	// "/root/MITIE/MITIE-models/english/ner_model.dat"
	path := *flag.String("model-path", "/usr/local/share/MITIE-models/english/ner_model.dat", "path to mitie model data")
	filesDir := *flag.String("filesdir", "./files", "path to books")

	flag.Parse()

	ext := mitieExt(path)
	defer ext.Free()

	cities := cities()
	books := make([]*Book, 0)

	defer setupLogs().Close()

	files, err := ioutil.ReadDir(filesDir)
	if err != nil {
		log.Panic(err)
	}

	fmt.Printf("Scraping %d files\n", len(files))
	for i := range files {
		if strings.HasSuffix(files[i].Name(), ".txt") {
			book := scrapeBook(fmt.Sprintf("%s/%s", filesDir, files[i].Name()), ext, cities)
			book.ID = i
			book.FileName = files[i].Name()
			books = append(books, book)

			log.Printf("file #%d/%d - title: %s, authors: %+v\n", i+1, len(files), book.Title, book.Authors)
		}
	}

	writeJSONBooks(books)
	fmt.Println("Done")
}

func writeJSONBooks(books []*Book) {
	rela, err := os.OpenFile("books.json", os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Panic(err)
	}
	defer rela.Close()

	b, err := json.Marshal(books)
	if err != nil {
		log.Println(err)
	}

	_, err = rela.Write(b)
	if err != nil {
		log.Println(err)
	}
}

func scrapeBook(filepath string, ext *ner.Extractor, cities map[string]*city) (book *Book) {
	book = &Book{}
	cityRefs := make(map[int64]bool)

	file, err := os.Open(filepath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	info := true
	authorLine := ""

	reader := bufio.NewReader(file)

	for {
		buffer := bytes.Buffer{}

		b, _, err := reader.ReadLine()
		if err != nil {
			if err != io.EOF {
				log.Println(err)
			}
			break
		}

		_, err = buffer.Write(b)
		if err != nil {
			log.Println(err)
			break
		}

		// Rest of period
		if !info {
			for {
				b, _, err := reader.ReadLine()
				if err != nil {
					break
				}
				if s := strings.TrimSpace(string(b)); len(s) <= 0 {
					break
				}
				buffer.Write([]byte(" "))
				buffer.Write(b)
			}

			if err != nil {
				break
			}
		}

		line := string(buffer.Bytes())

		if info {
			if strings.Contains(line, "*** START OF THIS PROJECT GUTENBERG EBOOK") {
				info = false
			} else if strings.Contains(line, "Title: ") {
				book.Title = strings.TrimPrefix(line, "Title: ")
			} else if strings.Contains(line, "Author: ") {
				authorLine = strings.TrimPrefix(line, "Author: ")
				tokens := ner.Tokenize(authorLine)

				es, err := ext.Extract(tokens)
				if err != nil {
					log.Fatal(err)
				}

				for _, v := range es {
					if v.Tag == 0 {
						book.Authors = append(book.Authors, v.Name)
					}
				}
			}
		} else {
			tokens := ner.Tokenize(line)

			es, err := ext.Extract(tokens)
			if err != nil {
				log.Fatal(err)
			}

			for _, v := range es {
				if v.Tag == 1 {
					if c, ok := cities[v.Name]; ok {
						log.Println("city:", c.id, v.Name, v.Score, "in", book.Title)
						cityRefs[c.id] = true
					}
				}
			}
		}
	}

	book.CityRefs = make([]int64, 0, len(cityRefs))

	for k := range cityRefs {
		book.CityRefs = append(book.CityRefs, k)
	}

	return
}

// Load cities
func cities() (cities map[string]*city) {
	cities = make(map[string]*city)

	file, err := os.Open("./utf_cities.tsv")
	if err != nil {
		log.Panic(err)
	}

	reader := bufio.NewReader(file)

	for {
		b, _, err := reader.ReadLine()
		if err != nil {
			if err != io.EOF {
				log.Println(err)
			}
			break
		}

		ww := strings.Split(string(b), "\t")
		if len(ww) < 4 {
			log.Panic("Malformed cities file")
		}

		id, _ := strconv.ParseInt(ww[0], 10, 64)
		// lat & lng unused
		lat, _ := strconv.ParseFloat(ww[2], 64)
		lng, _ := strconv.ParseFloat(ww[3], 64)
		cities[ww[1]] = &city{
			id:   id,
			name: ww[1],
			lat:  lat,
			lng:  lng,
		}
	}
	return
}

type city struct {
	id   int64
	name string
	lat  float64
	lng  float64
}

// Book - exported bc json marshal
type Book struct {
	ID       int      `json:"id"`
	FileName string   `json:"fileName"`
	Title    string   `json:"title"`
	CityRefs []int64  `json:"cityRefs"`
	Authors  []string `json:"authors"`
}