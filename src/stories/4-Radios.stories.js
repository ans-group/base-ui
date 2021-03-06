import React from 'react'
import { array } from '@storybook/addon-knobs'
import 'normalize.css'
import '../styles/global.scss'
import { changeAction } from './helpers'
import Radios from '../components/Radios'

export default {
  title: 'Radios',
  component: Radios,
}

export const Default = () => (
    <Radios 
      options={array('Options', ['Apples', 'Bananas', 'Grapes'])}
      onChange={changeAction}
    />
)

