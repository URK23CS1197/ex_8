import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState(null);
  const [name, setName] = useState('');
  const [regno, setRegno] = useState('');
  const [cgpa, setCgpa] = useState('');

  // Fetch all students
  const loadStudents = () => {
    axios.get('http://localhost:7000/api/viewAll')
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Add new student
  const addStudent = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7000/api/addNew', { name, regno, cgpa })
      .then(res => {
        setMessage(res.data.status);
        loadStudents();
      });
  };

  // Delete student
  const deleteStudent = (id) => {
    axios.post('http://localhost:7000/api/deleteUser', { id })
      .then(res => {
        setMessage(res.data.status);
        loadStudents();
      });
  };

  return (
    <div className="container p-3 mt-4">
      <h1 className="mb-4 text-center">Welcome to Server API Demo</h1>

      <h3>Add User</h3>
      <form onSubmit={addStudent} className="p-3 mb-4 bg-light">
        <input className="form-control mb-3" placeholder="Name" value={name} required onChange={e => setName(e.target.value)} />
        <input className="form-control mb-3" placeholder="Regno" value={regno} required onChange={e => setRegno(e.target.value)} />
        <input className="form-control mb-3" placeholder="CGPA" type="number" step="0.01" value={cgpa} required onChange={e => setCgpa(e.target.value)} />
        <button className="btn btn-primary w-100" type="submit">Add</button>
      </form>

      {message && <div className="alert alert-success">{message}</div>}

      <h3>Students List</h3>
      <table className="table table-bordered table-striped">
        <thead className="bg-light">
          <tr>
            <th>ID</th><th>Name</th><th>Regno</th><th>CGPA</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 
            ? <tr><td colSpan="5" className="text-center">No Users Yet</td></tr>
            : students.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.regno}</td>
                  <td>{student.cgpa}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteStudent(student._id)}>Delete</button>
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
