// server/index.js

const express = require('express');
const path = require("path");
const session = require('express-session');

const mainRouter = require("./routes/mainRoutes");


const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

const sessionConfig = {
    secret: 'ENTER_YOUR_SECRET_HERE',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set this to true on production
    },
};


if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy e.g. App Service
    sessionConfig.cookie.secure = true; // serve secure cookies
}


app.use(session(sessionConfig));

app.use(mainRouter);




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});