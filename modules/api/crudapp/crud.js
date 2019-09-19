var mongoose = require('mongoose');
var crud ={
    title:"crudapp",
    statusCode:200

}

mongoose.connect('mongodb://vinayak:vinayak123@ds039707.mlab.com:39707/bq_mlab',{ useNewUrlParser: true })

var myData = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    }
},{collection:'crudData'});

var model =mongoose.model("crudData",myData);

crud.addData = function(req,res){
    var postBody = req.body;

    var data ={
        name : postBody.name,
        email:postBody.email
    }

    var saveData = new model(data);

    saveData.save(function(err,data1){
        if(err){
            res.send({
                statusCode:500,
                message:'data did not get saved'
            })
        }else{
            res.send({
                statusCode:200,
                message:'data saved',
                data:data1
            })
        }
    })

}


crud.getData = function(req,res){

    model.find({},function(err,data1){
        if(err){
            res.send({
                statusCode:500,
                message:'could not fetch data'
            })
        }else{
            res.send({
                statusCode:200,
                message:'data fetched sucessfully',
                data:data1
            })
        }
    })

}

crud.deleteData = function(req,res){
    var postBody = req.params.id;

    model.findByIdAndDelete(postBody,function(err,data1){
        if(err){
            res.send({
                statusCode:500,
                message:'could not delete data'
            })
        }else{
            res.send({
                statusCode:200,
                message:'data sucessfully deleted',
                data:data1
            })
        }
    })

}

crud.updateData = function(req,res){
    var postBody = req.body;

    var data ={
        name : postBody.name,
        email:postBody.email
    }

    var id = req.params.id;

    model.findByIdAndUpdate(id,data,function(err,data1){
        if(err){
            res.send({
                statusCode:500,
                message:'data did not get updated'
            })
        }else{
            res.send({
                statusCode:200,
                message:'data updated',
                data:data1
            })
        }
    })

}




module.exports=crud;