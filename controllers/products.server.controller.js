var mongoose = require('mongoose');
var Product = require('./../models/Product.js');
var errorHandler = require('./errors.server.controller');
var _ = require('lodash');

module.exports.listview= function(req, res)
{
  
  
  res.render('./../public/views/product/all.ejs',
  {
    user: req.user|| null,
    request: req
    
    
  });
};

module.exports.createView=function(req,res)
{
  res.render('./../public/views/product/new.ejs', {
    
    user: req.user||null,
    request:req
    
  });
};

module.exports.listview = function(req, res) {
  Product.find(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      console.log("api called");

      res.status(200).send(data);
    }
  });
};

module.exports.create = function(req, res) {
  var product = new Product(req.body);
  product.user = req.user;
  product.save(function(err, data) {
    if (err) {
      return res.status(400).send({

  				message: errorHandler.getErrorMessage(err)
  			});
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports.read = function(req, res) {
  res.json(req.article);
};


exports.delete = function(req, res) {
	var  product= req.article;
	 product.remove(function(err) {
		if (err) {
			return res.status(400).send();
		} else {
			res.json(product);
		}
	});
};


module.exports.update = function(req, res) {
  var  product = req.article;

   product = _.extend( product, req.body);

  	 product.save(function(err) {
  		if (err) {
  			return res.status(400).send();
  		} else {
  			res.json( product);
  		}
  	});
};

exports.articleByID = function(req, res, next, id) {
	Product.findById(id).populate('user', 'email').exec(function(err,  product) {
		if (err) return next(err);
		if (! product) return next(new Error('Failed to load product ' + id));
		req.product =  product;
		next();
	});
};
