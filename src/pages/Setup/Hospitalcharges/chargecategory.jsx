// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCopy, faFileExcel, faFilePdf, faFileCsv, faPrint, faPlus } from "@fortawesome/free-solid-svg-icons";
// import "./chargecategory.css";

// const ChargecategoryList = () => {
//   const [chargeTypes, setChargeTypes] = useState([]);
//   const [newChargeType, setNewChargeType] = useState({ name: "", description: "", ChargeType: "" });
//   const [notificationVisible, setNotificationVisible] = useState(false);
//   const [showChargeTypeOptions, setShowChargeTypeOptions] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const chargeTypeOptions = ["OPD", "Ambulance", "Blood Bank", "IPD"];

//   useEffect(() => {
//     fetchChargeTypes();
//   }, []);

//   // Fetch charge types from the backend
//   const fetchChargeTypes = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/api/charge-categories/add");
//       setChargeTypes(response.data);
//     } catch (error) {
//       console.error("Error fetching charge types:", error);
//     }
//   };

//   // Function to reset the notification and form
//   const resetNotification = () => {
//     setNotificationVisible(false);  // Hide the notification box
//     setNewChargeType({ name: "", description: "", ChargeType: "" });  // Reset the form fields
//   };

//   const handleAddChargeType = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/api/charge-categories/add", newChargeType);
//       setChargeTypes([...chargeTypes, response.data]);
//       resetNotification();  // Reset form and close modal
//     } catch (error) {
//       console.error("Error adding charge type:", error);
//     }
//   };

//   const handleDeleteChargeType = async (id) => {
//     if (window.confirm("Are you sure you want to delete this charge type?")) {
//       try {
//         await axios.delete(`http://localhost:3000/api/chargeTypes/${id}`);
//         setChargeTypes(chargeTypes.filter((chargeType) => chargeType._id !== id));
//       } catch (error) {
//         console.error("Error deleting charge type:", error);
//       }
//     }
//   };

//   // Safe filtering that ensures we don't call toLowerCase on undefined values
//   const filteredChargeTypes = chargeTypes.filter((type) => {
//     return (
//       (type.name && type.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (type.description && type.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (type.ChargeType && type.ChargeType.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//   });

//   return (
//     <div className="smallcontainer">
//       <div className="charge-type-list-container">
//         <h2>Charge Category List</h2>

//         {notificationVisible && (
//           <div className="notification-box">
//             <h4>Add Charge Type</h4>
//             <input
//               type="text"
//               placeholder="Charge Type Name"
//               value={newChargeType.name}
//               onChange={(e) => setNewChargeType({ ...newChargeType, name: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Description"
//               value={newChargeType.description}
//               onChange={(e) => setNewChargeType({ ...newChargeType, description: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Charge Type"
//               value={newChargeType.ChargeType}
//               onClick={() => setShowChargeTypeOptions(!showChargeTypeOptions)}
//               readOnly
//             />
//             {showChargeTypeOptions && (
//               <ul>
//                 {chargeTypeOptions.map((type) => (
//                   <li key={type} onClick={() => setNewChargeType({ ...newChargeType, ChargeType: type })}>
//                     {type}
//                   </li>
//                 ))}
//               </ul>
//             )}
//             <button onClick={handleAddChargeType}>Save</button>
//             <button onClick={() => setNotificationVisible(false)}>Close</button>
//           </div>
//         )}

//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <div className="add-charge-type-container">
//           <button onClick={() => setNotificationVisible(true)}>
//             <FontAwesomeIcon icon={faPlus} /> Add Charge Category
//           </button>
//         </div>

//         <div className="export-buttons">
//           {/* Add export buttons here (e.g., Excel, PDF, CSV) */}
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Charge Type</th>
//               <th>Description</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredChargeTypes.map((type) => (
//               <tr key={type._id}>
//                 <td>{type.name}</td>
//                 <td>{type.ChargeType}</td>
//                 <td>{type.description}</td>
//                 <td>
//                   <button onClick={() => handleDeleteChargeType(type._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ChargecategoryList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./chargecategory.css";

