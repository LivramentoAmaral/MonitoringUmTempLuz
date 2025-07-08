import {
  Alert,
  Box,
  CircularProgress,
} from '@mui/material';

function LoadingAndErrorDisplay({ loading, erro }) {
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={250}
        aria-busy="true"
        role="status"
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (erro) {
    return (
      <Alert severity="error" sx={{ mb: 2 }} role="alert">
        {erro}
      </Alert>
    );
  }

  return null;
}

export default LoadingAndErrorDisplay;

