import { useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";

const steps = ["Account Type", "Basic Info", "Preferences"];

export default function OnboardingWizard() {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    role: "",
    fullName: "",
    phone: "",
    city: "",
    budget: "",
    genderPreference: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <TextField
            select
            fullWidth
            label="Account Type"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <MenuItem value="tenant">Tenant</MenuItem>
            <MenuItem value="owner">Owner</MenuItem>
            <MenuItem value="agent">Agent / Agency</MenuItem>
          </TextField>
        );

      case 1:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Box>
        );

      case 2:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Monthly Budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            />
            <TextField
              select
              label="Roommate Preference"
              name="genderPreference"
              value={formData.genderPreference}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="mixed">Mixed</MenuItem>
            </TextField>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 5,
        p: 3,
      }}
    >
      <Typography variant="h4" mb={3}>
        Account Setup
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3, mb: 3 }}>
        {renderStepContent(activeStep)}
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="success">
            Finish
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}