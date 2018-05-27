# 1. Hvilke databaser er brugt

Vi har i løbet af semestret modtaget undervisning i key-value, relationel, graf samt dokumentorienterede databasesystemer. I forhold til denne opgave overvejede vi hvilke databasesystemer der gav mest mening at benytte, baseret på både det data som vores systemer skulle håndtere og arbejde med, samt på vores egne erfaringer fra semesterets undervisning.

Vores konklusion på overvejelserne endte med at falde ud til fordel for MongoDB og PostgreSQL. Key-value og graf databasesystemer blev fravalgt, da vi umiddelbart ikke syntes at de ville være optimale for det projekt som vi skulle arbejde med. Key-value er godt når performance er et af de vigtigste parametre, men i forhold til de mange forskellige relationer som opgaven trods alt indeholdt, mente vi at en relationel database ville give bedre mening. Vi overvejede grafdatabasen Neo4js i stedet for MongoDB, men da relationerne i den data vi skulle arbejde med ikke var specielt dybe, virkede det ikke som et optimalt databasevalg.

Vi har herudover længe gerne ville undersøge forskellene på performance, opsætning, vedligeholdelse samt indsættelse af data i de to forskellige databasesystemer, MongoDB og PostgreSQL. SQL har i årtier ligget i førersædet over benyttede databasesystemer, og vi ville med dette projekt blandt andet undersøge om der nu også var en god grund til dette.

Vi syntes desuden at brugen af en NoSQL database til et projekt som dette var meget interessant, da det er en databasetype der er meget nem at opsætte og komme i gang med at benytte, i forhold til almindelig SQL.

# 2. How data is modeled in the database.

Modellering af data har stor indflydelse på et system. Det er vigtigt at udforme modeller der lever op til de krav der stilles, og som underbygger en solid struktur for hele systemet. Vi tog derfor udgangspunkt i opgavebeskrivelsen og de krav der var til projektet, og udformede et fælles ER Diagram der var basis for de mere platform-specifikke modeller til vores MongoDB og PostgreSQL databaser:

![image alt text](image_0.png)

Med henblik på **PostgreSQL **lavede vi, ud fra vores ERD, et diagram der afspejlede tabel-strukturen i databasen, og som indeholdte primary- og foreign keys samt deres relationer:

![image alt text](image_1.png)

Dette gjorde det nemt at oprette selve tabellerne i databasen, da det blot var et spørgsmål om at finde de korrekte datatyper til tabellernes kolonner.

Med henblik på **MongoDB** besluttede vi at bruge frameworket Mongoose, der giver mulighed for at bruge JSON-schemas til at få data-struktur og validering i MongoDB. Vi lavede følgende diagram der beskriver struktur samt datatyper for de forskellige entiteter, i en form der passer til det JSON-format vores schemas udformes i:

![image alt text](image_2.png)

Diagrammet beskriver derudover relationer mellem entiteter, der også er en hjælp til udformning af vores JSON-schemas.

### Indexes

Med henblik på at kunne sammenligne de to databaser bedst muligt, valgte vi at sætte en række indexes op i både PostgreSQL og MongoDB. Indexering giver databasen mulighed for at udnytte sorterede data-strukturer, såsom binary search trees, til at optimere den måde data tilgås og undgå sekventielle søgninger hvor hver eneste entry i et tabel/collection evalueres. Ved at benytte indexering var vi sikre på at få den bedste repræsentation af de to databasers performance, og på den måde fik vi en mere realistisk sammenligning.

I **PostgreSQL **opsatte vi følgende indexes:

![image alt text](image_3.png)

Der er, per default, indexes på alle primary keys. Derudover oprettede vi indexes på foreign keys i book_city og book_author tabellerne for at optimere joins, og indexes på nogle af de felter vi filtrere på i vores queries (city_name og city_point).

I **MongoDB **så vores indexes således ud:

![image alt text](image_4.png)

Her fulgte vi samme fremgangsmåde og indexerede på cityRefs, for at optimere joins, samt authors, location og cityName for at optimere filtrering.

# 3. How data is modeled in your application.

