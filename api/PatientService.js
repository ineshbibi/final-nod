var hello = require('../Models/patients');
var Doctor = require('../Models/pratitioner');
var express = require('express');

var router = express.Router();
var DecisionTree = require('decision-tree');


router.post('/add' , function (req,res,next) {
    var patient = new hello(req.body);

    patient.save(function(err, todo)  {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })

});


router.post('/addDoctor' , function (req,res,next) {
    var doctor = new Doctor(req.body);

    doctor.save(function(err, todo)  {
        if(err)
            res.send(err);
        else
            res.send(todo);
    })

});


router.get('/:id/labTest', function (req, res) {
    var id = req.params.id;
    hello.findById(id).exec(function(err,patient){
        if(err)
            res.status(400).send(err);
        if(!patient)
            res.status(404).send();
        else
            res.json(patient.labTests);
    });

})


router.post('/:id/labTest', function (req, res) {
    hello.findById(req.params.id).exec(function (err, patient) {
        if (err)
            res.send(err)
        else {

            patient.labTests.push(req.body)
            patient.save()
            res.send(patient)
        }
    })
})

router.post('/:id/Nutrition', function (req, res) {
    hello.findById(req.params.id).exec(function (err, patient) {
        if (err)
            res.send(err)
        else {

            patient.nutrition.push(req.body)
            patient.save()
            res.send(patient)
        }
    })
})

router.post('/:id/PhysicalActivity', function (req, res) {
    hello.findById(req.params.id).exec(function (err, patient) {
        if (err)
            res.send(err)
        else {

            patient.physical_Activities.push(req.body)
            patient.save()
            res.send(patient)
        }
    })
})


router.get('/:id/Nutritions', function (req, res) {
    var id = req.params.id;
    hello.findById(id).exec(function(err,patient){
        if(err)
            res.status(400).send(err);
        if(!patient)
            res.status(404).send();
        else
            res.json(patient.nutrition);
    });

})

router.delete('/:id/Nutritions/:idn', function (req, res) {
    hello.findById(req.params.id).exec((err, patient) => {
        if (err)
            res.send(err)
        else {
            patient.nutrition.id(req.params.idn).remove()
            patient.save(function (err) {
                if (err)
                    res.send(err)
                else
                    res.send(patient.nutrition.id(req.params.idn))
            })

        }


    })

});

router.put('/:id/Nutritions/:idm', function (req, res) {
    hello.findById(req.params.id).exec((err, todo) => {
        if (err)
            res.send(err)
        else {
            var nutrition = todo.nutrition.id(req.params.idm)
            if(req.body.name != null)
            todo.name = req.body.name
            if(req.body.type != null)
                todo.type = req.body.type
            if(req.body.quantity != null)
                todo.quantity = req.body.quantity

            todo.save()
            res.send('updated')
        }


    })

});

router.delete('/:id/Activity/:idn', function (req, res) {
    hello.findById(req.params.id).exec((err, patient) => {
        if (err)
            res.send(err)
        else {
            patient.physical_Activities.id(req.params.idn).remove()
            patient.save(function (err) {
                if (err)
                    res.send(err)
                else
                    res.send(patient.physical_Activities.id(req.params.idn))
            })

        }


    })

});

router.get('/obesite/:id',function(req,res,next){


    var training_data=[
        {"height":"1.76","weight":"100","sick":1},
        {"height":"1.5","weight":"80","sick":1},
        {"height":"1.66","weight":"70","sick":0},
        {"height":"1.66","weight":"100","sick":1},
        {"height":"1.66","weight":"200","sick":1},
        {"height":"1.7","weight":"50","sick":-1},
        {"height":"1.7","weight":"70","sick":0},
        {"height":"1.8","weight":"60","sick":-1},
        {"height":"1.76","weight":"100","sick":1},
        {"height":"1.80","weight":"120","sick":1},
        {"height":"1.66","weight":"90","sick":1},
        {"height":"1.7","weight":"90","sick":1},
        {"height":"1.5","weight":"50","sick":0},
        {"height":"1.7","weight":"100","sick":1},
        {"height":"1.66","weight":"90","sick":1},
        {"height":"1.7","weight":"50","sick":-1},
        {"height":"1.5","weight":"50","sick":0},
        {"height":"1.7","weight":"50","sick":-1},
        {"height":"1.8","weight":"80","sick":0},
        {"height":"1.7","weight":"30","sick":-1},
        {"height":"1.5","weight":"45","sick":-1},
        {"height":"1.7","weight":"50","sick":-1},
        {"height":"1.8","weight":"50","sick":-1}
    ];
    var class_name = "sick";
    var features = ["height", "weight"];

    var dt = new DecisionTree(training_data, class_name, features);
    var id = req.params.id;
    var conseil;
    hello.findById(id).exec(function(err,patient){
        if(err)
            res.status(400).send(err);
        if(!patient)
            res.status(404).send();
        else
        {var predicted= dt.predict({
                height: patient.height,
                weight: patient.weight

            });
        res.send({"predicted":predicted})}

    });


})

module.exports = router;