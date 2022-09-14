module.exports = {
    devServer: {

        port: 3000,
        //for docker
        proxy: 'http://talgud-back:8080/'
        //for local development
        //proxy: 'http://localhost:8080/'


    }
}