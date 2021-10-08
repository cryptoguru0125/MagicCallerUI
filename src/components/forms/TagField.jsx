import React from 'react'
import PropTypes from 'prop-types'
import ReactTags from 'react-tag-autocomplete'
import { MDBChip } from 'mdbreact'
import './TagField.scss'

const Chip = ({ tag, onDelete }) => (
  <MDBChip waves close handleClose={onDelete}>
    {tag.name}
  </MDBChip>
)
Chip.propTypes = {
  onDelete: PropTypes.func,
  tag: PropTypes.shape({
    name: PropTypes.string,
  }),
}

class TagField extends React.Component {
  constructor(props) {
    super(props)
    this.state = { options: this.formatOptions(props.options), focus: false }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      this.setState({ options: this.formatOptions(nextProps.options) })
    }
  }

  formatOptions = options => {
    if (!options) return []

    const { valueKey, labelKey } = this.props

    return options.map(item => ({
      id: item[valueKey],
      name: item[labelKey],
    }))
  }

  handleDelete = i => {
    const { value, onChange } = this.props.input
    const updated = value.filter((item, index) => index !== i)

    onChange(updated)
  }

  handleAddition = tag => {
    const {
      input: { value, onChange },
    } = this.props
    const updated = [...(value || []), tag.id]
    onChange(updated)
  }

  handleFocus = () => {
    this.setState({ focus: true })
  }

  handleBlur = () => {
    this.setState({ focus: false })
  }

  render() {
    const {
      label,
      input,
      meta: { touched, error },
    } = this.props

    const value = input.value || []
    const { options, focus } = this.state
    const tags = options.filter(item => value.indexOf(item.id) >= 0)
    const suggestions = options.filter(item => value.indexOf(item.id) === -1)

    return (
      <div className={`tags-container ${focus && 'focus'} md-form`}>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleFocus={this.handleFocus}
          handleBlur={this.handleBlur}
          tagComponent={Chip}
          minQueryLength={0}
          placeholder={tags.length ? 'Add item' : ''}
          autofocus={false}
        />
        <label className={focus || tags.length ? 'active fadeIn' : ''}>
          {label}
        </label>
        {touched && error && (
          <div className="invalid-feedback d-block">{error}</div>
        )}
      </div>
    )
  }
}

TagField.defaultProps = {
  labelKey: 'name',
  valueKey: 'id',
}

TagField.propTypes = {
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.array,
  }),
  options: PropTypes.array,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
}

export default TagField
