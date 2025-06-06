const Completo = require("../models/completoModel");
const express = require('express');
const app = express();

exports.readAllCompletos =  async (req, res) => {
    try {
        const completo = await Completo.find();
        res.status(200).json(completo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.readOneCompleto =  async (req, res) => {
    try {
        const completo = await Completo.findById(req.params.id);
        if (!completo) {
            return res.status(404).json({ message: "Completo not found" });
        }
        res.status(200).json(completo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCompleto =  async (req, res) => {
  const { name, price, shippingAdress, customization } = req.body;
  try {
    const newCompleto = await Completo.create({
      name,
      price,
      shippingAdress,
      customization,
    });
    return res.status(200).json({ newCompleto });
  } catch (error) {
    return res.status(500).json({
      msg: "Error creating completo",
      error: error.message,
    });
  }
};

exports.updateCompleto =  async (req, res) => {
  const { name, price, shippingAdress, customization } = req.body;
  try {
    const updatedCompleto = await Completo.findByIdAndUpdate(
      req.params.id,
      { name, price, shippingAdress, customization },
      { new: true, runValidators: true }
    );
    if (!updatedCompleto) {
      return res.status(404).json({
        msg: "Completo not found",
      });
    }
    return res.status(200).json({ updatedCompleto });
  } catch (error) {
    return res.status(500).json({
      msg: "Error updating completo",
      error: error.message,
    });
  }
};

exports.deleteCompleto = async (req, res) => {
  try {
    const deletedCompleto = await Completo.findByIdAndDelete(req.params.id);
    if (!deletedCompleto) {
      return res.status(404).json({ message: "Completo not found" });
    }
    return res.status(200).json({ deletedCompleto });
  } catch (error) {
    return res.status(500).json({
      msg: "Error deleting completo",
      error: error.message,
    });
  }
};


