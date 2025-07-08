import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import GraficoLinha from './GraficoLinha';

function SensorGraphs({ dados }) {
  return (
    <>
      <GraficoLinha
        titulo="Temperatura (°C)"
        dados={dados}
        dataKey="temperatura"
        cor="#ff7043"
        icon={ThermostatIcon}
        ariaLabel="Gráfico de temperatura em graus Celsius"
      />
      <GraficoLinha
        titulo="Umidade (%)"
        dados={dados}
        dataKey="umidade"
        cor="#29b6f6"
        icon={WaterDropIcon}
        ariaLabel="Gráfico de umidade relativa do ar"
      />
      <GraficoLinha
        titulo="Luminosidade (lux)"
        dados={dados}
        dataKey="luminosidade"
        cor="#fdd835"
        icon={WbSunnyIcon}
        ariaLabel="Gráfico de luminosidade em lux"
      />
    </>
  );
}

export default SensorGraphs;

