import React, { createRef, cloneElement } from 'react'
import flatten from 'lodash/flatten'
import compact from 'lodash/compact'
import propTypes from 'prop-types'
import Field from './Form/Field'

class Form extends React.Component {
  constructor(props) {
    super(props)
    const { initialValues, refs, children } = this.parseChildren(this.props.children)
    this.state = {
      values: initialValues,
      refs,
      children
    }
  }

  augmentChild = (child, key) => {
    if (!child || !child.type || child.type.name !== 'Field') {
      return { child }
    }
    const thisRef = createRef()
    return {
      child: cloneElement(child, {
        onChange: this.handleFieldChange(child),
        form: this,
        key,
        thisRef
      }),
      ref: thisRef
    }
  }

  addInitialValue = (child, initialValues) => {
    if (child.props.children && !Array.isArray(child.props.children) && child.props.children.props && child.props.children.props.name) {
      initialValues[child.props.children.props.name] = child.props.children.props.value || child.props.children.props.defaultValue || ''
    }
    return initialValues
  }

  parseChildren = (children, initialValues = {}, augmentedChildren = [], refs = [], i = 0) => {
    if (!children || !Array.isArray(children)) return { children, initialValues, refs }
    if (!children[i]) return { children: augmentedChildren, initialValues, refs }
    const child = children[i]
    const newInitialValues = this.addInitialValue(child, initialValues)
    const { child: augmentedChild, ref } = this.augmentChild(child, i)
    augmentedChildren.push(augmentedChild)
    if (ref) refs.push(ref)
    return this.parseChildren(children, newInitialValues, augmentedChildren, refs, i + 1)
  }

  handleFieldChange = child => e => {
    this.setState({ values: { ...this.state.values, [e.target.name]: e.target.value } })
    if (child.props.onChange) {
      child.props.onChange(e)
    }
  }

  validateAll = silent => compact(flatten(this.state.refs.map(ref => ref.current && ref.current(silent))))

  submit = event => this.handleSubmit(this.props.onSubmit)(event)

  handleSubmit = onSubmit => event => {
    if (event) {
      event.preventDefault()
    }
    const warnings = this.validateAll()
    if (onSubmit) {
      onSubmit({
        values: this.state.values,
        valid: warnings.length < 1,
        warnings,
        event
      })
    }
  }

  handleChange = onChange => event => {
    const warnings = this.validateAll('silent')
    if (onChange) {
      onChange({
        values: this.state.values,
        valid: warnings.length < 1,
        warnings,
        event
      })
    }
  }

  render() {
    const { children, onChange, onSubmit, ...otherProps } = this.props
    return (
      <form onChange={this.handleChange(onChange)} onSubmit={this.handleSubmit(onSubmit)} {...otherProps}>
        {this.state.children}
      </form>
    )
  }
}

Form.propTypes = {
  /** modified onChange event, callback({values, event, warnings, valid}) */
  onChange: propTypes.func,
  /** modified onSubmit event, callback({values, event, warnings, valid}) */
  onSubmit: propTypes.func
}

export { Field }

export default Form
