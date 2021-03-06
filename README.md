# Bookup

## Rapporter

Direkte links til rapporter:

#### [Database](https://github.com/mawmaw1/Bookup/blob/master/doc/db-rapport.md)
#### [Test](https://github.com/mawmaw1/Bookup/blob/master/doc/test-rapport.md)

### Gruppe 4
- Kristoffer Noga
- Christopher Borum
- Kristian Nielsen
- Magnus Larsen

## IP's


Psql (postgres / *-rbra):
212.47.237.59:7655

Mongo (bois / *-rbra):
212.47.237.59:7644

Jenkins (bois / *-rbra):
51.15.255.3:9090

Den frontlige ende:
http://212.47.237.59:8085

## npm scripts

#### backend

- ##### test

    ```npm run test```

    Runs the 'jest' command.
    
- ##### build

    ```npm run build```
    
    Build command. Runs lint checking and type checking with flow, outputs to the 'dist' directory.
    
- ##### lint

    ```npm run lint```
    
    Lint checks the entire 'src' directory.
    
- ##### lint auto

    ```npm run lint-auto```
    
    Lint checks the entire 'src' directory and corrects code where possible.
    
#### frontend

- ##### dev

    ```npm run dev```
    
    Piped command, will run webpack with --watch and run the 'index' file. Will continually build each time files in 'src' are changed
    
    
- ##### build

    ```npm run build```
    
    Build command (production mode). Runs lint checking and webpack bundling, outputs to the 'dist' directory.
    
    
- ##### test

    ```npm run test```
    
    Runs the 'jest' command.
    
    
- ##### lint

    ```npm run lint```
    
    Lint checks the entire 'src' directory.


- ##### lint-auto

    ```npm run lint```
    
    Lint checks the entire 'src' directory, fixes errors where possible.
