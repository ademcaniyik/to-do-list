import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

export interface ChangePasswordProps {
  onChangePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onChangePassword }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await onChangePassword(oldPassword, newPassword);
      setSuccess(true);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Change Password
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Password changed successfully
        </Alert>
      )}

      <TextField
        fullWidth
        type="password"
        label="Current Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        type="password"
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        type="password"
        label="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={!oldPassword || !newPassword || !confirmPassword}
      >
        Change Password
      </Button>
    </Box>
  );
};

export default ChangePassword;
