import React from 'react'
import { boolean } from '@storybook/addon-knobs'
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
      partial={boolean('Partial', false)}
      disabled={boolean('Disabled', false)}
      >
      Check this out (get it?)
    </Checkbox>
)

