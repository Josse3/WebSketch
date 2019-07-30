module.exports = {
    devServer: {
        proxy: {
            "/db": {
                target: "http://localhost:8081",
                secure: true
            }
        }
    }
};