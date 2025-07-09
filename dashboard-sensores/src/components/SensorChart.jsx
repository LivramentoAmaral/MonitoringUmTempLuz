import {
  Container,
  Paper,
} from '@mui/material';
import useSensorData from '../hooks/useSensorData';
import SensorChartHeader from './sensorChart/SensorChartHeader';
import LoadingAndErrorDisplay from './sensorChart/LoadingAndErrorDisplay';
import SensorGraphs from './sensorChart/SensorGraphs';

export default function SensorChart() {
  const { dados, loading, erro } = useSensorData();

  return (
    <Container maxWidth="" role="main" sx={{ backgroundColor: '#141414', p: 2, borderRadius: 3 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 4, 
          borderRadius: 3,
          backgroundColor: '#142814',
          boxShadow: '0 4px 12px 0 rgba(80, 40, 20, 0.6)', // Seal Brown sombra suave
          color: '#f5f5f5',
        }}
      >
        <SensorChartHeader sx={{ color: '#78503c' }} />
        
        <LoadingAndErrorDisplay loading={loading} erro={erro} sx={{ color: '#cccccc' }} />
        
        {!loading && !erro && (
          <SensorGraphs dados={dados} />
        )}
      </Paper>
    </Container>
  );
}
