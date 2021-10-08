import React from 'react'
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from 'mdbreact'

interface Props {
  data: Integration[]
  onEdit(integration: Integration): void
  onDelete(integration: Integration): void
}

const IntegrationsTable: React.FC<Props> = ({ data, onEdit, onDelete }) => (
  <MDBTable className='align-middle'>
    <colgroup>
      <col width='auto' />
      <col width='auto' />
      <col width='auto' />
      <col width='auto' />
      <col width='110px' />
    </colgroup>
    <MDBTableHead>
      <tr>
        <th>Name</th>
        <th>Integration Type</th>
        <th>Account</th>
        <th>AccountID / ListID</th>
        <th />
      </tr>
    </MDBTableHead>
    <MDBTableBody>
      {data.map(row => (
        <tr key={row.id}>
          <td>{row.name}</td>
          <td>{row.partner}</td>
          <td>{row.accountName}</td>
          <td>{row.accountId || row.apiKey}</td>
          <td>
            <MDBBtn
              size='sm'
              color='success'
              className='m-0 mr-2'
              floating={true}
              onClick={() => {
                onEdit(row)
              }}
            >
              <MDBIcon icon='pen' size='sm' />
            </MDBBtn>

            <MDBBtn
              size='sm'
              color='danger'
              className='m-0'
              onClick={() => {
                onDelete(row)
              }}
              floating={true}
            >
              <MDBIcon icon='trash' size='sm' />
            </MDBBtn>
          </td>
        </tr>
      ))}
    </MDBTableBody>
  </MDBTable>
)

export default IntegrationsTable
