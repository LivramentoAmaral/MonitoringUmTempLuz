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
        backgroundColor: '#141414', // Black
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
        px: { xs: 1, md: 3 },
        pt: 2,
        pb: 3,
        overflowX: 'auto',
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
          userSelect: 'none',
        }}
      >
        <Icon fontSize="medium" />
        {titulo}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 1, md: 2 },
          backgroundColor: '#142814', // Dark Jungle Green
          border: `1px solid ${cor}33`, // cor com transparência
          borderLeft: `6px solid ${cor}`,
          borderRadius: 2,
          color: 'white',
        }}
      >
        <Box sx={{ width: '100%', minWidth: 320 }}>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={dados}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#78503c66" strokeDasharray="4 4" /> {/* Mud com transparência */}
              <XAxis
                dataKey="data"
                tick={{ fontSize: 12, fill: '#cccccc' }}
                tickFormatter={(val) =>
                  new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                }
                stroke="#999999"
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#cccccc' }}
                stroke="#999999"
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#78503c', borderColor: cor, color: '#fff' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                labelFormatter={(val) =>
                  new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                }
                formatter={(value, name) => [
                  `${value.toFixed(2)}`,
                  name.charAt(0).toUpperCase() + name.slice(1)
                ]}
              />
              <Legend 
                verticalAlign="top" 
                height={30} 
                wrapperStyle={{ color: 'white' }} 
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={cor}
                strokeWidth={2.5}
                dot={{ r: 3, stroke: cor, strokeWidth: 1, fill: '#141414' }}
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
