const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  const beers = [{ name: 'kro' }, { name: '8.6' }];
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beers });
    })
    .catch(error => console.log(error));
});


app.get('/random-beer', (req, res) => {
  const random = [{ name: 'kro' }];
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // your magic happens here`
      // console.log(responseFromAPI);
      res.render('beers', { beer: responseFromAPI[0] });
    })
    .catch(error => console.log(error));
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));


