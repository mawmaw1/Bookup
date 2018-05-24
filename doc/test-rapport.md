#### Bojs præsenterer...
# Test Rapport - *Det' bra kuk*

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

