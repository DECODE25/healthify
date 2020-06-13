const router = require('express').Router();
const passport = require('passport');
const isLoggedIn =require('../middleware/authmiddle')



router.get('/login',(req,res)=>{
    res.send('login Page')
})

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
})


router.get('/good', isLoggedIn, (req, res) => res.json(req.user))


// auth with google +
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/auth/good');
  }
);

//Fbauth routes
//login with fb
router.get('/facebook', passport.authenticate('facebook',{scope:['email']}));
//callback raoute after user allows permisiion to access data
router.get('/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),(req,res)=>{
    res.send('logged in using fb: '+req.user.name);
})



module.exports = router;
