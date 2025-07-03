import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getDadosSensores } from '../services/api';

const transformaDados = (dadosBrutos) =>
  dadosBrutos.map(item => ({
    ...item,
    data: new Date(item.data).toLocaleTimeString([], { hour12: false }),
    temperatura: Number(item.temperatura.toFixed(2)),
    umidade: Number(item.umidade.toFixed(2)),
    luminosidade: Number(item.luminosidade.toFixed(2)),
  }));

function GraficoLinha({ titulo, dados, dataKey, cor, icon: Icon, ariaLabel }) {
  if (!dados.length) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Nenhum dado disponível
      </Typography>
    );
  }

  return (
    <Box role="region" aria-label={ariaLabel} height={300} mt={5}>
      <Typography
        variant="h6"
        fontWeight="medium"
        gutterBottom
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: cor,
        }}
      >
        <Icon fontSize="small" />
        {titulo}
      </Typography>

      <Paper
        elevation={1}
        sx={{
          p: 2,
          backgroundColor: '#fafafa',
          border: `1px solid ${cor}33`,
          borderLeft: `6px solid ${cor}`,
          borderRadius: 2,
        }}
      >
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={dados}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
            <XAxis dataKey="data" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => value.toFixed(2)} />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={cor}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}

export default function SensorChart() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const firstLoad = useRef(true);

  const fetchDados = useCallback(async () => {
    try {
      setErro(null);
      if (firstLoad.current) setLoading(true);
      const resultado = await getDadosSensores();
      setDados(transformaDados(resultado));
    } catch (err) {
      setErro('Não foi possível carregar os dados. Verifique sua conexão ou tente novamente.');
      console.error(err);
    } finally {
      if (firstLoad.current) {
        setLoading(false);
        firstLoad.current = false;
      }
    }
  }, []);

  useEffect(() => {
    fetchDados();
    const interval = setInterval(fetchDados, 20000);
    return () => clearInterval(interval);
  }, [fetchDados]);

  return (
    <Container maxWidth="md" role="main">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Monitoramento de Sensores Ambientais
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Os gráficos abaixo mostram a variação em tempo real dos dados de temperatura, umidade e luminosidade.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {loading && (
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
        )}

        {erro && (
          <Alert severity="error" sx={{ mb: 2 }} role="alert">
            {erro}
          </Alert>
        )}

        {!loading && !erro && (
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
        )}
      </Paper>
    </Container>
  );
}
