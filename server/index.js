const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/laptopcatalog';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Connection error:', err));

// Define Laptop schema
const laptopSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  specs: { type: String, required: true },
  price: { type: Number, required: true }
});
const Laptop = mongoose.model('Laptop', laptopSchema);

// Fetch all laptops
app.get('/api/viewAll', async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.send(laptops);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch laptops' });
  }
});

// Add new laptop with validation
app.post('/api/addNew', async (req, res) => {
  try {
    const { brand, model, specs, price } = req.body;
    if (!brand || !model || !specs || price == null) {
      return res.json({ status: 'Invalid input data' });
    }
    const newLaptop = new Laptop({ 
      brand: brand.trim(), 
      model: model.trim(),  
      specs: specs.trim(),
      price: Number(price)
    });
    await newLaptop.save();
    res.json({ status: 'Data Saved Successfully' });
  } catch (err) {
    res.json({ status: err.message });
  }
});

// Delete laptop by ID
app.post('/api/deleteUser', async (req, res) => {
  try {
    await Laptop.findByIdAndDelete(req.body.id);
    res.json({ status: 'Laptop deleted successfully' });
  } catch (err) {
    res.json({ status: 'Error deleting laptop' });
  }
});

// Listen on environment port or default 7000
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
