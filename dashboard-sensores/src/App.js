import { Container, Typography, Box, Divider } from '@mui/material';
import SensorChart from './components/SensorChart';

function App() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: '#141414',
        color: '#f5f5f5',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ px: 0, pt: 2, width: '100%' }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom sx={{ color: '#78503c' }}>
          Dashboard de Monitoramento
        </Typography>

        <Typography variant="body1" align="center" color="#cccccc" sx={{ mb: 4 }}>
          Acompanhe em tempo real as variações de temperatura, umidade e luminosidade do ambiente.
        </Typography>

        {/* Legenda visual de sensores */}
        <Box display="flex" justifyContent="center" gap={4} mb={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box width={16} height={16} sx={{ backgroundColor: '#78503c', borderRadius: '50%' }} />
            <Typography variant="body2" sx={{ color: '#f5f5f5' }}>Temperatura</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box width={16} height={16} sx={{ backgroundColor: '#143c3c', borderRadius: '50%' }} />
            <Typography variant="body2" sx={{ color: '#f5f5f5' }}>Umidade</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box width={16} height={16} sx={{ backgroundColor: '#643c28', borderRadius: '50%' }} />
            <Typography variant="body2" sx={{ color: '#f5f5f5' }}>Luminosidade</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4, borderColor: '#502814' }} />

        <SensorChart />
      </Box>
    </Container>
  );
}

export default App;
