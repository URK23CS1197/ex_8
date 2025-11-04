import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [laptops, setLaptops] = useState([]);
  const [message, setMessage] = useState(null);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [specs, setSpecs] = useState('');
  const [price, setPrice] = useState('');

  const API_BASE = 'https://ex-8.onrender.com'; // Your backend URL

  // Fetch all laptops
  const loadLaptops = () => {
    axios.get(`${API_BASE}/api/viewAll`)
      .then(res => {
        setLaptops(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadLaptops();
  }, []);

  // Add new laptop
  const addLaptop = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE}/api/addNew`, { brand, model, specs, price })
      .then(res => {
        setMessage(res.data.status);
        loadLaptops();
        setBrand(''); setModel(''); setSpecs(''); setPrice('');
      });
  };

  // Delete laptop
  const deleteLaptop = (id) => {
    axios.post(`${API_BASE}/api/deleteUser`, { id })
      .then(res => {
        setMessage(res.data.status);
        loadLaptops();
      });
  };

  return (
    <div className="container p-3 mt-4">
      <h1 className="mb-4 text-center">Welcome to Laptop Catalog</h1>

      <h3>Add Laptop</h3>
      <form onSubmit={addLaptop} className="p-3 mb-4 bg-light">
        <input className="form-control mb-3" placeholder="Brand" value={brand} required onChange={e => setBrand(e.target.value)} />
        <input className="form-control mb-3" placeholder="Model" value={model} required onChange={e => setModel(e.target.value)} />
        <input className="form-control mb-3" placeholder="Specifications" value={specs} required onChange={e => setSpecs(e.target.value)} />
        <input className="form-control mb-3" placeholder="Price" type="number" step="0.01" value={price} required onChange={e => setPrice(e.target.value)} />
        <button className="btn btn-primary w-100" type="submit">Add Laptop</button>
      </form>

      {message && <div className="alert alert-success">{message}</div>}

      <h3>Laptop List</h3>
      <table className="table table-bordered table-striped">
        <thead className="bg-light">
          <tr>
            <th>ID</th><th>Brand</th><th>Model</th><th>Specifications</th><th>Price</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {laptops.length === 0 
            ? <tr><td colSpan="6" className="text-center">No Laptops Yet</td></tr>
            : laptops.map((laptop, index) => (
                <tr key={laptop._id}>
                  <td>{index + 1}</td>
                  <td>{laptop.brand}</td>
                  <td>{laptop.model}</td>
                  <td>{laptop.specs}</td>
                  <td>{laptop.price}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteLaptop(laptop._id)}>Delete</button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;

