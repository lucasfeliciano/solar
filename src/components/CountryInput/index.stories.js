import React from 'react'
import { storiesOf } from '@storybook/react'
import { CountryInput } from './'

const countries = [
  { value: 'nl', name: 'Netherlands' },
  { value: 'at', name: 'Austria' },
  { value: 'de', name: 'Germany' },
  { value: 'it', name: 'Italy' },
  { value: 'be', name: 'Belgium' },
  { value: 'au', name: 'Australia' },
  { value: 'us', name: 'United States' },
  { value: 'gb', name: 'United Kingdom' },
  { value: 'es', name: 'Spain' },
  { value: 'br', name: 'Brazil' },
  { value: 'fr', name: 'France' },
  { value: 'ch', name: 'Switzerland' },
  { value: 'hu', name: 'Hungary' },
]

storiesOf('CountryInput', module)
  .add('basic', () => (
    <CountryInput id="country" label="Country" items={countries} />
  ))
  .add('with initial value', () => (
    <CountryInput
      id="country"
      label="Country"
      items={countries}
      initialValue="at"
      hideLabel
      onChange={selection => alert(selection.name)}
    />
  ))