Når data hentes fra databasen og passerer gennem backend-laget, sker der nogle få ændringer for at sikre at frontenden modtager data der strukturelt set er ens, uanset om det kommer fra PostgreSQL eller MongoDB.

 

I alle MongoDB-kald har vi derfor været nødsaget til at udføre noget manuelt arbejde vha. kode, der sikrer at responset kan bruges i frontenden. Vi har gjort brug af array-concatinations og maps til at omforme data fra MongoDB, og det ser derfor en smule anderledes ud i applikationslaget i forhold til databaselaget. Dette er et naturligt resultat af at MongoDB og PostgreSQL returnerer data en smule anderledes hver især, og fordi vi ikke har brugt samme navne på alle properties på databaserne.

 

Da vi satte frontenden op brugte vi i første omgang resultaterne fra PostgreSQL, og det er nok også grunden til at det er MongoDB-resultaterne der bliver lavet om i stedet for PostgreSQL-resultaterne. Vi var dog alle sammen enige om, at PostgreSQL-resultaterne direkte fra databasen var væsentligt pænere end MongoDB-resultaterne. 

Et eksempel på hvordan data er modelleret i applikationen kunne være fra query1 i **Postgre****SQL**: 

![image alt text](image_5.png)

Det tilsvarende data fra MongoDB ser som beskrevet ovenover derfor næsten ens ud. 

Generelt er data modelleret som JSON i alle responses og følger stort set samme mønster som billedet oven over.

# 4. How the data is imported.	

Vores strategi for at få importeret alle bøgerne, var at downloade nogle forskellige bøger, og udvikle et script der ville finde de byer der matchede byerne i cities15000.txt. Vi fandt hurtigt ud af at det ikke ville virke, at matche alle de ord der startede med stort bogstav, da mange byer består af flere ord. Det ville også tage for lang tid at matche hver by, med hvert ord i tekstfilen, og desuden ville det give forkerte resultater, da nogle bynavne indeholder andre bynavne, for eksempel "York" og “New York City”. 

Vi valgte at bruge et natural-language processing bibliotek udviklet af MIT, kaldet MITIE, til at udtrække bynavne. Værktøjet tager noget tekst som input, og returnerer hvilke byer der blev fundet i den givne tekst, som vi derefter kunne matche på byerne i cities15000.txt. 

Bogtitel og forfatter udtrak vi fra meta-dataen i starten af bogen, men da mange bøger havde flere forfattere, som blev skrevet på mange forskellige måder (bl.a. splittet med ",", “and”, “&”, etc.) brugte vi også MITIE til at finde forfatterne, så vi ikke skulle bekymre os en masse forskellig formater. 

Scriptet blev derefter kørt på alle bøgerne, hvilket tog omkring 14 timer, og resultatet blev lagt i en JSON-fil, der nemt kunne importeres af MongoDB via mongoimport. For at importere dataen i PostgreSQL var vi dog nødt til at lave et script der genererede et SQL-script, som PostgreSQL kunne importere.

Udviklingen af scriptet gennemgik flere iterationer hvor der blev fikset små fejl, og eksempelvis ændrede vi forfattere fra en streng til et array ved brug af MITIE. Hver fejl var meget tidskrævende, da scriptet som tidligere nævnt tog lang tid at køre, men vi nåede til et punkt hvor vi var tilfredse med vores data.

Nogle af bøgerne brugte et helt andet format, hvilket resulterede i at der er ~500 bøger i databaserne der ikke har nogen titel, derudover er der mange bøger der ikke har en forfatter, på grund af manglende meta-data.

# 5. Behavior of query test set. 

Including a discussion on how much of the query runtime is influenced by the DB engine and what is influenced by the application frontend.

### Frontend behavior

Når man bruger vores frontend til at udføre de forskellige queries bliver dataen sendt over HTTP i JSON-format, som tager næsten lige så lang tid at downloade på frontenden som kaldet i sig selv. Dette kan ses i et browser developer tool:

![image alt text](image_6.png)

