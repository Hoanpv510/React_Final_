import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import axios from "axios";

const LineChart = () => {
  const [chart, setChart] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://wlp.howizbiz.com/api/dashboard/user/frequency-view?type=7days"
      )
      .then((response) => {
        const dataArray = response.data; // Trích xuất mảng từ thuộc tính "data"
        setChart(dataArray);
        // setMyUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // const defaultChart = [0, 2, 4, 6, 8, 10, 12];

  const data = {
    labels: chart?.user?.data?.map((x) => x.date),
    datasets: [
      {
        label: `Người dùng (${chart?.user?.total_current})`,
        data: chart?.user?.data?.map((x) => x.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
      {
        label: `Session (${chart?.session?.total_current})`,
        data: chart?.session?.data?.map((x) => x.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    // reponsive: true,
    // maintainAspectRatio: false,
    // scales: {},
    // legend: {
    //   labels: {
    //     fontSize: 25,
    //   },
    // },
  };

  return (
    <div className="linechart">
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default LineChart;
