let express = require('express');
let router = express.Router();
let mongoose=require('mongoose');
let jwt=require('jsonwebtoken');

//create a reference to db schema
let contactModel=require("../models/contact");

module.exports.displayContactList = (req, res, next)=>{
    contactModel.find((err, contactList)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.json({success:true, msg:'contact List Displayed successfully', contactList: contactList, user:req.user});
        }
    }); 
        }
    


module.exports.displayAddPage=(req, res, next)=>{
    res.json({success:true, msg:'successfully display add page'});
    };


module.exports.processAddPage=(req, res, next)=>{

    let newContact=contactModel({
        "firstName" : req.body.firstName,
        "lastName" : req.body.lastName,
        "age": req.body.age
    });

    contactModel.create(newContact, (err, contactModel)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh contact list and redirect to the page
            res.json({success: true, msg:'Succesfully added new contact'});
        }
    });
}

module.exports.displayEditPage= (req, res, next)=>{
    let id=req.params.id;

    contactModel.findById(id, (err, contactObject)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show edit view
            res.json({success:true, msg:'Successfully display edit page', contact:contactObject});
        }
    });

}
module.exports.processEditPage=(req, res, next)=>{
    let id=req.params.id;

    let updatedContact=contactModel({
        "_id":id,
        "firstName":req.body.firstName,
        "lastName":req.body.lastName,
        "age":req.body.age
    });

    contactModel.update({_id:id}, updatedContact, (err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success:true, msg:'successfully Edited Contact', contact:updatedContact});
        }
    })
}
module.exports.performDelete=(req, res, next)=>{
    let id=req.params.id;
    contactModel.remove({_id:id}, (err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success:true, msg: 'Successfully Deleted contact'});
        }
    })
}