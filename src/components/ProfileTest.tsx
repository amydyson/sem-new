import React, { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import {
  Box,
  TextField,
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const client = generateClient<Schema>();

const ProfileTest = () => {
  const { user, isAuthenticated } = useAuth0();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState<"Masculino" | "Feminino" | "">("");
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Create profile
  const handleSave = async () => {
    if (!user?.sub) {
      setMessage("User not authenticated");
      return;
    }

    try {
      setLoading(true);

      const result = await client.models.UserProfile.create({
        userId: user.sub,
        height: parseFloat(height),
        weight: parseFloat(weight),
        gender: gender as "Masculino" | "Feminino",
      });

      console.log("Created profile:", result);
      setMessage("Profile saved successfully!");

      // Clear form
      setHeight("");
      setWeight("");
      setGender("");

      // Refresh list
      loadProfiles();
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  // Load all profiles
  const loadProfiles = async () => {
    try {
      const result = await client.models.UserProfile.list();
      console.log("Loaded profiles:", result);
      setProfiles(result.data || []);
    } catch (error) {
      console.error("Error loading profiles:", error);
    }
  };

  // Load profiles on component mount
  useEffect(() => {
    loadProfiles();
  }, []);

  if (!isAuthenticated) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Please log in to test the database</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Database Test - User Profile
      </Typography>

      {/* Form */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New Profile
          </Typography>

          {/* Height */}
          <TextField
            label="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* Weight */}
          <TextField
            label="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* Gender */}
          <Typography variant="body2" sx={{ mb: 1 }}>
            Gender
          </Typography>
          <ToggleButtonGroup
            value={gender}
            exclusive
            onChange={(_, newGender) => setGender(newGender)}
            sx={{ mb: 2, width: "100%" }}
          >
            <ToggleButton value="Masculino" sx={{ flex: 1 }}>
              Masculino
            </ToggleButton>
            <ToggleButton value="Feminino" sx={{ flex: 1 }}>
              Feminino
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading || !height || !weight || !gender}
            fullWidth
          >
            {loading ? "Saving..." : "Save Profile"}
          </Button>

          {message && (
            <Alert
              severity={message.includes("Error") ? "error" : "success"}
              sx={{ mt: 2 }}
            >
              {message}
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Display existing profiles */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Existing Profiles ({profiles.length})
          </Typography>

          <Button onClick={loadProfiles} variant="outlined" sx={{ mb: 2 }}>
            Refresh
          </Button>

          {profiles.map((profile, index) => (
            <Box
              key={profile.id || index}
              sx={{
                p: 2,
                border: 1,
                borderColor: "grey.300",
                mb: 1,
                borderRadius: 1,
              }}
            >
              <Typography>
                <strong>User ID:</strong> {profile.userId}
              </Typography>
              <Typography>
                <strong>Height:</strong> {profile.height} cm
              </Typography>
              <Typography>
                <strong>Weight:</strong> {profile.weight} kg
              </Typography>
              <Typography>
                <strong>Gender:</strong> {profile.gender}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ID: {profile.id}
              </Typography>
            </Box>
          ))}

          {profiles.length === 0 && (
            <Typography color="text.secondary">
              No profiles found. Create one above!
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileTest;
