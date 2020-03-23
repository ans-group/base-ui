import React, {useState} from 'react'
import dedent from 'dedent'
import faker from 'faker'
import moment from 'moment'
import { boolean } from '@storybook/addon-knobs'
import 'normalize.css'
import '../styles/global.scss'
import { selectAction } from './helpers'
import Button from '../components/Button'
import { useToast, withToastProvider } from '../components/Toast'

export default {
  title: 'Toast'
}

const successToast =  {
  status: "success",
  title: "We did it!",
  message: "Well done! We couldn't have done it without you"
}

const warningToast =  {
  status: "warning",
  title: "Something isn't right...",
  message: "I smell a rat"
}

const errorToast =  {
  status: "error",
  title: "Red alert!!",
  message: "Critical error in engine bay 4!"
}

const DefaultComponent = () => {
  const toast = useToast()
  const show = content => () => {
    toast.add(content)
  }
  return (
    <div>
      <Button style={{marginBottom: 20}} onClick={show(successToast)}>Success Toast</Button>
      <Button style={{marginBottom: 20}} onClick={show(warningToast)}>Warning Toast</Button>
      <Button onClick={show(errorToast)}>Error Toast</Button>
    </div>
  )
}

export const Default = withToastProvider(DefaultComponent)

