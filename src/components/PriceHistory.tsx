import { LineChart } from "@mui/x-charts";

export function PriceHistory() {
  return (
    <div className="w-[80%]">
      <div className="flex flex-row-reverse">
        <select>
          <option>last 7 days</option>
          <option>last 30 days</option>
          <option>last year</option>
        </select>
      </div>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        height={300}
      />
    </div>
  );
}
