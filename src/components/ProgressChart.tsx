import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressChartProps {
  title: string;
  data: any[];
  type: 'line' | 'bar';
  dataKey: string;
  color: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ title, data, type, dataKey, color }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-vitalis-brown dark:text-white font-medium">{`${label}`}</p>
          <p className="text-vitalis-brown dark:text-white">
            <span className="font-semibold">{`${payload[0].name || dataKey}: ${payload[0].value}`}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 rounded-3xl border-2 border-vitalis-gold/20 dark:border-gray-600 shadow-lg transition-colors duration-200">
      <h3 className="text-xl font-bold mb-4 text-vitalis-brown dark:text-white">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-600" />
              <XAxis 
                dataKey="name" 
                stroke="#8B7355" 
                className="dark:stroke-gray-300"
                tick={{ fill: '#8B7355', className: 'dark:fill-gray-300' }}
              />
              <YAxis 
                stroke="#8B7355" 
                className="dark:stroke-gray-300"
                tick={{ fill: '#8B7355', className: 'dark:fill-gray-300' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-600" />
              <XAxis 
                dataKey="name" 
                stroke="#8B7355" 
                className="dark:stroke-gray-300"
                tick={{ fill: '#8B7355', className: 'dark:fill-gray-300' }}
              />
              <YAxis 
                stroke="#8B7355" 
                className="dark:stroke-gray-300"
                tick={{ fill: '#8B7355', className: 'dark:fill-gray-300' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={dataKey} 
                fill={color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ProgressChart;