De queries der giver et stort resultat tager derfor en del længere tid for browseren at håndtere. Af denne grund har vi valgt ikke at teste performance gennem frontenden, men udelukkende direkte på databaserne gennem backenden. På den måde er vi sikre på at vores performance test ikke er påvirket af browseren eller React.js. 

 

Normalt ville man i øvrigt lave "pagination" på backenden for at afgrænse resultatet til det der er nødvendigt at vise på frontenden. Dvs. at man f.eks. kun henter 20 results ad gangen og ved brug af offset henter de næste 20, hvis brugeren har valgt at gå til side to eller lignende. På den måde vil selve query’en tage kortere tid, og formindske den data der skal downloades, hvilket forbedrer responstiden markant.

### Query behavior

For at få mere indsigt i de forskellige queries brugte vi nogle af de indbyggede redskaber i databaserne, bl.a. PostgreSQL Query Planner. Her kunne vi se, hvordan vores queries blev udført i databasen, og hvilke led i vores queries der tog længst tid af behandle. Vi var især på udkig efter sekventielle scans og brugte disse som udgangspunkt for, hvilke columns vi indexerede på.

En analyse af et af vores queries så sådan ud:

![image alt text](image_7.png)

Her fremgår det at vores query resultere i to sekventielle skanninger, hvilket tager en del ekstra tid. Ved at oprette indexes på ’book_author.bookid’ og ’city.name’ blev query’en udført lidt mere effektivt:

![image alt text](image_8.png)

Resultaterne af dette kunne også ses i vores performance tests, hvor tiden det tog at eksekvere de forskellige queries drastisk blev reduceret efter oprettelse af indexes. 

Vi brugte også redskaber i MongoDB, til at få lidt mere information omkring query planning:

![image alt text](image_9.png)

Indeksering har selvfølgelig også en pris og gør INSERT og UPDATE operationer langsommere for den tabel der indekseres (fordi indexes altid skal opdateres når data ændres). Vores projekt gik dog ud på at lave en applikation hvor der eksklusivt skulle foretages read operationer og derfor havde vi ret stor frihed i forhold til at udnytte indeksering. Man skal dog være opmærksom på at indeksering kan have omkostninger og kun bør bruges når man ved at der er et reelt udbytte at hente i den øgede performance man får ved read operationer.

### Query performance

For at oprette indexes og have mulighed for at se deres effekt på query performance, var det nødvendigt at oprette en form for test, så vi løbende kunne holde styr på hvordan performance ændrede sig når vi oprettede indexes. Derfor oprettede vi **performance.js** filen, som ved eksekvering kørte en række queries op imod vores to databaser. Hver type query kørte i sekvens, og løbende blev der holdt styr på hvor lang tid de forskellige typer queries tog. Når alle queries var færdige, blev resultaterne printet. Gennem udviklingen var det meget nyttigt løbende at kunne teste performance på den måde, da man med det samme kunne få feedback på de ændringer man lavede. På følgende billede ses resultatet af vores performance-tests før vi oprettede indexes:

![image alt text](image_10.png)

Samt et billede af vores resultater efter oprettelse af indexes:

![image alt text](image_11.png)

total_time beskriver hvor lang tid det tog for den givne database at eksekvere alle 20 queries (5 per type). Derefter følger individuelle mål på, hvor lang tid de forskellige typer queries tog (i sidste billede er der også procenter der angiver, hvor meget hurtigere den vindende engine var). Det vil sige at tallene under query_one eksempelvis beskriver hvor lang tid de to engines hver især var om at udføre de 5 queries af den pågældende type (bøger der nævner en specifik by). De to databaser brugte de samme byer, bøger, authors etc. i deres queries for at sikre at tests var lige.

Kigger vi på resultaterne kan vi se at PostgreSQL overordnet set er hurtigere, hvor den mest markante forskel i hastighed for de individuelle query typer findes hos query_four. Eksekveringen af query_four i database-laget gør brug af spatial-indexes, så umiddelbart kunne man godt konkludere at der var en forskel på, hvor effektive de to engines er på dette område.

