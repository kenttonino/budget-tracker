import { Doughnut } from 'react-chartjs-2';

export default function Chart({ categoryName, amount }) {
  return (
    <Doughnut
      redraw={false}
      data={{
        datasets: [{
          data: [
            categoryName,
            amount
          ],
          backgroundColor: [
            "red",
            "black",
          ]
        }],
        labels: [
          "Category Name",
          "Amount"
        ]
      }}
    />
  );
};