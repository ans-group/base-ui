import React from 'react'
import { text, boolean, select } from '@storybook/addon-knobs'
import 'normalize.css'
import '../styles/global.scss'
import { changeAction } from './helpers'
import Input from '../components/Input'

const iconOptions = {
  Alert: 'AlertCircle',
  User: 'User',
  ThumbsUp: 'ThumbsUp',
  XCircle: 'XCircle',
  Lock: 'Lock'
}

const inputTypes = {
  Text: 'text',
  Email: 'email',
  Textarea: 'textarea',
  Tel: 'tel'
}
;
export default {
  title: 'Input',
  component: Input,
}

export const Default = () => (
    <Input
      onChange={changeAction}
      label={text('Label', 'Input Label')}
      placeholder={text('Placeholder', 'Enter some text')}
      icon={select('Icon', { None: null, ...iconOptions }, null)}
      tabBefore={text('Tab Before', null)}
      tabAfter={text('Tab After', null)}
      type={select('Type', inputTypes, 'text')}
      disabled={boolean('Disabled', false)}
      loading={boolean('Loading', false)} />
)

