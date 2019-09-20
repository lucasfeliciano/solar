import React from 'react'
import { H4 } from '../Heading'
import { BaseButton } from '../BaseButton'
import { Toggle } from '../Toggle'
import { Panel, PanelContent, PanelText, PanelBody, PanelFooter } from './'

const Wrapper = story => <div style={{ padding: 24 }}>{story()}</div>

export default {
  title: 'Panel',
  decorators: [Wrapper],
}

export const Single = () => (
  <Panel>
    <PanelContent>
      <PanelBody>
        <H4>Title</H4>
        <PanelText>Lorem ipsum dolor sit amet</PanelText>
        <BaseButton>Edit</BaseButton>
      </PanelBody>
    </PanelContent>
  </Panel>
)

export const Group = () => (
  <Panel>
    <PanelContent>
      <PanelBody>
        <H4>Title</H4>
        <PanelText>Lorem ipsum dolor sit amet</PanelText>
        <BaseButton>Edit</BaseButton>
      </PanelBody>
      <PanelFooter>
        <Toggle />
      </PanelFooter>
    </PanelContent>
    <PanelContent>
      <PanelBody>
        <H4>Title</H4>
        <PanelText>Lorem ipsum dolor sit amet</PanelText>
        <BaseButton>Edit</BaseButton>
      </PanelBody>
      <PanelFooter>
        <Toggle />
      </PanelFooter>
    </PanelContent>
  </Panel>
)
