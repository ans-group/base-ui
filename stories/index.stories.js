import React, { useState } from 'react'
import 'normalize.css'
import '../src/styles/global.scss'
import copyCodeBlock from '@pickra/copy-code-block'
import faker from 'faker/locale/en_GB'
import moment from 'moment'
import dedent from 'dedent'

import { storiesOf, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { jsxDecorator } from 'storybook-addon-jsx'
import { withKnobs, text, boolean, number, array, select } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'

import Button from '../src/components/Button'
import Input from '../src/components/Input'
import Checkbox from '../src/components/Checkbox'
import Select from '../src/components/Select'
import Radios from '../src/components/Radios'
import Form, { Field } from '../src/components/Form'
import Table from '../src/components/Table'
import Pagination from '../src/components/Pagination'

addDecorator(jsxDecorator)
addDecorator(withKnobs)
addDecorator(withA11y)

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

const changeAction = action('onChange')
const clickAction = action('clicked')
const selectAction = action('onSelect')
const keyUpAction = action('onKeyUp')
const submitAction = action('onSubmit')
clickAction.toString = () => "action('clicked')"
changeAction.toString = () => "action('onChange')"
keyUpAction.toString = () => "action('onKeyUp')"
submitAction.toString = () => "action('onSubmit')"
selectAction.toString = () => "action('onSelect')"

storiesOf('User Input|Button', module)
  .add('default', () => (
    <Button
      size={select('Size', buttonSizes, 'default')}
      icon={select('Icon', iconOptions, null)}
      outline={boolean('Outline', false)}
      onClick={clickAction}
      disabled={boolean('Disabled', false)}
      loading={boolean('Loading', false)}>
      Click Me
    </Button>), { base: 'dark' })
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
      <Button size="small" style={{ marginRight: 10 }} inline={true}>
        small
      </Button>
      <Button size="default" style={{ marginRight: 10 }} inline={true}>
        default
      </Button>
      <Button size="large" style={{ marginRight: 10 }} inline={true}>
        large
      </Button>
      <Button size="xlarge" inline={true}>
        xlarge
      </Button>
    </React.Fragment>
  ))
  .add('outline', () => (
    <Button outline={boolean('Outline', true)} onClick={action('clicked')}>
      Click Me
    </Button>))

Input.toString = () => 'Input'

storiesOf('User Input|Input', module)
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
  .add('auto formatting', () => (
    <React.Fragment>
      <div>
        <Input format={{ creditCard: true }} placeholder="Credit Card Number" type="text" />
      </div>
      <div>
        <Input
          style={{ width: 65, marginTop: 10 }}
          format={{ date: true, datePattern: ['d', 'm'] }}
          placeholder="Expiry"
          type="text" />
      </div>
    </React.Fragment>))
  .add('disabled', () => (
    <Input disabled={boolean('Disabled', true)} placeholder="why can't I type?" />))
  .add('loading', () => (
    <Input loading={boolean('Loading', true)} placeholder="Searching..." />))

Checkbox.toString = () => 'Checkbox'
storiesOf('User Input|Checkbox', module)
  .add('basic', () => (
    <Checkbox>
      Check this out (get it?)
    </Checkbox>))
  .add('controlled', () => (
    <Checkbox checked={boolean('Checked', false)}>
      Control me via the knobs tab
    </Checkbox>))
  .add('disabled', () => (
    <Checkbox disabled={boolean('Disabled', true)} checked={boolean('Checked', false)}>
      Solve world hunger
    </Checkbox>))

Radios.toString = () => 'Radios'
storiesOf('User Input|Radios', module)
  .add('button style', () => (
    <Radios options={['Apples', 'Bananas', 'Grapes']} onChange={changeAction} />
  ))
  .add('radio style', () => (
    <Radios type="radio" options={['Apples', 'Bananas', 'Grapes']} onChange={changeAction} />
  ))
  .add('controlled value', () => (
    <Radios options={['Apples', 'Bananas', 'Grapes']} onChange={changeAction} value={select('Value', ['Apples', 'Bananas', 'Grapes'], 'Apples')} />
  ))
  .add('disabled', () => (
    <Radios
      type={select('Type', ['radio', 'button'], 'radio')}
      disabled={true}
      options={['Apples', 'Bananas', 'Grapes']}
      onChange={changeAction} />
  ))