Det er selvfølgelig svært at vurdere om der kan have været andre faktorer på spil da der er forskel på hvordan de forskellige queries udformes i MongoDB og PostgreSQL.

# 6. Your recommendation

For which database engine to use in such a project for production.

For endeligt at kunne konkludere en "vinder" eller hvilken database vi ville anbefale kommer det lidt an på i hvilken sammenhæng man skal bruge databaserne.

Vi synes uden tvivl at MongoDB er en langt nemmere database at sætte op og komme i gang med. Det gjorde sig specielt gældende i forhold til at indsætte alt data i databasen, hvor MongoDB’s *mongoimport *gjorde alt arbejdet for os mht. at indsætte data, da den bare skulle bruge en JSON-fil. Til sammenligning var vi som beskrevet tidligere nødt til at udvikle vores eget script til at indsætte data i PostgreSQL og det tog os flere forsøg før vi havde et script der indsatte alt data præcis som vi ville have det.

Ligeledes var der ikke behov for at tegne et ER-diagram over de specifikke tables i MongoDB, hvilket gjorde sig gældende for PostgreSQL. I en relationel database er man nødt til at modellere databasens udseende og relationer før man overhovedet kan begynde at importere data (hvis man altså ønsker et ordentligt design fra starten), hvorimod MongoDB tillader at man bare kan importere data i forskellige collections.

Af den årsag havde vi valgt MongoDB, hvis vi skulle udvikle et system som dette, der kun består af relativt få queries, og hvor man samtidig ikke har adgang til at skrive til databaserne. Det har uden tvivl taget længst tid at sætte PostgreSQL op og importere data, og af tidsmæssige årsager ville vi derfor vælge MongoDB. Hvis man udviklede et projekt der var hårdt truet af *time-to-market* konkurrence havde det ligeledes også været vores anbefaling at bruge MongoDB.

Ud fra de performancetests vi har udført i projektet, er PostgreSQL hurtigst i 3 ud af 4 queries. PostgreSQL er herudover gennemsnitligt 50% hurtigere end MongoDB, såfremt man kigger på samtlige queries. I query 4 er PostgreSQL væsentligt hurtigere end MongoDB, og i query 1-3 ligger de to databasesystemer meget tæt op ad hinanden. Begge databaser er dog meget hurtige, og i den situation hvor forskellen er størst mellem databaserne, drejer det sig højst om et enkelt sekund. Derfor mener vi ikke som udgangspunkt at man kan anbefale den ene fremfor den anden i forhold til performance, men hvis det alligevel skulle være et meget vigtigt parameter i et lignende projekt samt i produktion, vil vi anbefale at benytte PostgreSQL. 

Når alt er sagt har vi konkluderet, at vi havde valgt PostgreSQL som database, hvis systemet skulle videreudvikles fra dets nuværende tilstand. Vi mener alle sammen at PostgreSQL er et utrolig kraftigt databaseværktøj, og vi har været specielt glade for at bruge det i sammenhæng med de queries, der var krævet af opgaven. De queries der er skrevet i PostgreSQL er nemmere at læse, og samtidig er vi ret vilde med de mange funktioner og hjælpemidler det stiller til rådighed. F.eks. ville vi gerne have en query der fandt alle bøger baseret på et bynavn selv og uden hjælp fra kode. Det var utrolig nemt med aggregeringsfunktionen *group by*, og samtidig kunne wrappe det i en array_to_json() funktion, der samtidig også sørgede for at give os resultatet i JSON, hvilket gjorde udviklingen i frontenden meget nemmere.

Undervejs i projektet stødte vi på MongoDB’s *document size limit*. Det viser sig, at nogle byer bliver nævnt i så mange bøger, at det overstiger MongoDB’s document size limit. Det er muligt at gøre brug af MongoDB’s  *mongofiles*, men så bliver opsætningen af MongoDB også mere omstændig, og vi synes ikke vi havde tid til at begynde at sætte det op. Dette er med til yderligere at forklare, hvorfor vi havde valgt PostgreSQL over MongoDB i et større og mere omfattende system - specielt hvis man opererede med et endnu større datasæt end det vi har brugt i opgaven.

