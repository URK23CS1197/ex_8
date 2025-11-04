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
  const API_BASE = 'https://ex-8.onrender.com';

  // Fetch all laptops
  const loadLaptops = () => {
    axios
      .get(`${API_BASE}/api/viewAll`)
      .then((res) => setLaptops(res.data))
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
    <div className="min-vh-100 d-flex flex-column bg-light">
      <header className="bg-primary text-white text-center py-4 shadow-sm">
        <h1 className="display-4 fw-bold mb-2">Laptop Catalog</h1>
        <p className="lead mb-0">Manage your laptop inventory with ease</p>
      </header>
      <main className="flex-grow-1 d-flex justify-content-center align-items-center py-5">
        <div className="w-100" style={{ maxWidth: 450 }}>
          <div className="card shadow mb-5 rounded-4">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Add New Laptop</h3>
              <form onSubmit={addLaptop}>
                <div className="mb-3">
                  <input
                    className="form-control bg-white"
                    placeholder="Brand (e.g., Dell)"
                    value={brand}
                    required
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control bg-white"
                    placeholder="Model (e.g., XPS 13)"
                    value={model}
                    required
                    onChange={(e) => setModel(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control bg-white"
                    placeholder="Specifications (e.g., i7, 16GB RAM)"
                    value={specs}
                    required
                    onChange={(e) => setSpecs(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="form-control bg-white"
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
                aria-label="Close"
              ></button>
            </div>
          )}
          {/* Laptop List */}
          <div className="card shadow rounded-4">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">Laptop List</h3>
              <div className="table-responsive">
                <table className="table table-hover table-bordered align-middle mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="table-light">ID</th>
                      <th scope="col" className="table-light">Brand</th>
                      <th scope="col" className="table-light">Model</th>
                      <th scope="col" className="table-light">Specifications</th>
                      <th scope="col" className="table-light">Price ($)</th>
                      <th scope="col" className="table-light">Action</th>
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
      </main>
      <footer className="bg-dark text-white text-center py-3 shadow-sm mt-auto">
        <p className="mb-0">&copy; 2025 Laptop Catalog. All rights reserved.</p>
      </footer>
      {/* Custom styles */}
      <style>{`
        body, html {
          height: 100%;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #f0f4f8, #e0e7f0);
        }
        .card {
          border: none;
          border-radius: 12px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        .btn-primary {
          background-color: #007bff;
          border-color: #007bff;
          transition: background-color 0.2s, transform 0.1s;
        }
        .btn-primary:hover {
          background-color: #0056b3;
          border-color: #0056b3;
          transform: translateY(-1px);
        }
        .btn-danger {
          transition: background-color 0.2s, transform 0.1s;
        }
        .btn-danger:hover {
          background-color: #c82333;
          border-color: #c82333;
          transform: translateY(-1px);
        }
        .form-control {
          border-color: #ced4da;
        }
        .form-control:focus {
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.15);
        }
        .alert {
          border-radius: 8px;
        }
        main {
          flex: 1;
        }
        @media (max-width: 576px) {
          .card {
            min-width: 100% !important;
            max-width: 100% !important;
          }
          h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
