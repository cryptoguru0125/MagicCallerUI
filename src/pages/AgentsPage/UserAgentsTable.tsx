import React from 'react'
import { MDBBtn, MDBIcon } from 'mdbreact'

type Props = {
  data: User[]
  onEdit(agent: User): void
  onDelete(agent: User): void
}

const UserAgentsTable: React.FC<Props> = ({ data, onEdit, onDelete }) => (
  <React.Fragment>
    {data.map(row => (
      <tr key={row.id}>
        <td>{row.fullName}</td>
        <td>Internal</td>
        <td>{row.email}</td>
        <td>
          <MDBBtn
            size="sm"
            color="success"
            className="m-0 mr-2"
            floating
            onClick={() => {
              onEdit(row)
            }}
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
  </React.Fragment>
)

export default UserAgentsTable
