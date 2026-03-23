const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{      //  /user
    res.send('User List');
    //res.render
});

router.get('/new', (req, res)=>{   //  /user/new
    res.send('User New Form');
});
//router.get('/:id', (req, res)=>{
   // res.send(`Getting User Data: ${req.params.id}`)
//})

router.route('/:id').get((req, res)=>{
 res.send(`Getting User data for id: ${req.params.id}`);
}).delete((req, res)=>{
res.send(`Deleting User data for id: ${req.params.id}`);
}).put((req, res)=>{
res.send(`Updating User data for id: ${req.params.id}`);
});

const user = [{firstName: "Rushil"}, {firstName: "Bob"}];
router.param("id", (req, res, next, id) =>{
    req.user = user[id];
    next();
});

module.exports = router;