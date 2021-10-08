import React from 'react'
import { useSelector } from 'react-redux'
import { MDBCard, MDBCardBody } from 'mdbreact'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

import { selectTransferCharts } from 'store/transfers/reducer'
import classes from './TransferSummary.module.scss'
import { formatTime } from 'utils'

const TransferSummary: React.FC = () => {
  const transferChart = useSelector(selectTransferCharts)
  const { summary, charts } = transferChart

  const labels = []
  const transferData = []
  const durationData = []
  for (let i = 29; i >= 0; i -= 1) {
    const date = moment().subtract(i, 'days')
    const dateStr = date.format('YYYY-MM-DD')

    const chartData = charts.find(item => item.date === dateStr)
    labels.push(date.format('MM/DD'))
    transferData.push(chartData ? chartData.totalTransfers : 0)

    if (chartData && chartData.totalTransfers) {
      durationData.push(
        Math.round(chartData.totalDuration / chartData.totalTransfers)
      )
    } else {
      durationData.push(0)
    }
  }

  const options = {
    legend: {
      position: 'bottom',
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0, // minimum will be 0, unless there is a lower value.
            beginAtZero: true, // minimum value will be 0.
            min: 0,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label(tooltipItem) {
          if (tooltipItem.datasetIndex === 0) {
            return tooltipItem.yLabel
          } else {
            return `${tooltipItem.yLabel} secs`
          }
        },
      },
    },
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'Transfers',
        fill: false,
        borderColor: 'rgb(146,195,125)',
        lineTension: 0,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        data: transferData,
      },
      {
        label: 'Average Duration',
        fill: false,
        lineTension: 0,
        borderColor: 'rgb(180,167,214)',
        pointBackgroundColor: '#fff',
        pointRadius: 4,
        pointBorderWidth: 2,
        data: durationData,
      },
    ],
  }

  return (
    <MDBCard>
      <MDBCardBody>
        <div className={`${classes.summary} px-5 mb-3`}>
          <div>
            <label>Total Transfers</label>
            <div>{summary.totalTransfers || 0}</div>
          </div>

          <div>
            <label>Average Duration</label>
            <div>
              {summary.totalTransfers
                ? formatTime(summary.totalDuration / summary.totalTransfers)
                : 0}
            </div>
          </div>
        </div>

        <div style={{ height: 400 }}>
          <Line data={data} options={options} />
        </div>
      </MDBCardBody>
    </MDBCard>
  )
}

export default TransferSummary
