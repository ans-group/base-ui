import { addParameters, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'

addParameters({
  options: {
    showPanel: true
  }
})

addDecorator(withInfo)
addDecorator(withKnobs)
addDecorator(withA11y)
