# Bookup

## IP's

Postgræs:
212.47.237.59:7655

Jenkins:
51.15.255.3:8080

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
    
    Build command (development mode). Runs  webpack bundling, outputs to the 'dist' directory.
    
    
- ##### dev-watch

    ```npm run dev-watch```
    
    Builds same as **dev** and continually watches for file-changes (builds on change).
    
- ##### build

    ```npm run build```
    
    Build command (production mode). Runs lint checking and webpack bundling, outputs to the 'dist' directory.
    
    
- ##### test

    ```npm run test```
    
    Runs the 'jest' command.
    
    
- ##### lint

    ```npm run lint```
    
    Lint checks the entire 'src' directory.
