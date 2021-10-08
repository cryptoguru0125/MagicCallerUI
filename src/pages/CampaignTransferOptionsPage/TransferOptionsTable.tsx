import React from 'react'
import { Link } from 'react-router-dom'
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBIcon,
} from 'mdbreact'

import {formatDate} from 'utils'

interface Props {
  data: TransferOption[],
  onEdit(number: TransferOption): void,
  onDelete(number: TransferOption): void,
}

const TransferOptionsTable:React.FC<Props> = ({ data, onEdit, onDelete }) => (
  <MDBTable className="align-middle">
    <colgroup>
      <col width="auto" />
      <col width="auto" />
      <col width="150px" />
      <col width="120px" />
    </colgroup>
    <MDBTableHead>
      <tr>
        <th>Transfer Options</th>
        <th># of Lines</th>
        <th>Created</th>
        <th />
      </tr>
    </MDBTableHead>
    <MDBTableBody>
      {data.map(row => (
        <tr key={row.id}>
          <td>
            <Link
              className="text-link"
              to={`/campaigns/${row.CampaignId}/transfer-options/${row.id}`}
            >
              {row.name}
            </Link>
          </td>
          <td>{row.numbersCount || 0}</td>
          <td>{formatDate(row.createdAt, 'MM/DD/YYYY')}</td>
          <td className="text-right">
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



export default TransferOptionsTable
