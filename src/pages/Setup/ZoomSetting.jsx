import React, { useState } from 'react';
import { Box, TextField, Radio, RadioGroup, FormControl, FormControlLabel, Button, Typography } from '@mui/material';

const SettingsForm = () => {
  const [settings, setSettings] = useState({
    zoomApiKey: 'demo',
    zoomApiSecret: 'demo',
    doctorApiCredential: 'enabled',
    useZoomClientApp: 'enabled',
    opdDuration: 30,
    ipdDuration: 30,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Add your save logic here
    console.log("Settings saved", settings);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3, backgroundColor: 'white', borderRadius: 1, boxShadow: 1 }}>
      <Typography variant="h5" gutterBottom>Settings</Typography>
      
      {/* Zoom API Key */}
      <TextField
        label="Zoom API Key"
        name="zoomApiKey"
        value={settings.zoomApiKey}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* Zoom API Secret */}
      <TextField
        label="Zoom API Secret"
        name="zoomApiSecret"
        value={settings.zoomApiSecret}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* Doctor API Credential */}
      <FormControl component="fieldset" margin="normal">
        <Typography>Doctor API Credential</Typography>
        <RadioGroup
          row
          name="doctorApiCredential"
          value={settings.doctorApiCredential}
          onChange={handleChange}
        >
          <FormControlLabel value="disabled" control={<Radio />} label="Disabled" />
          <FormControlLabel value="enabled" control={<Radio />} label="Enabled" />
        </RadioGroup>
      </FormControl>

      {/* Use Zoom Client App */}
      <FormControl component="fieldset" margin="normal">
        <Typography>Use Zoom Client App</Typography>
        <RadioGroup
          row
          name="useZoomClientApp"
          value={settings.useZoomClientApp}
          onChange={handleChange}
        >
          <FormControlLabel value="disabled" control={<Radio />} label="Disabled" />
          <FormControlLabel value="enabled" control={<Radio />} label="Enabled" />
        </RadioGroup>
      </FormControl>

      {/* Default OPD Duration */}
      <TextField
        label="Default OPD Duration (In Minutes)"
        name="opdDuration"
        type="number"
        value={settings.opdDuration}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* Default IPD Duration */}
      <TextField
        label="Default IPD Duration (In Minutes)"
        name="ipdDuration"
        type="number"
        value={settings.ipdDuration}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* Save Button */}
      <Button variant="contained" color="primary" fullWidth onClick={handleSave} sx={{ mt: 2 }}>
        Save
      </Button>
    </Box>
  );
};

export default SettingsForm;
