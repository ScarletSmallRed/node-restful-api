const express = require('express');
const router = express.Router();
const Product = require('./../models/product') 

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id')
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then(result => {
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdProduct: result
              });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id')
        .then(doc => {
            if (doc) {
            res.status(200).json(doc);
            } else {
            res
                .status(404)
                .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
      console.log('ops.proName:', ops.propName)
    }
    Product.update({ _id: id }, { $set: updateOps })
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;