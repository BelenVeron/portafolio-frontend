//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Static files
app.use(
    express.static(path.join(__dirname, '../client/dist/angular-portafolio-frontend'), {
        maxAge: '1y',
    })
);
// Angular app
app.get('*', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../client/dist/angular-portafolio-frontend/index.html')
    );
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);