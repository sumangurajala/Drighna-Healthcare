import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import axios from "axios"; // Import axios for API requests

function IPDBalanceReport() {
  const [data, setData] = useState([]); // Data for the report
  const [filters, setFilters] = useState({
    timeDuration: "",
    patientStatus: "",
    fromAge: "",
    toAge: "",
    gender: "",
  });

  // Update filter state on form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = async () => {

console.log("filters>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

    try {
      const response = await axios.post('http://localhost:3000/api/ipdbalance', filters);
      setData(response.data); // Set the data returned from the backend
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // Handle error gracefully
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">IPD Balance Report</h2>
      <Form>
        <div className="row mb-3">
          <div className="col-md-3">
            <Form.Group>
              <Form.Label>Time Duration <span className="text-danger">*</span></Form.Label>
              <Form.Control as="select" name="timeDuration" value={filters.timeDuration} onChange={handleChange}>
                <option>Select</option>
                <option>Last Week</option>
                <option>Last Month</option>
                <option>Last Year</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group>
              <Form.Label>Patient Status</Form.Label>
              <Form.Control as="select" name="patientStatus" value={filters.patientStatus} onChange={handleChange}>
                <option>All</option>
                <option>Active</option>
                <option>Discharged</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group>
              <Form.Label>From Age</Form.Label>
              <Form.Control type="number" name="fromAge" value={filters.fromAge} onChange={handleChange} placeholder="Select" />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group>
              <Form.Label>To Age</Form.Label>
              <Form.Control type="number" name="toAge" value={filters.toAge} onChange={handleChange} placeholder="Select" />
            </Form.Group>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" name="gender" value={filters.gender} onChange={handleChange}>
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-9 d-flex align-items-end justify-content-end">
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </Form>

      <div className="mt-4">
        {data.length === 0 ? (
          <div className="text-center text-muted">
            <p>No data available in table</p>
            <img src="path/to/no-data-icon.png" alt="No Data" style={{ width: "100px", height: "auto" }} />
            <p className="text-success">
              <a href="#">Add new record or search with different criteria</a>
            </p>
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>IPD No</th>
                <th>Case ID</th>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Mobile Number</th>
                <th>Guardian Name</th>
                <th>Discharged</th>
                <th>Patient Active</th>
                <th>Net Amount (₹)</th>
                <th>Paid Amount (₹)</th>
                <th>Balance Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.ipdNo}</td>
                  <td>{item.caseId}</td>
                  <td>{item.patientName}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.mobileNumber}</td>
                  <td>{item.guardianName}</td>
                  <td>{item.discharged}</td>
                  <td>{item.patientActive}</td>
                  <td>{item.netAmount}</td>
                  <td>{item.paidAmount}</td>
                  <td>{item.balanceAmount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default IPDBalanceReport;

