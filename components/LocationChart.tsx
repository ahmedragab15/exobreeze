"use client";
import { ChartContainer } from "@/components/ui/chart";
import { chartData } from "@/data/dummyDate";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function LocationChart() {
  return (
    <div className="space-y-4 w-full">
      <h3 className="text-lg font-semibold">DAILY AQI READINGS</h3>
      <ChartContainer
        config={{
          value: {
            label: "AQI",
            color: "#3b82f6",
          },
        }}
        className="h-80 w-full"
      >
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
          <YAxis domain={[0, 200]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-md">
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-sm">AQI: {payload[0].value}</div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
