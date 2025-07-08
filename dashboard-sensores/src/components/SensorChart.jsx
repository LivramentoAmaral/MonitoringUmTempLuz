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
    <Container maxWidth="" role="main">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
        <SensorChartHeader />
        
        <LoadingAndErrorDisplay loading={loading} erro={erro} />
        
        {!loading && !erro && (
          <SensorGraphs dados={dados} />
        )}
      </Paper>
    </Container>
  );
}