const ChargecategoryList = () => {
  const [chargeTypes, setChargeTypes] = useState([]); // State to store all charge types
  const [newChargeType, setNewChargeType] = useState({ name: "", description: "", ChargeType: "" });
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [showChargeTypeOptions, setShowChargeTypeOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const chargeTypeOptions = ["OPD", "Ambulance", "Blood Bank", "IPD"];

  useEffect(() => {
    fetchChargeTypes();
  }, []);

  // Fetch charge types from the backend
  const fetchChargeTypes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/charge-categories/"); // Correct endpoint to fetch all charge types
      setChargeTypes(response.data); // Set fetched data into state
    } catch (error) {
      console.error("Error fetching charge types:", error);
    }
  };

  // Function to reset the notification and form
  const resetNotification = () => {
    setNotificationVisible(false); // Hide the notification box
    setNewChargeType({ name: "", description: "", ChargeType: "" }); // Reset the form fields
  };

  // Add new charge type
  const handleAddChargeType = async () => {
    try {
      // Post the new charge type to the backend
      const response = await axios.post("http://localhost:3000/api/charge-categories/add", newChargeType);
      
      // Add the new charge type to the state to update the table
      setChargeTypes((prevChargeTypes) => [...prevChargeTypes, response.data]); // Append the new charge type
      resetNotification(); // Reset form and close modal
    } catch (error) {
      console.error("Error adding charge type:", error);
    }
  };
  

  // Delete a charge type
  const handleDeleteChargeType = async (id) => {
    if (window.confirm("Are you sure you want to delete this charge type?")) {
      try {
        await axios.delete(`http://localhost:3000/api/charge-categories/${id}`); // Correct endpoint for deleting charge type
        setChargeTypes(chargeTypes.filter((chargeType) => chargeType._id !== id)); // Remove deleted charge type from the list
      } catch (error) {
        console.error("Error deleting charge type:", error);
      }
    }
  };

  // Safe filtering that ensures we don't call toLowerCase on undefined values
  const filteredChargeTypes = chargeTypes.filter((type) => {
    return (
      (type.name && type.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (type.description && type.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (type.ChargeType && type.ChargeType.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Check if all fields are filled to enable the 'Save' button
  const isFormComplete = newChargeType.name && newChargeType.description && newChargeType.ChargeType;

  return (
    <div className="smallcontainer">
      <div className="charge-type-list-container">
        <h2>Charge Category List</h2>

        {notificationVisible && (
          <div className="notification-box">
            <h4>Add Charge Type</h4>
            <input
              type="text"
              placeholder="Charge Type Name"
              value={newChargeType.name}
              onChange={(e) => setNewChargeType({ ...newChargeType, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              value={newChargeType.description}
              onChange={(e) => setNewChargeType({ ...newChargeType, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Charge Type"
              value={newChargeType.ChargeType}
              onClick={() => setShowChargeTypeOptions(!showChargeTypeOptions)}
              readOnly
            />
            {showChargeTypeOptions && (
              <ul className="charge-type-options">
                {chargeTypeOptions.map((type) => (
                  <li key={type} onClick={() => setNewChargeType({ ...newChargeType, ChargeType: type })}>
                    {type}
                  </li>
                ))}
              </ul>
            )}
            <button
              className="save-button"
              onClick={handleAddChargeType}
              disabled={!isFormComplete} // Disable button if form is incomplete
            >
              Save
            </button>
            <button className="close-button" onClick={() => setNotificationVisible(false)}>Close</button>
          </div>
        )}

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="add-charge-type-container">
          <button
            className="add-button"
            onClick={() => setNotificationVisible(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Charge Category
          </button>
        </div>

        <table className="charge-types-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Charge Type</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredChargeTypes.map((type) => (
              <tr key={type._id}>
                <td>{type.name}</td>
                <td>{type.ChargeType}</td>
                <td>{type.description}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteChargeType(type._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChargecategoryList;


