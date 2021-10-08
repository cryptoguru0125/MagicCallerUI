import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { MDBTooltip, MDBBtn, MDBIcon } from 'mdbreact'

import './CopyText.scss'

interface Props {
  text: string
}

const CopyText = ({ text }: Props) => {
  const [tooltip, setTooltip] = useState('Copy')

  return (
    <div className='copy-text'>
      <input
        type='text'
        className='form-control'
        value={text}
        disabled={true}
      />
      <CopyToClipboard text={text} onCopy={() => setTooltip('Copied')}>
        <div className='copy-button' onMouseLeave={() => setTooltip('Copy')}>
          <MDBTooltip placement='top'>
            <MDBBtn color='white'>
              <MDBIcon far={true} icon='copy' />
            </MDBBtn>
            <div>{tooltip}</div>
          </MDBTooltip>
        </div>
      </CopyToClipboard>
    </div>
  )
}

export default CopyText
