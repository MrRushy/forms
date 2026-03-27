const express = require('express');
const router = express.Router();

router.route('/').get((req, res)=>{      //  /user
   res.send('User List');
    //res.render
}).post((req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const isValid = firstName !=="" && lastName !=="";
    if(isValid){
        console.log(`Adding user: ${firstName},${lastName}`)
        users.push({firstName},{lastName});
        res.render('users/list', {users});
    }
    else{
        console.log("Error adding user");
        res.send('users/new', {firstName:firstName}, {lastName:lastName});
    }
});

router.get('/list',(req,res)=>{
    res.render('users/list', {users});

});

router.get('/new', (req, res)=>{   //  /user/new
   res.render('users/new',{firstName:"Test"})
});
//router.get('/:id', (req, res)=>{
   // res.send(`Getting User Data: ${req.params.id}`)
//})

router.route('/:id').get((req, res)=>{
    console.log(req.user);
    console.log('Getting user data!')
 res.send(`User data: ${" "+req.user['firstName'] + "      " +req.user['lastName'] + "     " + req.user['age'] + "      " + req.user['gender']  }`);
}).delete((req, res)=>{
res.send(`Deleting User data for id: ${req.params.id}`);
}).put((req, res)=>{
res.send(`Updating User data for id: ${req.params.id}`);
});

const users = [
    {firstName: "Rushil", lastName: "Shanmugam" , age:"22", gender:"Male"},
     {firstName: "Bob", lastName: "Sagget" , age:"69", gender:"Male"}
];
router.param("id", (req, res, next, id) =>{
    req.user = users[id];
    next();
});

module.exports = router;