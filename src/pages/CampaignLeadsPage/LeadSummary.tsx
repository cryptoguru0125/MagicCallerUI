import React from 'react'
import { useSelector } from 'react-redux'
import { MDBCard, MDBCardBody } from 'mdbreact'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

import { percent, percentValue } from 'utils'
import { selectLeadCharts } from 'store/leads/reducer'
import classes from './LeadSummary.module.scss'

const LeadSummary: React.FC = () => {
  const leadChart = useSelector(selectLeadCharts)
  const { summary, chartFormat, charts } = leadChart

  const labels = []
  const leadData = []
  const transferData = []
  const contactData = []
  const transferRateData = []
  const contactRateData = []

  if (chartFormat === 'daily') {
    for (let i = 29; i >= 0; i -= 1) {
      const date = moment().subtract(i, 'days')
      const dateStr = date.format('YYYY-MM-DD')

      const chartData = charts.find(item => item.date === dateStr)
      labels.push(date.format('MM/DD'))
      leadData.push(chartData ? chartData.leads : 0)

      transferData.push(chartData ? chartData.transferred : 0)
      contactData.push(chartData ? chartData.contacted : 0)

      transferRateData.push(
        percentValue(
          leadData[leadData.length - 1],
          transferData[transferData.length - 1]
        )
      )
      contactRateData.push(
        percentValue(
          leadData[leadData.length - 1],
          contactData[contactData.length - 1]
        )
      )
    }
  } else {
    for (let i = 0; i < 24; i += 1) {
      const dateStr = `${i}`.padStart(2, '0')

      const chartData = charts.find(item => item.date === dateStr)
      labels.push(dateStr)
      leadData.push(chartData ? chartData.leads : 0)

      contactData.push(chartData ? chartData.contacted : 0)
      transferData.push(chartData ? chartData.transferred : 0)

      transferRateData.push(
        percentValue(
          leadData[leadData.length - 1],
          transferData[transferData.length - 1]
        )
      )
      contactRateData.push(
        percentValue(
          leadData[leadData.length - 1],
          contactData[contactData.length - 1]
        )
      )
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
          id: 'y-axis-0',
          ticks: {
            suggestedMin: 0, // minimum will be 0, unless there is a lower value.
            beginAtZero: true, // minimum value will be 0.
            min: 0,
          },
        },
        {
          id: 'y-axis-1',
          gridLines: {
            drawOnChartArea: false,
          },
          position: 'right',
          ticks: {
            suggestedMin: 0, // minimum will be 0, unless there is a lower value.
            beginAtZero: true, // minimum value will be 0.
            min: 0,
            max: 100,
            callback: function(value) {
              return `${value}%`
            },
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label(tooltipItem) {
          if (tooltipItem.datasetIndex === 0) {
            return tooltipItem.yLabel
          } else if (tooltipItem.datasetIndex === 1) {
            return `${tooltipItem.yLabel}% (${contactData[tooltipItem.index]})`
          } else {
            return `${tooltipItem.yLabel}% (${transferData[tooltipItem.index]})`
          }
        },
      },
    },
  }
  const data = {
    labels,
    datasets: [
      {
        yAxisID: 'y-axis-0',
        label: 'Leads',
        fill: false,
        borderColor: 'rgb(146,195,125)',
        lineTension: 0,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        data: leadData,
      },
      {
        yAxisID: 'y-axis-1',
        label: 'Contact Rate',
        fill: false,
        lineTension: 0,
        borderColor: 'rgb(253,126,20)',
        pointBackgroundColor: '#fff',
        pointRadius: 4,
        pointBorderWidth: 2,
        data: contactRateData,
      },
      {
        yAxisID: 'y-axis-1',
        label: 'Transfer Rate',
        fill: false,
        lineTension: 0,
        borderColor: 'rgb(180,167,214)',
        pointBackgroundColor: '#fff',
        pointRadius: 4,
        pointBorderWidth: 2,
        data: transferRateData,
      },
    ],
  }

  return (
    <MDBCard>
      <MDBCardBody>
        <div className={`${classes.summary} px-5 mb-3`}>
          <div>
            <label>Leads</label>
            <div>{summary.leads || 0}</div>
          </div>

          <div>
            <label>Transfers</label>
            <div>{summary.transferred || 0}</div>
          </div>

          <div>
            <label>Removals</label>
            <div>{summary.removed || 0}</div>
          </div>

          <div>
            <label>Transfer Rate</label>
            <div>{`${percent(summary.leads, summary.transferred)}`}</div>
          </div>

          <div>
            <label>Removal Rate</label>
            <div>{`${percent(summary.leads, summary.removed)}`}</div>
          </div>
        </div>

        <div style={{ height: 400 }}>
          <Line data={data} options={options} />
        </div>
      </MDBCardBody>
    </MDBCard>
  )
}

export default LeadSummary
