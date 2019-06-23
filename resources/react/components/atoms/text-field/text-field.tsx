import React from 'react'
import styled from 'styled-components'

const TextField = props => {
  const {
    field,
    form: { touched, errors },
  } = props

  return (
    <StyledTextField>
      <LabelName>{props.label}</LabelName>
      <Label>
        <StyledInput {...field} {...props} />
        {touched[field.name] && errors[field.name] && (
          <InvalidMessage>{errors[field.name]}</InvalidMessage>
        )}
      </Label>
    </StyledTextField>
  )
}

const StyledTextField = styled.div`
  margin-top: 16px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`
const LabelName = styled.div`
  font-size: 12px;
`
const Label = styled.label`
  display: block;
  margin-top: 8px;
  font-size: 12px;
`
const InvalidMessage = styled.p`
  margin-top: 8px;
  color: red;
  font-size: 11px;
`
const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`

export default TextField
