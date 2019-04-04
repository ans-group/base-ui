import { configure, addParameters, addDecorator, setAddon } from '@storybook/react'
import { themes } from '@storybook/theming'
import LiveEdit, { setOptions } from 'storybook-addon-react-live-edit'
const { withPropsTable } = require('storybook-addon-react-docgen')

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/)
function loadStories () {
  req.keys().forEach(filename => req(filename))
}

// setOptions({ theme: 'darcula', presets: ['react'] })
// setAddon(LiveEdit)

addDecorator(withPropsTable)

addParameters({
  backgrounds: [
    { name: 'white', value: '#f6f6f6', default: true}
  ],
  options: {
    name: 'ANS Base UI',
    theme: themes.dark
  }
})

configure(loadStories, module)
