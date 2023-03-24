require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  info: String,
  paragraph_text: String
});

const contact = mongoose.model('contact', contactSchema);

const registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});



const register = mongoose.model('register', registerSchema);

const homeSchema = new mongoose.Schema({
  email: String,
});

const home = mongoose.model('home', homeSchema);



app.post('/contact', (req, res) => {
  var myData = new contact(req.body);
  myData.save().then(() => {
    res.sendFile(path.join(__dirname, '/src/sallert.html'));
  }).catch(() => {
    res.sendFile(path.join(__dirname, '/src/usallert.html'));
  })
});

app.post('/login', async(req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const usermail = await register.findOne({email:email});

    if(usermail.password === password){
      res.sendFile(path.join(__dirname, '/src/aflog.html'));
    }else{
      res.sendFile(path.join(__dirname, '/src/inlog.html'));
    }
  } catch (error) {
    res.status(404).send(error);
  }
});


app.post('/', (req, res) => {
  var mData = new register(req.body);
  mData.save().then(() => {
    res.sendFile(path.join(__dirname, '/src/sallert.html'));
  }).catch(() => {
    res.sendFile(path.join(__dirname, '/src/usallert.html'));
  })
});

app.post('/home', (req, res) => {
  var mData = new home(req.body);
  mData.save().then(() => {
    res.sendFile(path.join(__dirname, '/src/sallert.html'));
  }).catch(() => {
    res.sendFile(path.join(__dirname, '/src/usallert.html'));
  })
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/home.html'));
});

app.get('/apply', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/apply.html'));
});

app.get('/football', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/football.html'));
});

app.get('/contact', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/contact.html'));
});

app.get('/cricket', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/cricket.html'));
});

app.get('/Top_3_Batsman', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/cri_bat.html'));
});

app.get('/Top_3_Bowler', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/cri_bow.html'));
});

app.get('/Top_3_Goalkeeper', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/foo_goa.html'));
});

app.get('/Top_3_Defender', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/foo_def.html'));
});

app.get('/About', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/sp.html'));
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/login.html'));
});

app.get('/afll', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/afll.html'));
});





// after login


app.post('/aflcontact', (req, res) => {
  var myData = new contact(req.body);
  myData.save().then(() => {
    res.sendFile(path.join(__dirname, '/src/aflsa.html'));
  }).catch(() => {
    res.sendFile(path.join(__dirname, '/src/aflus.html'));
  })
});


app.post('/aflhome', (req, res) => {
  var mData = new home(req.body);
  mData.save().then(() => {
    res.sendFile(path.join(__dirname, '/src/aflsa.html'));
  }).catch(() => {
    res.sendFile(path.join(__dirname, '/src/afus.html'));
  })
});


app.get('/aflfootball', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/aflfoo.html'));
});

app.get('/aflog', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/aflog.html'));
});

app.get('/aflcontact', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/aflcon.html'));
});

app.get('/aflcricket', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/aflcri.html'));
});

app.get('/aflTop_3_Batsman', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/aflcri_b.html'));
});

app.get('/aflTop_3_Bowler', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/aflcri_bo.html'));
});

app.get('/aflTop_3_Goalkeeper', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/aflfoo_g.html'));
});

app.get('/aflTop_3_Defender', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/aflfoo_d.html'));
});

app.get('/aflAbout', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/aflsp.html'));
});

app.get('/pmsf', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/pmsf.html'));
});

app.get('/pm', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/pm.html'));
});


connectDB().then( () => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
});