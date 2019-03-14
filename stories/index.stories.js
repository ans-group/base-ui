import React from 'react'
import 'normalize.css'
import '../src/styles/global.scss'
import copyCodeBlock from '@pickra/copy-code-block'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, text, boolean, number, array, select } from '@storybook/addon-knobs'

import Button from '../src/components/Button'
import Input from '../src/components/Input'
import Checkbox from '../src/components/Checkbox'
import Select from '../src/components/Select'
import Radios from '../src/components/Radios'

const buttonSizes = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
  XLarge: 'xlarge'
}

const iconOptions = {
  None: null,
  Alert: 'AlertCircle',
  User: 'User',
  ThumbsUp: 'ThumbsUp',
  XCircle: 'XCircle',
  Lock: 'Lock'
}

storiesOf('User Input|Button', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Button
      size={select('Size', buttonSizes, 'default')}
      icon={select('Icon', iconOptions, null)}
      outline={boolean('Outline', false)}
      onClick={action('clicked')}
      disabled={boolean('Disabled', false)}
      loading={boolean('Loading', false)}>
      Click Me
    </Button>))
  .add('loading', () => (
    <Button loading={boolean('Loading', true)}>
      Log in
    </Button>))
  .add('disabled', () => (
    <Button disabled={boolean('Disabled', true)}>
      Submit
    </Button>))
  .add('with icon & text', () => (
    <Button icon={text('Icon', 'User')}>
      Sign up
    </Button>))
  .add('icon only', () => (
    <Button icon={text('Icon', 'Lock')} />
  ))
  .add('different sizes', () => (
    <React.Fragment>
      <Button size="small" style={{ marginRight: 10 }}>
        small
      </Button>
      <Button size="default" style={{ marginRight: 10 }}>
        default
      </Button>
      <Button size="large" style={{ marginRight: 10 }}>
        large
      </Button>
      <Button size="xlarge">
        xlarge
      </Button>
    </React.Fragment>
  ))
  .add('outline', () => (
    <Button outline={boolean('Outline', true)} onClick={action('clicked')}>
      Click Me
    </Button>))

storiesOf('User Input|Input', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <Input
      placeholder={text('Placeholder', 'Enter some text')}
      icon={select('Icon', iconOptions, null)}
      tabBefore={text('Tab Before', null)}
      tabAfter={text('Tab After', null)}
      type={text('Type', 'text')}
      disabled={boolean('Disabled', false)}
      loading={boolean('Loading', false)} />))
  .add('with icon', () => (
    <Input icon="Search" placeholder={text('Placeholder', 'Enter some text')} type="search" />))
  .add('tab before', () => (
    <Input tabBefore={text('Tab Text', '£')} placeholder="Price" type="tel" />))
  .add('tab after', () => (
    <Input tabAfter={text('Tab Text', '@ansgroup.co.uk')} placeholder="Email address" type="email" />))
  .add('disabled', () => (
    <Input disabled={boolean('Disabled', true)} placeholder="why can't I type?" />))
  .add('loading', () => (
    <Input loading={boolean('Loading', true)} placeholder="Searching..." />))

storiesOf('User Input|Checkbox', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <Checkbox checked={boolean('Checked', false)}>
      Check this out (get it?)
    </Checkbox>))
  .add('disabled', () => (
    <Checkbox disabled={boolean('Disabled', true)} checked={boolean('Checked', false)}>
      Solve world hunger
    </Checkbox>))

storiesOf('User Input|Radios', module)
  .addDecorator(withKnobs)
  .add('button style', () => (
    <Radios options={['Apples', 'Bananas', 'Grapes']} onChange={action('onChange')} />
  ))
  .add('radio style', () => (
    <Radios type="radio" options={['Apples', 'Bananas', 'Grapes']} onChange={action('onChange')} />
  ))
  .add('controlled value', () => (
    <Radios options={['Apples', 'Bananas', 'Grapes']} onChange={action('onChange')} value={select('Value', ['Apples', 'Bananas', 'Grapes'], 'Apples')} />
  ))
  .add('disabled', () => (
    <Radios
      type={select('Type', ['radio', 'button'], 'radio')}
      disabled={true}
      options={['Apples', 'Bananas', 'Grapes']}
      onChange={action('onChange')} />
  ))

storiesOf('User Input|Select', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <Select
      onChange={action('onChange')}
      placeholder={text('Placeholder', 'Pick a fruit')}
      options={array('Options', ['Apples', 'Bananas', 'Grapes'])}
      searchable={boolean('Searchable', false)}
      disabled={boolean('Disabled', false)}
      loading={boolean('Loading', false)}
      multiple={boolean('Multiple', false)} />))
  .add('searchable', () => (
    <Select
      onKeyUp={action('onKeyUp')}
      onChange={action('onChange')}
      searchable
      placeholder="Try typing..."
      options={['Apples', 'Bananas', 'Grapes']} />))
  .add('multiple select', () => (
    <Select
      onChange={action('onChange')}
      searchable
      multiple
      placeholder="Pick some fruits"
      options={['Apples', 'Bananas', 'Grapes', 'Melons', 'Pears', 'Kiwis']} />))
  .add('allow adding custom items', () => (
    <Select
      onChange={action('onChange')}
      multiple
      searchable
      allowCustom
      placeholder="Pick some fruits"
      options={['Apples', 'Bananas', 'Grapes', 'Melons', 'Pears', 'Kiwis']} />))
  .add('loading', () => (
    <Select loading placeholder="Thinking..." options={['Apples', 'Bananas']} />))
  .add('disabled', () => (
    <Select disabled placeholder="No Touching" options={['Apples', 'Bananas']} />))
