import { configure, addParameters, addDecorator } from '@storybook/react'
const { withPropsTable } = require('storybook-addon-react-docgen')

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)
function loadStories () {
  req.keys().forEach(filename => req(filename))
}

addDecorator(withPropsTable)
addParameters({ viewport: {} })

configure(loadStories, module)
