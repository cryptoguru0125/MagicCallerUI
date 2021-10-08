import React from 'react'
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBSwitch,
  MDBBtn,
  MDBIcon,
} from 'mdbreact'

type Props = {
  data: PhoneNumber[],
  onActiveChange(number: PhoneNumber, active: boolean):void,
  onDelete(number: PhoneNumber):void,
}


const NumbersTable: React.FC<Props> = ({ data, onDelete, onActiveChange }) => (
  <MDBTable className="align-middle">
    <colgroup>
      <col width="72px" />
      <col width="auto" />
      <col width="auto" />
      <col width="auto" />
      <col width="auto" />
      <col width="auto" />
      <col width="auto" />
      <col width="auto" />
      <col width="70px" />
    </colgroup>
    <MDBTableHead>
      <tr>
        <th />
        <th>Number</th>
        <th>Source</th>
        <th>Calls</th>
        <th>Answers</th>
        <th>Answer</th>
        <th>Transfers</th>
        <th>Removals</th>
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
          <td>{row.number}</td>
          <td>{row.source}</td>
          <td>{row.calls || 0}</td>
          <td>{row.answers || 0}</td>
          <td>{row.calls ? Math.round((row.answered || 0) / row.calls * 100) : 0}%</td>
          <td>{row.transferred || 0}</td>
          <td>{row.removed || 0}</td>
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


export default NumbersTable
