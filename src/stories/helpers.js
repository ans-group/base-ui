import { action } from '@storybook/addon-actions'

export const changeAction = action('onChange')
export const clickAction = action('clicked')
export const selectAction = action('onSelect')
export const keyUpAction = action('onKeyUp')
export const submitAction = action('onSubmit')
clickAction.toString = () => "action('clicked')"
changeAction.toString = () => "action('onChange')"
keyUpAction.toString = () => "action('onKeyUp')"
submitAction.toString = () => "action('onSubmit')"
selectAction.toString = () => "action('onSelect')"
