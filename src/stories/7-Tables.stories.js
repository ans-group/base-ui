import React, {useState} from 'react'
import dedent from 'dedent'
import faker from 'faker'
import moment from 'moment'
import { boolean } from '@storybook/addon-knobs'
import 'normalize.css'
import '../styles/global.scss'
import { selectAction } from './helpers'
import Table from '../components/Table'
import Pagination from '../components/Pagination'

export default {
  title: 'Table',
  component: Table,
}

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

export const Default = () => (
  <Table
    columns={tableCols}
    data={tableData}
    loading={boolean('Loading', false)}
    sortable={boolean('Sortable', true)} />
)

export const Selectable = () => (
    <Table columns={tableCols} data={tableData} onSelect={selectAction} />
)

export const WithPagination = () => (
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
)
