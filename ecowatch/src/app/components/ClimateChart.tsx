"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

interface ClimateChartProps {
  dates: Array<{ date: string; value: number }>;
  title: string;
  unit: string;
  style?: React.CSSProperties;
}

// export default function ClimateChart({ dates }: ClimateChartProps) {
export default function ClimateChart({ dates, title, unit, style }: ClimateChartProps) {
  const option = {
    title: {
      text: `${title} (${unit})`,
      left: 'center',
      textStyle: { color: '#2fffd6', fontSize: 18 }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#101c2c',
      textStyle: { color: '#2fffd6' }
    },
    xAxis: {
      type: 'category',
      data: dates.map(d => d.date),
      axisLabel: { color: '#eafcff', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#eafcff', fontSize: 12 }
    },
    series: [
      {
        data: dates.map(d => d.value),
        type: 'line',
        smooth: true,
        lineStyle: { color: '#2fffd6', width: 3 },
        itemStyle: { color: '#00ffe0' },
        areaStyle: { color: 'rgba(47,255,214,0.15)' }
      }
    ],
    grid: { left: 40, right: 20, top: 40, bottom: 40 }
  };

  return (
    <div style={{ margin: '24px 0', height: '100%', width: '100%' }}>
      <ReactECharts option={option} style={typeof style !== 'undefined' ? style : { height: 320, width: '100%' }} />
    </div>
  );
}
