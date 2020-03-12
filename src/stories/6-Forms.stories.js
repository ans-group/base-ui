import React from 'react'
import { action } from '@storybook/addon-actions'
import { text, boolean, number, array, select } from '@storybook/addon-knobs'
import 'normalize.css'
import '../styles/global.scss'
import { changeAction, submitAction } from './helpers'
import Form, { Field } from '../components/Form'
import Input from '../components/Input'
import Button from '../components/Button'

export default {
  title: 'Form',
  component: Form,
}

export const Default = () => (
    <Form onSubmit={submitAction} onChange={changeAction}>
      <Field validations={['isEmail']} label="Email">
        <Input
          type="email"
          icon="Mail"
          placeholder="Email Address"
          name="email" />
      </Field>
      <Field validations={['required']} label="Password">
        <Input
          type="password"
          icon="Lock"
          placeholder="Password"
          name="password" />
      </Field>
      <Button type="submit">
        Log In
      </Button>
    </Form>
)

Default.story = {
  name: "Login Example"
}

export const ValidationExample = () => (
      <Form onSubmit={submitAction} onChange={changeAction}>
      <Field validations={['isBefore', { options: [/(\d{2}\/){2}\d{4}/], rule: 'matches' }]} label="Date of birth (future dates will also fail)">
        <Input
          placeholder="dd/mm/yyyy"
          type="text"
          format={{ date: true, datePattern: ['d', 'm', 'Y'], delimiter: '/' }}
          name="dob" />
      </Field>
      <Field label="Your Name">
        <Input type="text" name="name" />
      </Field>
      <Button type="submit">
        Submit
      </Button>
    </Form>
)

ValidationExample.story = {
  name: "Validating Data"
}
