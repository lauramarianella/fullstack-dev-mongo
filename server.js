let express = require('express');
let app = express();

let multer = require('multer');
let upload = multer({ dest: __dirname + '/uploads' });

let cookieParser = require('cookie-parser');
app.use(cookieParser());

let reloadMagic = require('./reload-magic.js');
reloadMagic(app);

let stripeLoader = require('stripe');

let data = require('./dataAllure.js');
let items = data.items;
let services = data.services;
let dressers = data.dressers;
let rates = data.rates;
let cities = data.cities;

let query = require('./query.js');

let passwords = {};
let sessions = {};

app.use('/', express.static('build'));
app.use('/images', express.static(__dirname + '/uploads'));

app.get('/test', (req, res) => {
  console.log('Server.js /testing');
  console.log('items', items);
  console.log('mapType', mapType);
  console.log('mapFormality', mapFormality);
  res.send(`<html><body>${items}</body></html>`);
});
let portNumber = 3000;
app.listen(portNumber, () => {
  console.log('Server started in port ' + portNumber);
});

app.get('/alreadyLoggedIn', upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;
  let user = sessions[sessionId];
  if (user) {
    res.send(JSON.stringify({ success: true, user: user }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

app.post('/signup', upload.none(), (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (passwords[username]) {
    res.send(
      JSON.stringify({
        success: false,
        message: 'Existing user, just Loggin',
      })
    );
    return;
  }
  passwords[username] = password;
  let sessionId = generateId();
  sessions[sessionId] = username;
  res.cookie('sid', sessionId);

  res.send(
    JSON.stringify({ success: true, message: 'Something went grown!!' })
  );
});

app.post('/login', upload.none(), (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (passwords[username] === password) {
    let sessionId = generateId();
    sessions[sessionId] = username;
    res.cookie('sid', sessionId);
    res.send(JSON.stringify({ success: true }));
    return;
  }
  res.send(
    JSON.stringify({ success: false, message: 'Wrong user and/or password' })
  );
});

let generateId = () => {
  return '' + Math.floor(Math.random() * 100000000);
};

app.get('/logout', (req, res) => {
  let sessionId = req.cookies.sid;
  if (sessions[sessionId]) {
    delete sessions[sessionId];
    res.send(JSON.stringify({ success: true }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

app.post('/item/search', upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;

  if (sessions[sessionId]) {
    let itemDescription = req.body.itemDescription;
    let listItems;
    if (itemDescription) {
      listItems = items.filter((item) =>
        item.description.toLowerCase().includes(itemDescription.toLowerCase())
      );
    } else {
      listItems = items;
    }

    //filters
    let idService = Number(req.body.idService);
    let minPrice = Number(req.body.minPrice);
    let maxPrice = Number(req.body.maxPrice);
    let idDresser = Number(req.body.idDresser);
    let idCity = Number(req.body.idCity);

    if (idService)
      listItems = listItems.filter((items) => items.idService === idService);
    if (idDresser)
      listItems = listItems.filter((items) => items.idDresser === idDresser);
    if (idCity)
      listItems = listItems.filter((items) => items.idCity === idCity);
    if (minPrice)
      listItems = listItems.filter((items) => items.cost >= minPrice);
    if (maxPrice)
      listItems = listItems.filter((items) => items.cost <= maxPrice);

    res.send(JSON.stringify({ success: true, listItems }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

app.post('/item/details', upload.none(), (req, res) => {
  let sessionId = req.cookies.sid;

  if (sessions[sessionId]) {
    let itemId = Number(req.body.itemId);

    let item = items.find((item) => item.id === itemId);
    if (!item) {
      res.send(JSON.stringify({ success: false }));
      return;
    }

    let dresser = dressers.find((dresser) => dresser.id === item.idDresser);

    let ratesFiltered = rates.filter(
      (rate) => rate.idDresser === item.idDresser
    );

    let dresserServices = ratesFiltered.map((rate) => {
      let service = services.find((service) => service.id === rate.idService);
      return { ...rate, service: service };
    });

    let itemDetails = {
      item: item,
      dresser: dresser,
      dresserServices: dresserServices,
    };

    res.send(JSON.stringify({ success: true, itemDetails }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

app.get('/item/services', (req, res) => {
  let sessionId = req.cookies.sid;

  if (sessions[sessionId]) {
    res.send(JSON.stringify({ success: true, services: services }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

app.get('/item/dressers', (req, res) => {
  let sessionId = req.cookies.sid;

  if (sessions[sessionId]) {
    res.send(JSON.stringify({ success: true, dressers: dressers }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

app.get('/item/cities', (req, res) => {
  let sessionId = req.cookies.sid;

  if (sessions[sessionId]) {
    res.send(JSON.stringify({ success: true, cities: cities }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

app.post('/item/new', upload.single('filename'), (req, res) => {
  let sessionId = req.cookies.sid;

  if (sessions[sessionId]) {
    let file = req.file;
    let frontendPath = file ? '/images/' + file.filename : undefined;
    console.log(file);
    console.log(file.filename);
    let id = items.length + 1;
    let idDresser = Number(req.body.idDresser);
    let idService = Number(req.body.idService);
    let idCity = Number(req.body.idCity);
    let title = req.body.title;
    let description = req.body.description;
    let cost = Number(req.body.cost);

    let newItem = {
      id,
      idDresser,
      idService,
      idCity,
      title,
      description,
      imgSrc: frontendPath,
      cost,
    };

    console.log(newItem);

    items.push(newItem);

    res.send(JSON.stringify({ success: true }));
    return;
  }
  res.send(JSON.stringify({ success: false }));
});

const stripe = new stripeLoader('HIDDEN STRIPE KEY');

const charge = (token, amt) => {
  return stripe.charges.create({
    amount: amt * 100,
    currency: 'usd',
    source: token,
    description: 'Statement description',
  });
};
app.post('/billing/pay', upload.none(), async (req, res, next) => {
  try {
    console.log(req.body.idToken);
    console.log(req.body.amount);
    let data = await charge(req.body.idToken, req.body.amount);
    console.log(data);
    res.send(JSON.stringify({ success: true }));
  } catch (e) {
    console.log(e);
    //res.status(500);
    res.send(JSON.stringify({ success: false }));
  }
});

app.all('/*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});
