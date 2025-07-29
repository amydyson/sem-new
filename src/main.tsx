import { useState, useEffect } from "react";
// Remove these Amplify imports for now:
// import { generateClient } from 'aws-amplify/data';
// import type { Schema } from '../../amplify/data/resource';
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

// Remove the client line:
// const client = generateClient<Schema>();

const ProfileTest = () => {
  const { user, isAuthenticated } = useAuth0();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState<"Masculino" | "Feminino" | "">("");
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Mock save function until backend is ready
  const handleSave = async () => {
    if (!user?.sub) {
      setMessage("User not authenticated");
      return;
    }

    try {
      setLoading(true);

      // Mock saving - just add to local state
      const newProfile = {
        id: Date.now().toString(),
        userId: user.sub,
        height: parseFloat(height),
        weight: parseFloat(weight),
        gender: gender as "Masculino" | "Feminino",
      };

      console.log("Mock saved profile:", newProfile);
      setMessage("Profile saved successfully! (Mock save)");

      // Add to local profiles array
      setProfiles((prev) => [...prev, newProfile]);

      // Clear form
      setHeight("");
      setWeight("");
      setGender("");
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  // Mock load function
  const loadProfiles = async () => {
    console.log("Mock loading profiles...");
    // Profiles will be loaded from local state
  };

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
        Mock Database Test - User Profile
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add New Profile (Mock)
          </Typography>

          <TextField
            label="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            fullWidth
            sx={{ mb: 2 }}
          />

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
            {loading ? "Saving..." : "Save Profile (Mock)"}
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

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Saved Profiles ({profiles.length})
          </Typography>

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
                ID: {profile.id} (Mock)
              </Typography>
            </Box>
          ))}

          {profiles.length === 0 && (
            <Typography color="text.secondary">
              No profiles saved yet. Create one above!
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileTest;
