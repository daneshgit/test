var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const {User}=require('./models/usermodel.js')
var bodyParser = require('body-parser')
var cors = require('cors');
const jwt=require('jsonwebtoken');
var flash = require('connect-flash-plus');
var session = require('express-session');
var mongoose= require('mongoose');

const passport=require('passport');
const {passportjwt}=require('./auth/passport-jwt');
const {passportfacebook}=require('./auth/passport-facebook');
const {passportgoogle}=require('./auth/passport-google');

passportjwt();
passportfacebook();
passportgoogle();

if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/testdb').then(
    () => console.log('Database connected successfully'),
    (err) => { console.log(err); },
  );
} else {
  mongoose.connect('mongodb://localhost/testdb').then(
    () => console.log('Database connected successfully'),
    (err) => { console.log(err); },
  );
}


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));
 
app.use(flash());

app.use(passport.initialize());



/*
app.use((req,res,next)=>{
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] ==='JWT'){
    jwt.verify(req.headers.authorization.split(' ')[1],'restfullapi',(err,decode)=>{
      if(err){
        console.log("err");
        req.user=undefined;
        next();
      }else{
req.user=decode;
console.log(decode);
next();
      }
    })
  }else{
    req.user=undefined;
    console.log("failed")
    next();
  }
})
*/
app.use(express.static(path.join(__dirname, '../build')));

app.get('/flash', (req, res) => {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!');
  res.redirect('/1');
});

app.get('/1', (req, res) => {
  //  Get an array of flash messages by passing the key to req.flash()
  res.json({ messages: req.flash('info') });
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/api/users' }),
  (req, res) => {
  // Successful authentication, redirect home.
    res.redirect('/');
  },
);

//  app.use('/', indexRouter);


// The GraphQL schema in string form
const typeDefs = `
type User{
  name:String
  age:Int
}
type Response{
ok:Boolean
}
type Query { Users: [User] }
type Mutation{ User(name:String,age:Int):Response }
type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
Query: { Users: async() => { 
  const data=await User.find();
   return data } },
 Mutation:{
   User:async(_,args)=>{
    const user=new User({name:args.name,age:args.age})
    const result=await user.save();
    if(result){
      return{ok:true}
    }
    
    
   }
 }  
};


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});


// The GraphQL endpoint
app.use('/api/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/api/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' }));


app.use('/api', indexRouter);


app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'../build','index.html'));
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
