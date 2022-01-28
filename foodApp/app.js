const express = require('express');
const app = express();
app.use(express.json());
let users = [{ id: '1', 'name': "Abhiskhek" }, { id: '2', 'name': "Hitesh Gurnani" }, { id: '3', 'name': "aazz" }];
const userRouter = express.Router();
const authRouter = express.Router();
const mongoose = require('mongoose')
app.use('/auth', authRouter)
app.use('/user', userRouter)
authRouter
    .route('/signup')
    .get(middleware1, getsigup, middleware2)
    .post(postSignup)

userRouter
    .route('/')
    .get(getUser)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteuser)

userRouter
    .route("/:id")
    .get(getId)
function getsigup(req, res, next) {
    console.log('get sign up called');
    //res.sendFile('index.html', { root: __dirname })
    next();
}
function postSignup(req, res) {
    let obj = req.body;
    console.log('====================================');
    console.log(obj);
    console.log('====================================');
    res.json({
        "mssg": "post request success",
        "data": obj
    })
}
const db_link = 'mongodb+srv://hitesh_10:qwerty123@cluster0.ihrys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(db_link)
    .then(function (db) {
        console.log('db connect')
    })
    .catch(function (err) {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
    })
// app.get('/', function (req, res) {
//     res.sendFile('C:/Users/ASUS/OneDrive/Desktop/BKEND/views/index.html')
// });
// app.get('/about', function (req, res) {
//     res.sendFile('./views/about.html', { root: __dirname })
// })
// app.get('/about-us', (req , res) => {
//     res.redirect('/about');
// })
// app.use((req, res) => {
//     res.status(404).sendFile('./views/404.html', { root: __dirname })
// })
function middleware1(req, res, next) {
    console.log('middleware1 called');
    next();
}
function middleware2(req, res, next) {
    console.log('middleware2 called');
    res.sendFile('index.html', { root: __dirname })

}
function getUser(req, res) {
    res.send(users);
}
function postUser(req, res) {
    console.log(req.body);
    users = req.body;
    //console.log(users)
    res.json({
        message: "data recieved",
        user: req.body
    })
}
function updateUser(req, res) {
    console.log('req body -> data' + req.body);
    //update data 
    let datatobeupdated = req.body
    for (key in datatobeupdated) {
        users[key] = datatobeupdated[key];
    }
    res.json({
        message: "data updated successfully :)"
    })

}
function deleteuser(req, res) {
    users = {};
    res.json({
        "message": "data is deleted now :)"
    })
}
function getId(req, res) {
    console.log(req.params.id);
    let paramsId = req.params.id;
    let obj = {}
    for (let i = 0; i < users.length; i++) {
        if (users[i]['id'] == paramsId)
            obj = users[i];
    }
    res.json({
        "mssg": "Id fetched successfully",
        "data": obj
    })
}
app.listen(3000);