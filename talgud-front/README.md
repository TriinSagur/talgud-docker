# talgud-front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

#### Running in docker

``docker build -t talgud-front .``

``docker run --name talgud-front -dp 8081:3000 talgud-front``

### In order to use Google Maps
```
1. Create your own Maps JavaScript API key https://developers.google.com/maps/documentation/places/web-service/get-api-key
2. Create .env.local file to project root 
3. Add your API to the contents as variable:
   VUE_APP_GOOGLE_MAP_API_KEY=yourkeyhere
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
