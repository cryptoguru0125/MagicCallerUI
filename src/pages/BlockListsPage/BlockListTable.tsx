import React from 'react'
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBIcon } from 'mdbreact'

interface Props {
  data: BlockList[]
  onDelete(integration: BlockList): void
}

const BlockListTable: React.FC<Props> = ({ data, onDelete }) => (
  <MDBTable className='align-middle'>
    <colgroup>
      <col width='auto' />
      <col width='auto' />
      <col width='auto' />
      <col width='110px' />
    </colgroup>
    <MDBTableHead>
      <tr>
        <th>ID</th>
        <th>Type</th>
        <th>Blocked Content</th>
        <th />
      </tr>
    </MDBTableHead>
    <MDBTableBody>
      {data.map(row => (
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row.type}</td>
          <td>{row.content}</td>
          <td className='text-right'>
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

export default BlockListTable
