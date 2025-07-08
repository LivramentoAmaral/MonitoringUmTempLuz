import {
  Box,
  Paper,
  Typography
} from '@mui/material';

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

export default function GraficoLinha({ titulo, dados, dataKey, cor, icon: Icon, ariaLabel }) {
  if (!dados.length) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Nenhum dado disponível
      </Typography>
    );
  }

  return (
    <Box
      role="region"
      aria-label={ariaLabel}
      sx={{
        mt: { xs: 3, md: 5 },
        mb: 4,
        backgroundColor: '#f9fafb',
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        px: { xs: 1, md: 3 },
        pt: 2,
        pb: 3,
        overflowX: 'auto', // Se necessário, evita quebra
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        gutterBottom
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: cor,
          mb: 1.5,
        }}
      >
        <Icon fontSize="medium" />
        {titulo}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 1, md: 2 },
          backgroundColor: '#ffffff',
          border: `1px solid ${cor}33`,
          borderLeft: `6px solid ${cor}`,
          borderRadius: 2,
        }}
      >
        <Box sx={{ width: '100%', minWidth: 320 }}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={dados}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />
              <XAxis
                dataKey="data"
                tick={{ fontSize: 12 }}
                tickFormatter={(val) =>
                  new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                }
                stroke="#757575"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#757575"
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', borderColor: cor }}
                labelFormatter={(val) =>
                  new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                }
                formatter={(value, name) => [
                  `${value.toFixed(2)}`,
                  name.charAt(0).toUpperCase() + name.slice(1)
                ]}
              />
              <Legend verticalAlign="top" height={30} />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={cor}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
}
