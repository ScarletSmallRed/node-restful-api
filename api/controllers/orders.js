const express = require('express');
const Product = require('./../models/product')
const Order = require('./../models/order')

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .populate('product', 'name price')
        .select("product quantity _id")
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product', 'name price')
        .select("product quantity _id")
        .then(order => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            const order = new Order({
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_delete_order = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
        .then(result => {
            res.status(200).json({
                message: "Order deleted",
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}