import React from 'react'
import { Link } from 'react-router-dom'
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBSwitch,
  MDBBtn,
  MDBIcon,
} from 'mdbreact'

import { formatDate, percent } from 'utils'

type Props = {
  data: Campaign[]
  onActiveChange(campaign: Campaign, active: boolean): void
  onDelete(campaign: Campaign): void
}

const CampaignsTable: React.FC<Props> = ({
  data,
  onDelete,
  onActiveChange,
}) => (
  <MDBTable className="align-middle">
    <colgroup>
      <col width="72px" />
      <col width="auto" />
      <col width="12%" />
      <col width="12%" />
      <col width="12%" />
      <col width="12%" />
      <col width="12%" />
      <col width="110px" />
    </colgroup>
    <MDBTableHead>
      <tr>
        <th />
        <th>Name</th>
        <th>Date Created</th>
        <th>Total Leads</th>
        <th>Dialed</th>
        <th>Contacted</th>
        <th>Transferred</th>
        <th>Transfer Rate</th>
        <th />
      </tr>
    </MDBTableHead>
    <MDBTableBody>
      {data.map(row => (
        <tr key={row.id}>
          <td className="px-0">
            <MDBSwitch
              className="m-0"
              checked={row.active}
              onChange={e => {
                onActiveChange(row, e.target.checked)
              }}
              labelLeft=""
              labelRight=""
            />
          </td>
          <td>{row.name}</td>
          <td>{formatDate(row.createdAt, 'MMM DD, YYYY')}</td>
          <td>{row.totalLeads || 0}</td>
          <td>{row.dialed || 0}</td>
          <td>{row.contacted || 0}</td>
          <td>{row.transferred || 0}</td>
          <td>{percent(row.totalLeads, row.transferred)}</td>
          <td>
            <MDBBtn
              tag={Link}
              size="sm"
              color="success"
              className="m-0 mr-2"
              to={`/campaigns/${row.id}`}
              floating
            >
              <MDBIcon icon="pen" size="sm" />
            </MDBBtn>

            <MDBBtn
              size="sm"
              color="danger"
              className="m-0"
              onClick={() => {
                onDelete(row)
              }}
              floating
            >
              <MDBIcon icon="trash" size="sm" />
            </MDBBtn>
          </td>
        </tr>
      ))}
    </MDBTableBody>
  </MDBTable>
)

export default CampaignsTable
