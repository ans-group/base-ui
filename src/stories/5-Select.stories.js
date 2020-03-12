import React from 'react'
import { action } from '@storybook/addon-actions'
import { text, boolean, number, array, select } from '@storybook/addon-knobs'
import 'normalize.css'
import '../styles/global.scss'
import { changeAction, keyUpAction } from './helpers'
import Select from '../components/Select'

export default {
  title: 'Select',
  component: Select,
}

export const Default = () => (
    <Select
      onChange={changeAction}
      placeholder={text('Placeholder', 'Pick a fruit')}
      options={array('Options', ['Apples', 'Bananas', 'Grapes'])}
      searchable={boolean('Searchable', false)}
      disabled={boolean('Disabled', false)}
      loading={boolean('Loading', false)}
      multiple={boolean('Multiple', false)} />
)

export const Searchable = () => (
  <Select
    onKeyUp={keyUpAction}
    onChange={changeAction}
    searchable
    placeholder="Try typing..."
    options={['Apples', 'Bananas', 'Grapes']} />
)

export const MultiSelect = () => (
  <Select
    onChange={changeAction}
    searchable
    multiple
    placeholder="Pick some fruits"
    options={['Apples', 'Bananas', 'Grapes', 'Melons', 'Pears', 'Kiwis']} />
)

export const AddItems = () => (
  <Select
    onChange={changeAction}
    multiple
    searchable
    allowCustom
    placeholder="Pick some fruits"
    options={['Apples', 'Bananas', 'Grapes', 'Melons', 'Pears', 'Kiwis']} />
)

