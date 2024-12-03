import React, { useState } from 'react';


const GeneralSetting = () => (
  <form>
    <div className="form-group">
      <label>Hospital Name</label>
      <input type="text" placeholder="HealthCare" />
    </div>
    <div className="form-group">
      <label>Hospital Code</label>
      <input type="text" placeholder="Your Hospital Code" />
    </div>
    <div className="form-group">
      <label>Address</label>
      <input type="text" placeholder="Bangalore" />
    </div>
    <div className="form-group">
      <label>Phone</label>
      <input type="text" placeholder="9889887757" />
    </div>
    <div className="form-group">
      <label>Email</label>
      <input type="email" placeholder="drighna@gmail.com" />
    </div>
    <div className="form-group">
      <label>Hospital Logo</label>
      <button type="button">Edit Logo</button>
    </div>
    <div className="form-group">
      <label>Hospital Small Logo</label>
      <button type="button">Edit Small Logo</button>
    </div>
    <div className="form-group">
      <label>Language</label>
      <select>
        <option>English</option>
      </select>
    </div>
    <div className="form-group">
      <label>Language RTL Text Mode</label>
      <div>
        <input type="radio" name="rtl" value="disabled" defaultChecked /> Disabled
        <input type="radio" name="rtl" value="enabled" /> Enabled
      </div>
    </div>
    <div className="form-group">
      <label>Date Format</label>
      <select>
        <option>dd-mm-yyyy</option>
      </select>
    </div>
    <div className="form-group">
      <label>Time Zone</label>
      <select>
        <option>(GMT+07:00) Indian, Christmas</option>
      </select>
    </div>
    <div className="form-group">
      <label>Currency</label>
      <select>
        <option>INR</option>
      </select>
    </div>
    <div className="form-group">
      <label>Currency Symbol</label>
      <input type="text" placeholder="₹" />
    </div>
  </form>
);

const NotificationSetting = () => (
  <div>
    <h2>Notification Setting</h2>
    {/* Add your notification settings form here */}
  </div>
);

// Define other setting components similarly...

const Settings = () => {
  const [selectedSetting, setSelectedSetting] = useState('General Setting');

  const renderContent = () => {
    switch (selectedSetting) {
      case 'General Setting':
        return <GeneralSetting />;
      case 'Notification Setting':
        return <NotificationSetting />;
      // Add cases for other settings
      default:
        return <GeneralSetting />;
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        {['General Setting', 'Notification Setting', 'System Notification Setting', 'SMS Setting', 'Email Setting', 'Payment Methods', 'Front CMS Setting', 'Prefix Setting', 'Roles Permissions', 'Backup / Restore', 'Languages', 'Users', 'Captcha Settings', 'Modules'].map((setting) => (
          <button
            key={setting}
            className={`sidebar-button ${selectedSetting === setting ? 'active' : ''}`}
            onClick={() => setSelectedSetting(setting)}
          >
            {setting}
          </button>
        ))}
      </div>
      <div className="settings-form">
        <h2>{selectedSetting}</h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;
