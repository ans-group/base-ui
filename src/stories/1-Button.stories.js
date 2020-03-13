import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs'
import 'normalize.css'
import '../styles/global.scss'
import { clickAction } from './helpers'
import Button from '../components/Button'

const buttonSizes = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
  XLarge: 'xlarge'
}

const iconOptions = {
  Alert: 'AlertCircle',
  User: 'User',
  ThumbsUp: 'ThumbsUp',
  XCircle: 'XCircle',
  Lock: 'Lock'
}

export default {
  title: 'Button',
  component: Button,
};

export const Text = () => (
  <Button
      size={select('Size', buttonSizes, 'default')}
      icon={select('Icon', {   None: null, ...iconOptions }, null)}
      outline={boolean('Outline', false)}
      white={boolean('White', false)}
      onClick={clickAction}
      disabled={boolean('Disabled', false)}
      loading={boolean('Loading', false)}>
      Click Me
    </Button>
)

export const IconOnly = () => (
  <Button 
      size={select('Size', buttonSizes, 'default')}
      icon={select('Icon', iconOptions, 'ThumbsUp')}
      outline={boolean('Outline', false)}
      disabled={boolean('Disabled', false)}
      loading={boolean('Loading', false)}
  />
);
