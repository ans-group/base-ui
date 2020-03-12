import React from 'react';

export default {
  title: 'Welcome',
}

export const Intro = () => (
  <div>
    <h1 style={{fontSize: 25}}>ANS Digital Framework</h1>
    <p style={{maxWidth: 600}}>ANS Digial Framework is a suit of (React) components and patterns that embody the ANS Digital Design Language and allow developers to quickly create ANS-branded user interfaces.</p>
    <p style={{maxWidth: 600}}>Use the menu on the left to preview different components.</p>
  </div>
)

Intro.story = {
  parameters: {
    options: {
      showPanel: false
    },
    info: {
      disable: true
    },
    a11y: {
      disabled: true
    },
    actions: {
      disabled: true
    },
    knobs: {
      disabled: true
    }
  }
}

