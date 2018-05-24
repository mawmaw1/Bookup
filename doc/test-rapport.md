#### Bojs præsenterer...
# Test Rapport - *Det' bra kuk*

## Test Driven Development
TDD går I al sin enkelthed ud på at udvikle software gennem specifikke test cases – man skriver først tests og derefter kode. TDD er delt op i 5 hoveddele: Add a test, see tests fail, write code, run tests og refactor. Herefter gentages disse 5 trin. 
Konceptet TDD skulle gerne være med til at naturligt udvikle simple designs og give tillid til udviklerne. 

Set over hele forløbet har TDD ikke været en drivende faktor i vores udvikling. Opgaven består af fire forskellige databasekald, og systemet er derfor relativ nemt at kode. Det kræver ikke kompleks eller omfattende business-logik, men i højere grad bare et REST-API og nogle databasekald fra backenden. Af den årsag har vi også haft svært ved at indføre tests tidligt i forløbet, da programmet bare skal kunne returnere nogle queries til en frontend. 
Vi kunne f.eks. have valgt at bruge mocks meget tidligt i forløbet, men da vi ikke havde databaserne oppe at køre og heller ikke havde importeret data (det tog lang tid og mange forsøg) var det relativt svært at designe mocks der skulle repræsentere det endelige data. 

Ved hjælp af mocking havde vi hurtigere kunne skrive tests og begynde at udforme de specifikke queries. Det havde uden tvivl været en fordel at have tests allerede inden vi gik i gang med kodningen af resten af programmet, da vi med tests altid kunne køre en given test og være sikker på, at kaldet mod databasen ikke havde ændret sig – eller hvis en test pludselig fejlede, at data i databasen havde ændret sig, og at det derfor burde undersøges.   
Ved at mocke meget tidligt i forløbet var der dog en chance for, at vi ville ende op med ikke særlig relevante tests. Da vores kode næsten udelukkende snakker sammen med en database kan mocking godt gå hen og blive en smule ugyldigt fordi man ender med at teste et mocking framework mere end den endelige data. Når man mocker angiver man specifikt, hvordan data ser ud og hvordan det skal opføre sig. Man ved dermed på forhånd, hvornår en tilhørende test fejler eller ikke. 

Der er skrevet tests både til vores PostgreSQL og MongoDB database og vi har ved hjælp af disse tests altid kunne sikre os, at data i databasen er som vi forventer. 
Vi har som sagt derfor ikke brugt TDD helt efter hensigten, men hvis der skulle videreudvikles på systemet har vi et godt fundament i form af de tests vi har skrevet til systemet. De sikrer at vi med sikkerhed ved, at data i databasen ikke er ændret, fordi vi ved hvad vi bør få tilbage på de givne kald. Det ville derfor være fordelagtigt at bruge TDD i højere grad hvis man skulle videreudvikle. 
Det giver en enorm sikkerhed i en eventuel fremtidig udvikling fordi man altid kan køre alle tests inden man deployer og dermed være sikker på, at data er intakt. 
Det havde selvfølgelig været væsentligt sværere at regne med disse tests hvis systemet tillod at skrive til databasen. 

Vi har ved hjælp af TDD også refaktoreret koden som konsekvens af de tests der er blevet skrevet. Alle tests kræver en forbindelse til databaserne, og vi var derfor nødsaget til at oprette connect() og disconnect() funktioner som følge af vores tests. Førhen connectede koden automatisk til databaserne når man instantierede postgres og mongo objekterne, men vi ville gerne være i stand til at forbinde og afbryde forbindelserne ved hver individuel test suite. Det gjorde koden mere læsbar og gav os mere kontrol.

## Test pyramiden
Ifølge test pyramiden bør man have langt flere low-level unit tests end high level end-to-end tests, der kører gennem et GUI. Test pyramiden illustrerer, hvordan omkostninger stiger jo højere op i pyramiden man udfører tests. Det er derfor langt billigere at lave unit tests end frontend/GUI tests. Test pyramiden er opdelt i tre lag: Unit-laget, service-laget og UI-laget. 

