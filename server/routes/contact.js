let express = require('express');
let router = express.Router();
let contactController=require('../controllers/contact');
let jwt=require('jsonwebtoken');

let passport=require('passport');

function requireAuth(req,res,next){
   //check if user is logged in or not?
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


/*GET contact list page- READ operation */
router.get('/',passport.authenticate('jwt', {session: false}), contactController.displayContactList);

//GET route for Add page adn will display add page
router.get('/add',passport.authenticate('jwt', {session: false}), contactController.displayAddPage);

//POST routes for Add Contact
router.post('/add',passport.authenticate('jwt', {session: false}), contactController.processAddPage);

//Get request for edit contact
router.get('/edit/:id',passport.authenticate('jwt', {session: false}), contactController.displayEditPage);
//post request for edit method
router.post('/edit/:id',passport.authenticate('jwt', {session: false}), contactController.processEditPage);
//Get method for delete request
router.get('/delete/:id',passport.authenticate('jwt', {session: false}), contactController.performDelete);

module.exports = router;