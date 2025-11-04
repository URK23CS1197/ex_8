import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Placeholder image path - replace with your actual image path or URL
const laptopImage = 'path/to/laptop-image.jpg'; // Update this with the correct path

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
    axios
      .get(`${API_BASE}/api/viewAll`)
      .then((res) => {
        setLaptops(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadLaptops();
  }, []);

  // Add new laptop
  const addLaptop = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE}/api/addNew`, { brand, model, specs, price })
      .then((res) => {
        setMessage(res.data.status);
        loadLaptops();
        setBrand('');
        setModel('');
        setSpecs('');
        setPrice('');
        setTimeout(() => setMessage(null), 3000);
      })
      .catch((err) => console.log(err));
  };

  // Delete laptop
  const deleteLaptop = (id) => {
    axios
      .post(`${API_BASE}/api/deleteUser`, { id })
      .then((res) => {
        setMessage(res.data.status);
        loadLaptops();
        setTimeout(() => setMessage(null), 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="text-center py-5">
        <h1 className="display-4 fw-bold">Laptop Catalog</h1>
        <p className="lead">Manage your laptop inventory with ease</p>
      </header>

      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              {/* Background Image */}
              <div
                className="position-relative mb-5"
                style={{
                  backgroundImage: `url(${laptopImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '200px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              ></div>

              {/* Add Laptop Form */}
              <div className="card shadow-lg mb-5">
                <div className="card-body p-4">
                  <h3 className="card-title text-center mb-4">Add New Laptop</h3>
                  <form onSubmit={addLaptop}>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        placeholder="Brand (e.g., Dell)"
                        value={brand}
                        required
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        placeholder="Model (e.g., XPS 13)"
                        value={model}
                        required
                        onChange={(e) => setModel(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        placeholder="Specifications (e.g., i7, 16GB RAM)"
                        value={specs}
                        required
                        onChange={(e) => setSpecs(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="form-control"
                        placeholder="Price (e.g., 999.99)"
                        type="number"
                        step="0.01"
                        value={price}
                        required
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">
                      Add Laptop
                    </button>
                  </form>
                </div>
              </div>

              {/* Success Message */}
              {message && (
                <div
                  className="alert alert-success alert-dismissible fade show text-center"
                  role="alert"
                >
                  {message}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setMessage(null)}
                  ></button>
                </div>
              )}

              {/* Laptop List */}
              <div className="card shadow-lg">
                <div className="card-body p-4">
                  <h3 className="card-title text-center mb-4">Laptop List</h3>
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Brand</th>
                          <th scope="col">Model</th>
                          <th scope="col">Specifications</th>
                          <th scope="col">Price ($)</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {laptops.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No Laptops Available
                            </td>
                          </tr>
                        ) : (
                          laptops.map((laptop, index) => (
                            <tr key={laptop._id}>
                              <td>{index + 1}</td>
                              <td>{laptop.brand}</td>
                              <td>{laptop.model}</td>
                              <td>{laptop.specs}</td>
                              <td>{parseFloat(laptop.price).toFixed(2)}</td>
                              <td>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => deleteLaptop(laptop._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; 2025 Laptop Catalog. All rights reserved.</p>
      </footer>

      {/* Custom CSS for additional styling */}
      <style jsx>{`
        .card {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .btn-primary {
          background-color: #007bff;
          border-color: #007bff;
        }
        .btn-primary:hover {
          background-color: #0056b3;
          border-color: #0056b3;
        }
        .btn-danger {
          background-color: #dc3545;
          border-color: #dc3545;
        }
        .btn-danger:hover {
          background-color: #c82333;
          border-color: #c82333;
        }
        .alert {
          border-radius: 8px;
        }
        /* Ensure consistent spacing */
        .container {
          padding-top: 2rem;
          padding-bottom: 2rem;
        }
        /* Header styling */
        header {
          background: linear-gradient(135deg, #007bff, #0056b3);
          padding: 3rem 1rem;
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  );
}

export default App;