Vi har gjort brug af tests i alle tre lag i vores projekt, men vi har flere unit og service tests end UI-tests. Som Martin Fowler beskriver det i sin [artikel](https://martinfowler.com/bliki/TestPyramid.html) bør UI-test være et ”second line of defence”, og ikke det primære grundlag for tests. 
Det giver også sig selv, fordi vi ikke præcist kan konkludere, hvad der er galt, hvis en test fejler i frontenden. 
Vi har derfor haft et større fokus på unit- og servicelaget, og derfor findes der også flere tests i vores system her. 
Det mest brugbare lag i vores projekt har været unit-laget, da den mest essentielle kode i systemet bliver udført her. Der findes ikke særlig mange funktioner og derfor heller ikke mange tests, men de tests, der snakker sammen med databaserne har været værdifulde, fordi de er med til at sikre dataintegritet. 

Vi har også tests i service-laget, som tester vores REST-API. De er med til at sikre, at serveren er oppe at køre korrekt og at vi kan tilgå vores databasekald korrekt gennem API’et. 

Vi har brugt Selenium til at udføre tests i frontenden, men det har også været de mest omfattende tests at sætte op. Som det bliver beskrevet i test-pyramiden, bliver det dyrere jo højere op i lagene man går, og det har vi også oplevet i dette projekt. Først og fremmest er der meget manuelt arbejde involveret i at sætte Selenium op, og det er også tidskrævende at skrive tests, fordi man skal have styr på xpaths osv.
Udover dette kræver Selenium også en driver for at virke. Det er relativt nemt at få til at virke på ens egen lokale computer, men det bliver en smule mere omfattende og kompliceret, når man gerne vil have sine Selenium-tests til at virke på den remote server vi bruger til at deploye alt koden. 

## The agile testing quadrants
The agile testing quadrants giver et overblik over de forskellige typer tests, og kan være med til at sikre at man som team dækker alle slags tests. 

Da projektet ikke har haft nogen Scrum owner eller anden type person der har trukket udviklingen i en business-facing retning, har vi helt naturligt dækket de kvadranter der læner sig op af ”supporting the team”. Vi har med andre ord primært udført tests der dækkes i Q1 og Q2. Projektet har ikke haft en stor del af business-logik, og der har derfor heller ikke været stor fokus på at lave tests, der sikrede at real-time-scenarios blev dækket. Derfor er Q3 tests i en meget lille grad blevet dækket. Vi har adskillige gange manuelt testet frontenden for at sikre, at den viste det vi forventede, men det er ikke gjort med en systematisk test tilgang. Vi har i højere grad selv manuelt testet og evt. fixet en given fejl.
Q4 er slet ikke blevet dækket, da det ikke var et krav i opgaveformuleringen at systemet skulle kunne skaleres eller at systemet skulle håndtere en stor mængde load og der var heller ikke nogen krav om performance. 

Q1 dækker vi i form af vores unit/integration tests. De er derfor også automatiserede, og er i høj grad med til at støtte teamet, og har ikke nogen decideret business-value. De giver dog en teknologisk værdi fordi den fremtidige udvikling bliver mere sikker. 
Q2 dækker vi i form af acceptance tests. De er med til at sikre, at systemet også formår at løse de opgaver, der kræves af opgaveformuleringen. De har en høj business-value fordi de er med til at sikre, og dokumentere, at systemet løser opgaverne korrekt. Således kunne en evt. product owner få dokumentation på, at systemet opfører sig som forventet. 
Acceptance-testene er både automatiserede og manuelle. Vha. Selenium kan vi automatisk køre tests, der tjekker om frontenden returnerer det data vi forventer med et givent input. Ligeledes sikrer de manuelle acceptance-tests, at systemet returnerer det rigtige data, men også på en forståelig og brugervenlig måde. Til sammen sikrer de manuelle og automatiserede tests at vi dækker Q2 og giver en business-value. 


## Unit Tests

Unit tests designes til at teste små dele af koden, ofte funktioner/metoder. En god unit test suite gør det muligt at teste store dele af ens kode, på det atomiske plan, og sikre at alle funktioner fungerer som forventet, det vil sige som man har beskrevet i sine unit tests. En god unit test beskriver derfor klart og tydeligt, hvad resultatet af et givent funktionskald bør være, baseret på det input man giver funktionen. Dette afgrænses ikke kun til at hvad funktionen returnere, men også om den smider exceptions ved ugyldigt input og, hvis den er en del af et objekt, om den ændrer tilstand som forventet. Skal man få det bedste ud af unit tests er det derfor ikke nok bare at skrive gode tests, men også at opbygge sin kode så den praktisk giver mening at unit teste, da mere komplekse funktioner er sværere at teste. Dette klan bl.a. gøres ved at designe sine funktioner efter ”single purpose” princippet, altså sikre at en given funktion har et klart definerbart formål eller ansvar.

Jo flere funktioner man aktivt tester, desto bedre ”code coverage” har man. Men det er ikke nødvendigvis hensigtsmæssigt at dække hele ens kodebase, da unit tests kræver ekstra tid at skrive. Man bør derfor kritisk vurdere, hvilke dele af ens kode der er vigtigst at dække ind. Det kan være dele af koden der er meget komlekse eller dele af koden der er centrale og som er kritiske for systemet som helhed.

I vores projekt valgte vi ikke at bruge unit tests. Beslutningen blev træffet på baggrund af de krav der var til vores application, hvis primære formål var at læse data fra vores database i form af forskellige queries, og derefter at vise dem grafisk. Arkitekturen var en 3 lags med front- backend og database, hvor der nærmest ingen forretningslogik lå i backenden. Derfor var der ikke rigtig anledning til at have unit tests, og vores fokus lå istedet på integration tests for at sikre interaktioner mellem de forskellige lag.

## Integration Tests

Integration testing går ud på at teste interaktioner mellem moduler. Det kan være moduler i form af forskellige applikationer, eller forskellige applikationslag. Integration tests går ofte ud på at teste interaktioner mellem modulerne og bruges typisk når man beskæftiger sig med orkestrering af flere applikationer/lag. Integration tests kan være med til at afgøre om en applikation eksponerer funktioner/metoder som forventet, eller sikre at man kan oprette en forbindelse mellem flere applikationer, eventuelt på tværs af servere. Disse former for tests er især værdifulde i systemer hvor moduller afhænger af hinanden.

I vores projekt valgte vi at bruge integration tests, og det var et valg vi traf af flere årsager. Bl.a. afhang vores løsning af database interaktioner, da disse var en central del af kravene til projektet. Med integration testing var det muligt løbende at checke om vi havde forbindelse til vores databaser, samt løbende at overvåge om data ændrede sig. At data forblev intakt var også et kritisk punkt da vi arbejde med to databaser der altid skulle indeholde det samme data. Ved løbende at køre vores test suite var det altså muligt at holde styr på om vores databaser var syncet korrekt. 

## Code Coverage

En vigtig del af testing er, at være klar over hvor meget af ens kode man egentlig tester. Det er ikke nok bare at have en enkelt assertion per funktion man vil teste, man er nødt til at dække flere scenarier (ugyldigt input, grænseværdier, etc.). Deter her at code coverage, og tilhørende værktøjer, kommer ind i billedet.

Jacoco og Istanbul er begge værktøjer til code coverage. Disse værktøjer er bruges i forbindelse med testing, og giver en værdi i form af at afsløre hvor meget af ens kode der egentlig er dækket af tests. De fungerer ved at analysere kodebasen, samt test suites, og ud fra disse vurdere dæknignen af ens kode med hensyn til funktioner, linjer, statements og logical branches.

I vores løsning brugte vi Istanbul som udover at være et af de mest populære code coverage frameworks til node også er rigtig godt integreret med vores test framework: Jest. Dette gjorde opsætningen problemfri, og vi fik derfor code coverage uden omkostninger i form af omstændigt arbejde med opsætning og konfigurering. Det resulterede i at vi, ved kørself af vores test suite, fik genreret code coverage rapporter, som vi gjorde tilgængelige på vores server. Med de metrikker der blev stilt til rådighed kunne vi derfor nemt holde øje med vores code coverageog sikre at vi havde en fornuftig grad af dækning gennem vores tests.

## Acceptance testing

I forbindelse med opstarten på vores projekt, noterede vi os de bruger-accept tests som vi mente var relevante i forhold til de fire databasequeries som var et projektkrav. Accept-testene skulle bruges til at sikre, at brugeren af systemet kan benytte det i forhold til de opstillede projektkrav. Herudover brugte vi disse tests, for hurtigt at have et overblik over, hvad systemet skulle kunne håndtere, og de gav os mulighed for hurtigt at komme i gang med udviklingen, da slutresultatet stod beskrevet klart i disse tests.

Øvelsen i at lave disse accept-tests, var medvirkende til at sætte en tænkeproces i gang for gruppen, og det gav os mulighed for at have et godt udgangspunkt for vores udvikling, og noget som vi løbende kunne vende tilbage til, og sætte flueben ved, når accept-tests kunne udføres uden fejl og dermed godkendes.
Vores brug af accept-tests, gjorde det desuden nemmere for os at lave automatiserede tests, da vi kunne bruge dem som skabelon for, hvad vores automatiserede tests skulle teste sig igennem. 

Nogle vil måske mene at man først skriver sine accept-tests når et system er fuldstændig færdigudviklet, da man jo ikke kan teste et system før funktionaliteten er på plads. I vores tilfælde var det dog en stor hjælp rent udviklingsmæssigt, og det er noget der uden tvivl har styrket vores udviklingsproces.

## UI Testing

Vi har i løbet af vores udvikling løbende testet vores grafiske brugergrænseflade. Vi har både testet manuelt, og benyttet os af automatiserede løsninger. For blandt andet at give vores build-server mulighed for automatisk at teste vores brugergrænseflade, benyttede vi os af Selenium-Webdriver. Med denne løsning sikrede vi først og fremmest at vores grænseflade blev testet på en måde, hvor vi ved præcist hvilke dele og i hvilken sammenhæng testene bliver udført. Herudover gav denne løsning os mulighed for at teste vores system, i et isoleret miljø på vores build-server. I forhold til at sidde manuelt og teste, sparede det os yderligere en masse tid, da en Selenium-test er væsentlig hurtigere til at udføre en given test, end hvis man manuelt skulle teste sit system igennem. Dette kommer især til udtryk på de queries, som tager længere tid end andre, og hvor man ønsker at teste flere gange i træk. 

Selve opsætningen af disse tests var ikke nogen større udfordring når tests blev kørt lokalt, men det var en væsentligt større udfordring at få dem til at køre på vores build-server. Build-serveren har ingen grafisk brugergrænseflade, hvor man kan kontrollere at selenium-testene bliver kørt som de skal, men blot en kommandolinjebrugergrænseflade. Derfor undersøgte vi hvilken løsning der ville fungere bedst, da vi fremover måtte teste i en ’i blinde’ på grund af den manglende grafiske brugergrænseflade. Vi testede brugen af Selenium-chrome-docker images, men oplevede store udfordringer i forhold til at docker-systemet ikke kunne finde samme elementer, som vores lokale chromedriver uden problemer kunne finde. Vi valgte derfor at installere en chromedriver samt selenium-server direkte på build-serveren, som vores tests på build-serveren herefter benyttede sig af.

Udfordringerne i forhold til at få automatiseret sine tests i en CI/CD-kæde tog tid, men det endelige resultat var udfordringen værd, og på sigt vil det uden tvivl vise sig at være investeringen værd, i forhold til at være sikker på at systemet bliver testet hurtigt og ordentligt.

I forhold til brug af automatiseret testing, valgte vi først at begynde på dette, da det endelige layout og system lå mere eller mindre fast. Brugen af automatiseret testing på et system som jævnligt ændres, kan skabe unødig brug af tid, da eventuelle skrevne tests vil skulle laves om alligevel. Indtil systemet lå fast, benyttede vi os derfor af manuel testing. Da vi påbegyndte brugen af Selenium i forhold til testing, stod det klart at brugen af automatiseret brugergrænseflade-testing var noget som gav vores projekt et løft, og som var med til at sikre at vores accepttests kunne gennemføres på en korrekt måde, hver gang.

## CI/CD

I forbindelse med vores projekt, har vi benyttet os af en ’Continuous Integration / Continuous Delivery’ strategi. Vi valgte at bruge en sådan strategi for at sikre en hurtig, effektiv og gennemtestet deployment af vores applikation. I den forbindelse valgte vi at bruge en dedikeret Jenkins-buildserver, samt Docker-containers til at indeholde vores front- og backend systemer, samt Docker-containers indeholdende vores PostgreSQL- og MongoDB databasesystemer.

Vores CI/CD-kæde er bygget op således, at når der committes til vores Git-repository på enten front- eller backend delen, registrerer vores Jenkins-buildserver via en Git-webhook at der er en ny revision tilgængelig. Herefter starter et eller flere test-builds, alt efter hvilken del af applikationen der har modtaget ændringer.

Såfremt test-builds bliver gennemført uden fejl, starter et dertilhørende deploy-build, som sørger for at den gennemtestede kode bliver deployed på vores dedikerede applikationsserver, som indeholder alle tidligere nævnte Docker-containers.
Denne løsning har sikret, at der har været en rød tråd i forbindelse med at få testet kode, og fanget eventuelle fejl inden en måske fejlbehæftet opdatering af koden skulle blive deployed. Således bliver al kode testet, uanset om udvikleren selv har kørt sine tests inden et commit. Det har herudover vist sig i løbet af projektet, at et commit som måske har virket lokalt hos en udvikler, har fejlet når tests er blevet kørt på vores build-server. CI/CD-strategien har derfor vist sig at være helt suveræn i forhold til at sikre, at der ikke bliver deployed bugs til vores live-server.

I forhold til den tid der skal afsættes til at opsætte og vedligeholde en CI/CD-kæde, kan man diskutere hvorvidt det er nødvendigt at have en sådan kæde til et projekt som dette. Det er bestemt ikke fuldstændig nødvendigt at have, og nogle ville argumentere for at tiden det kræver at opsætte og vedligeholde ikke er tiden og besværet værd. Vores argument for at have det er helt klart, at når et system vokser i kompleksitet og funktionalitet, bliver behovet for at have en funktionel CI/CD-kæde mere og mere aktuel og nødvendig, for at sikre at alle test- og deployment trin bliver gennemført på en standardiseret og ensformig måde, således at fejlbehæftet kode ikke bliver deployed. Dette gør sig især gældende, når man er et team der arbejder på forskellige funktioner i samme del af et system, hvilket ofte gjorde sig gældende i vores proces. Investeringen i en CI/CD-kæde var derfor en stor hjælp for os, og generelt mener vi at det er noget man altid bør have, når man udvikler et større system.


