const express = require("express");


const db = require("../data/dbConfig");
const router=express.Router();


router.get('/', (req,res)=>{
    db('accounts')
    .then(account=>{
        res.status(200).json(account)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({errorMessage:'Failed to GET data'})
    })
})

router.get('/:id', (req,res)=>{
    const {id}=req.params
    db('accounts').where({id}).first()
    .then(account=>{
        res.status(200).json(account)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({errorMessage:'Failed to GET data'})
    })
})


router.post('/', (req,res)=>{
    const accountInfo=req.body;
    db('accounts').insert(accountInfo, 'id')
    .then(account=>{
        res.status(201).json(account);
    })
    .catch(err=>{
        console.log(err);

        res.status(500).json({error: 'Failed To Add the DATA'})
    })
})


router.put('/:id', (req,res)=>{
    const {id}=req.params;
    const changes=req.body;
    db('accounts').where({id}).update(changes)
    .then(account=>{
        res.status(200).json(account);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:'Failed to Update'});
    })

})

router.delete('/:id', (req,res)=>{
    const {id}=req.params;
    db('accounts').where({id}).del()
    .then(account=>{
        res.status(200).json(account);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:'failed to Delete'})
    })
})


module.exports = router;
