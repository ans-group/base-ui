import { addParameters, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'

addParameters({
  options: {
    backgrounds: [
      { name: 'Light', value: '#fff', default: true},
      { name: 'Dark', value: '#1e1e1e' }
    ],
    showPanel: true
  }
})

addDecorator(withInfo)
addDecorator(withKnobs)
addDecorator(withA11y)