Select.toString = () => 'Select'
storiesOf('User Input|Select', module)
  .add('basic', () => (
    <Select
      onChange={changeAction}
      placeholder={text('Placeholder', 'Pick a fruit')}
      options={array('Options', ['Apples', 'Bananas', 'Grapes'])}
      searchable={boolean('Searchable', false)}
      disabled={boolean('Disabled', false)}
      loading={boolean('Loading', false)}
      multiple={boolean('Multiple', false)} />))
  .add('searchable', () => (
    <Select
      onKeyUp={keyUpAction}
      onChange={changeAction}
      searchable
      placeholder="Try typing..."
      options={['Apples', 'Bananas', 'Grapes']} />))
  .add('multiple select', () => (
    <Select
      onChange={changeAction}
      searchable
      multiple
      placeholder="Pick some fruits"
      options={['Apples', 'Bananas', 'Grapes', 'Melons', 'Pears', 'Kiwis']} />))
  .add('allow adding custom items', () => (
    <Select
      onChange={changeAction}
      multiple
      searchable
      allowCustom
      placeholder="Pick some fruits"
      options={['Apples', 'Bananas', 'Grapes', 'Melons', 'Pears', 'Kiwis']} />))
  .add('loading', () => (
    <Select loading placeholder="Thinking..." options={['Apples', 'Bananas']} />))
  .add('disabled', () => (
    <Select disabled placeholder="No Touching" options={['Apples', 'Bananas']} />))

storiesOf('User Input|Forms', module)
  .add('login example', () => (
    <Form onSubmit={submitAction} onChange={changeAction}>
      <Field validations={['isEmail']}>
        <Input
          type="email"
          icon="Mail"
          placeholder="Email Address"
          name="email" />
      </Field>
      <Field validations={['required']}>
        <Input
          type="password"
          icon="Lock"
          placeholder="Password"
          name="password" />
      </Field>
      <Button type="submit">
        Log In
      </Button>
    </Form>))
  .add('date validation', () => (
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
    </Form>))

const tableData = new Array(50).fill(0).map((__, i) => {
  return {
    key: String(i),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    company: faker.company.companyName(),
    tel: faker.phone.phoneNumber(),
    joined: faker.date.past()
  }
})

const renderJoined = ({ joined }) => {
  return moment(joined).format('DD/MM/YYYY')
}
// eslint-disable-next-line
renderJoined.toString = () => "({ joined }) => moment(joined).format('DD/MM/YYYY')"
const renderFullName = ({ firstName, lastName }) => `${firstName} ${lastName}`
// eslint-disable-next-line
renderFullName.toString = () => '({ firstName, lastName }) => `${ firstName } ${ lastName }`'

const tableCols = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'name',
    render: renderFullName
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company'
  },
  {
    title: 'Phone Number',
    dataIndex: 'tel',
    key: 'phone'
  },
  {
    title: 'Date Added',
    dataIndex: 'joined',
    key: 'joined',
    render: renderJoined
  }
]

const PaginatedTable = () => {
  const [page, setPage] = useState(1)
  const pageSize = 5
  return (
    <div>
      <Table columns={tableCols} loadingBars={pageSize} data={tableData.slice((page - 1) * pageSize, pageSize * page)} />
      <Pagination total={tableData.length / pageSize} current={page} onChange={page => setPage(page)} />
    </div>
  )
}

storiesOf('Data Display|Table', module)
  .add('basic', () => (
    <Table
      columns={tableCols}
      data={tableData}
      loading={boolean('Loading', false)}
      sortable={boolean('Sortable', true)} />))
  .add('selectable', () => (
    <Table columns={tableCols} data={tableData} onSelect={selectAction} />))
  .add('paginated', () => (
    <div>
      <PaginatedTable />
      <div style={{ display: 'none' }}>
        {dedent`
          Storybook doesn't like hooks, but here's what's inside the component
          () => {
            const [page, setPage] = useState(1)
            const pageSize = 5
            return (
              <div>
                  <Table
                    columns={tableCols}
                    loadingBars={pageSize}
                    data={tableData.slice((page - 1) * pageSize, pageSize * page)}
                  />
                  <Pagination total={tableData.length / pageSize} current={page} onChange={page => setPage(page)} />
                </div>
            )
          }
        `}
      </div>
    </div>
  ))
  .add('loading', () => (
    <Table loading={true} columns={tableCols} data={tableData} />))
