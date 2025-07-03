import { Container, Typography, Box, Divider } from '@mui/material';
import SensorChart from './components/SensorChart';

function App() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Dashboard de Monitoramento
      </Typography>

      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Acompanhe em tempo real as variações de temperatura, umidade e luminosidade do ambiente.
      </Typography>

      {/* Legenda visual de sensores */}
      <Box display="flex" justifyContent="center" gap={4} mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={16} height={16} sx={{ backgroundColor: '#ff7043', borderRadius: '50%' }} />
          <Typography variant="body2">Temperatura</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={16} height={16} sx={{ backgroundColor: '#29b6f6', borderRadius: '50%' }} />
          <Typography variant="body2">Umidade</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={16} height={16} sx={{ backgroundColor: '#fdd835', borderRadius: '50%' }} />
          <Typography variant="body2">Luminosidade</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <SensorChart />
    </Container>
  );
}

export default App;
