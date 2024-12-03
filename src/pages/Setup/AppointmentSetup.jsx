import React, { useState, useEffect } from "react";
import axios from "axios";
import './Appoinmentsetup.css';
import { useNavigate } from "react-router-dom";
const AppointmentSetup = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [shiftOptions, setShiftOptions] = useState([]);
  const [shift, setShift] = useState("");
  const [consultationDuration, setConsultationDuration] = useState("");
  const [chargeCategory, setChargeCategory] = useState("");
  const [charge, setCharge] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showFields, setShowFields] = useState(false);
  const [chargeCategories, setChargeCategories] = useState([]);
  const [selectedCharge1, setSelectedCharge1] = useState("");
  const [selectedCharge2, setSelectedCharge2] = useState("");
  const [amount, setAmount] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [weeklySchedule, setWeeklySchedule] = useState([
    { day: "Monday", slots: [], isOpen: false },
    { day: "Tuesday", slots: [], isOpen: false },
    { day: "Wednesday", slots: [], isOpen: false },
    { day: "Thursday", slots: [], isOpen: false },
    { day: "Friday", slots: [], isOpen: false },
    { day: "Saturday", slots: [], isOpen: false },
    { day: "Sunday", slots: [], isOpen: false },
  ]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/staffrole/doctor");
      setDoctorsList(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      alert("Error fetching doctor details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const navigate = useNavigate();

  const fetchChargeCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/charge-categories");
      setChargeCategories(response.data);
    } catch (error) {
      console.error("Error fetching charge categories:", error);
    }
  };

  const fetchCharges = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/charges");
      const chargesData = response.data || [];
      setCharge(chargesData);
    } catch (error) {
      console.error("Error fetching charges:", error);
      setCharge([]);
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchChargeCategories();
    fetchCharges();
  }, []);

  const handleDoctorChange = (e) => {
    const selectedDoctorId = e.target.value;
    setSelectedDoctor(selectedDoctorId);
    if (selectedDoctorId) {
      setShiftOptions(["mrg", "afternoon", "eveng", "night"]);
    } else {
      setShiftOptions([]);
    }

    if (selectedDoctorId && shift) {
      setShowFields(true);
    } else {
      setShowFields(false);
    }
  };

  const buttonStyles = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",  // Green background color
    color: "white",              // White text color
    border: "none",              // Remove border
    borderRadius: "5px",         // Rounded corners
    margin: "10px 0",            // Spacing between buttons
    cursor: "pointer",          // Pointer cursor on hover
    fontSize: "16px",            // Font size
    transition: "background-color 0.3s", // Smooth background transition
  };
  
  

  const handleShiftChange = (e) => {
    const selectedShift = e.target.value;
    setShift(selectedShift);
    if (selectedDoctor && selectedShift) {
      setShowFields(true);
    } else {
      setShowFields(false);
    }
  };

  const handleCharge1Change = (e) => {
    setSelectedCharge1(e.target.value);
  };

  const handleCharge2Change = (e) => {
    setSelectedCharge2(e.target.value);
  };

  useEffect(() => {
    const charge1 = charge.find((ch) => ch.id === parseInt(selectedCharge1));
    const charge2 = charge.find((ch) => ch.id === parseInt(selectedCharge2));

    if (charge1 && charge2) {
      setAmount(charge1.tax + charge2.charge); // Calculate the total amount
    } else {
      setAmount(0); // Reset amount if no charge is selected
    }
  }, [selectedCharge1, selectedCharge2]);

  const calculateAmount = () => {
    const charge1 = charge.find((charge) => charge.id === selectedCharge1);
    const charge2 = charge.find((charge) => charge.id === selectedCharge2);
    const categorySelected = chargeCategories.find((category) => category.id === chargeCategory);

    if (charge1 && charge2 && categorySelected) {
      const calculatedAmount = (charge1.rate + charge2.rate) * categorySelected.multiplier;
      setAmount(calculatedAmount);
    } else {
      setAmount(0);
    }
  };




  const handleSearch = () => {
    if (!selectedDoctor || !selectedShift) {
      setErrorMessage("Please fill in all required fields before searching.");
      return;
    }
    setErrorMessage("");
    setShowImage(true); // Show image content upon search
  };

  const handleSave = async () => {
    if (!shift || !consultationDuration || !chargeCategory || !selectedCharge1 || !selectedCharge2) {
      setErrorMessage("Please fill in all required fields before saving.");
      return;
    }
    setErrorMessage("");
  
    const data = {
      shift,
      consultationDuration,
      chargeCategory,
      selectedCharge1,
      selectedCharge2,
      amount,
      weeklySchedule,
    };
  
    console.log(data);  // Add this line to check the data
  
    try {
      // Send data to the backend API
      const response = await fetch('http://localhost:3000/api/doctor/save-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Data saved successfully!");
        console.log(result.data); // Log saved data
      } else {
        alert(result.message || "Failed to save data.");
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert("An error occurred while saving the data.");
    }
  };
  
  

  const handleAddTimeSlot = (day) => {
    setWeeklySchedule(prevSchedule =>
      prevSchedule.map(schedule =>
        schedule.day === day
          ? {
              ...schedule,
              slots: [
                ...schedule.slots,
                { from: "", to: "", ampm: "am" }, // Adding a new slot with default 'am' time
              ]
            }
          : schedule
      )
    );
  };

  const handleDeleteTimeSlot = (day, index) => {
    setWeeklySchedule(prevSchedule =>
      prevSchedule.map(schedule =>
        schedule.day === day
          ? {
              ...schedule,
              slots: schedule.slots.filter((_, i) => i !== index) // Deleting a specific slot
            }
          : schedule
      )
    );
  };

  const handleTimeChange = (day, index, type, value) => {
    setWeeklySchedule(prevSchedule =>
      prevSchedule.map(schedule =>
        schedule.day === day
          ? {
              ...schedule,
              slots: schedule.slots.map((slot, i) =>
                i === index ? { ...slot, [type]: value } : slot
              )
            }
          : schedule
      )
    );
  };

  const renderTimeSlotInput = (day) => {
    const schedule = weeklySchedule.find(s => s.day === day);
    if (!schedule || !schedule.slots.length) return null;

    return schedule.slots.map((slot, index) => (
      <div key={index} style={{ marginBottom: "10px" }}>
        <label>From:</label>
        <input
          type="time"
          value={slot.from}
          onChange={(e) => handleTimeChange(day, index, "from", e.target.value)}
        />
        <select
          value={slot.ampm}
          onChange={(e) => handleTimeChange(day, index, "ampm", e.target.value)}
        >
          <option value="am">AM</option>
          <option value="pm">PM</option>
        </select>
        <label>To:</label>
        <input
          type="time"
          value={slot.to}
          onChange={(e) => handleTimeChange(day, index, "to", e.target.value)}
        />
        <button
          type="button"
          onClick={() => handleDeleteTimeSlot(day, index)}
          style={{ backgroundColor: "red", color: "white", marginLeft: "10px" }}
        >
          Delete Slot
        </button>
      </div>
    ));
  };

  return (
    <div style={{ display: "flex", padding: "20px", maxWidth: "100%", margin: "0 auto" }}>
      {/* Left Container for Buttons */}
      <div
        style={{
          width: "25%",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button style={buttonStyles} onClick={() => navigate('/setup/appointment')}>Slot</button>
        <button style={buttonStyles} onClick={() => navigate('/setup/doctorshift')}>Doctorshift </button>
        <button style={buttonStyles} onClick={() => navigate('/setup/shift')}>Shift</button>
      </div>

      {/* Right Container for the Form */}
      <div style={{ width: "75%", padding: "20px", background: "#f9f9f9", borderRadius: "5px" }}>
        <h3>Appointment Setup</h3>
        {loading ? (
          <p>Loading doctors...</p>
        ) : (
          <form>
            <div style={{ marginBottom: "15px" }}>
              <label>Doctor *</label>
              <select value={selectedDoctor} onChange={handleDoctorChange} required>
                <option value="">Select</option>
                {doctorsList.length > 0 ? (
                  doctorsList.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} {doc.surname}
                    </option>
                  ))
                ) : (
                  <option value="">No doctors available</option>
                )}
              </select>
            </div>

            {selectedDoctor && (
              <div style={{ marginBottom: "15px" }}>
                <label>Shift *</label>
                <select value={shift} onChange={handleShiftChange} required>
                  <option value="">Select</option>
                  {shiftOptions.map((shiftOption) => (
                    <option key={shiftOption} value={shiftOption}>
                      {shiftOption.charAt(0).toUpperCase() + shiftOption.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Other Fields and Logic */}
            {showFields && (
              <>

<div style={{ marginBottom: "20px" }}>
              <label>Consultation Duration (mins):</label>
              <input
                type="number"
                value={consultationDuration}
                onChange={(e) => setConsultationDuration(e.target.value)}
                style={{ padding: "10px", borderRadius: "4px", width: "100%" }}
              />
            </div>
                <div style={{ marginBottom: "15px" }}>
                  <label>Charge Category *</label>
                  <select
                    value={chargeCategory}
                    onChange={(e) => setChargeCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    {chargeCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>


                <div style={{ marginBottom: "15px" }}>
                  <label>Charge 1 *</label>
                  <select value={selectedCharge1} onChange={handleCharge1Change} required>
                    <option value="">Select Charge 1</option>
                    {charge.map((ch) => (
                      <option key={ch.id} value={ch.id}>
                        {ch.tax} - {ch.charge}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label>Charge 2 *</label>
                  <select value={selectedCharge2} onChange={handleCharge2Change} required>
                    <option value="">Select Charge 2</option>
                    {charge.map((ch) => (
                      <option key={ch.id} value={ch.id}>
                        {ch.tax} - {ch.charge}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <p>Total Amount: ${amount}</p>
                </div>


                {weeklySchedule.map((schedule, index) => (
              <div key={index}>
                <h4>{schedule.day}</h4>
                <button
                  type="button"
                  onClick={() => handleAddTimeSlot(schedule.day)}
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  Add Time Slot
                </button>
                {renderTimeSlotInput(schedule.day)}
              </div>
            ))}
                 <button onClick={handleSave} style={buttonStyles}>Save</button>
              </>
            )}

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentSetup;



