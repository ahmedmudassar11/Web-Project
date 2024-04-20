import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';

const VehicleManager = () => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    plateNumber: '',
    registrationNumber: '',
    vehicleType: '',
  });
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle((prevVehicle) => ({ ...prevVehicle, [name]: value }));
  };

  const handleAddVehicle = () => {
    if (editingIndex === -1) {
      // Add a new vehicle
      setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
    } else {
      // Update the existing vehicle
      setVehicles((prevVehicles) => {
        const updatedVehicles = [...prevVehicles];
        updatedVehicles[editingIndex] = newVehicle;
        return updatedVehicles;
      });
      setEditingIndex(-1); // Reset editing index after update
    }

    // Clear the form
    setNewVehicle({
      name: '',
      plateNumber: '',
      registrationNumber: '',
      vehicleType: '',
    });
  };

  const handleEditVehicle = (index) => {
    // Set the form fields with the data of the selected vehicle
    setNewVehicle({ ...vehicles[index] });
    setEditingIndex(index);
  };

  const handleDeleteVehicle = (index) => {
    // Delete the selected vehicle
    setVehicles((prevVehicles) => {
      const updatedVehicles = [...prevVehicles];
      updatedVehicles.splice(index, 1);
      return updatedVehicles;
    });
  };

  return (
    <div className="container mt-4">
      <h2>Vehicle Manager</h2>
      <ul className="list-group">
        {vehicles.map((vehicle, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {vehicle.name} - {vehicle.plateNumber} - {vehicle.registrationNumber} - {vehicle.vehicleType}
            <div>
              <button
                type="button"
                className="btn btn-warning btn-sm mx-1"
                onClick={() => handleEditVehicle(index)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteVehicle(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3>{editingIndex === -1 ? 'Add New Vehicle' : 'Edit Vehicle'}</h3>
        <form>
        <form>
          <div className="mb-3">
            <label htmlFor="vehicleName" className="form-label">
              Vehicle Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="vehicleName"
              name="name"
              value={newVehicle.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="plateNumber" className="form-label">
              Plate Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="plateNumber"
              name="plateNumber"
              value={newVehicle.plateNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="registrationNumber" className="form-label">
              Registration Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="registrationNumber"
              name="registrationNumber"
              value={newVehicle.registrationNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="vehicleType" className="form-label">
              Vehicle Type:
            </label>
            <input
              type="text"
              className="form-control"
              id="vehicleType"
              name="vehicleType"
              value={newVehicle.vehicleType}
              onChange={handleInputChange}
            />
          </div>
          {/* <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddVehicle}
          >
            Add Vehicle
          </button> */}
        </form>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddVehicle}
          >
            {editingIndex === -1 ? 'Add Vehicle' : 'Update Vehicle'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleManager;
