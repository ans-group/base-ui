import React from 'react'
import { action } from '@storybook/addon-actions'
import { text, boolean, number, array, select } from '@storybook/addon-knobs'
import 'normalize.css'
import '../styles/global.scss'
import { changeAction, clickAction } from './helpers'
import Checkbox from '../components/Checkbox'

export default {
  title: 'Checkbox',
  component: Checkbox,
}

export const Default = () => (
    <Checkbox 
      onChange={changeAction}
      onClick={clickAction}
      disabled={boolean('Disabled', false)}
      >
      Check this out (get it?)
    </Checkbox>
)

