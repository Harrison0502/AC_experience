const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

// require express-handlebars here
const exphbs = require('express-handlebars')
const { restart } = require('nodemon')


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  const restaurants = restaurantList.results
  res.render(`index`, { restaurants })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id === Number(req.params.restaurant_id))
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
  res.render(`index`, { restaurants, keyword: req.query.keyword })
})

app.listen(port, () => {
  console.log('Express is running now')
})
