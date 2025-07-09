import {
  Divider,
  Typography
} from '@mui/material';

function SensorChartHeader() {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Monitoramento de Sensores Ambientais
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 , color:'white' }}>
        Os gráficos abaixo mostram a variação em tempo real dos dados de temperatura, umidade e luminosidade.
      </Typography>

      <Divider sx={{ mb: 5 }} />
    </>
  );
}

export default SensorChartHeader;

