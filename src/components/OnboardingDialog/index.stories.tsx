import React, { useState } from 'react'
import { Button, ButtonVariant } from '../Button'
import { H1, H3 } from '../Heading'
import { Input } from '../Input'
import styled from '@emotion/styled'
import { space } from '../../theme'
import { Text } from '../Text'
import {
  OnboardingDialog,
  OnboardingDialogBody,
  OnboardingWrapper,
  useOnboarding,
} from './index'
import { ContentTransition } from '../ContentTransition'
import { TransitionState } from '../../hooks/useTransition'

const Body = styled.div`
  padding: ${space[32]};
`

const Form = styled.form`
  display: grid;
  grid-gap: ${space[16]};
  margin: ${space[32]} 0;
`

const Actions = styled.div`
  display: grid;
  margin-top: ${space[16]};
  grid-template-columns: 200px 200px;
  grid-gap: ${space[8]};
`

const StorybookDialog = () => {
  const { show, hide, getOnboardingProps, state, active } = useOnboarding({
    defaultTransitionState: TransitionState.ENTERED,
  })

  const [activeView, setActiveView] = useState('step1')

  return (
    <Body>
      <H1>Onboarding page</H1>

      <OnboardingWrapper state={state} active={active}>
        <Form>
          <Input label="Name" id="name" />
          <Input label="Email" id="email" />
          <Input label="Age" id="age" />
          <Button
            type="button"
            onClick={() => {
              setActiveView('step1')
              show()
            }}
          >
            Onboarding
          </Button>
        </Form>

        <OnboardingDialog {...getOnboardingProps()}>
          <ContentTransition activeView={activeView}>
            <OnboardingDialogBody key="step1">
              <H3>Onboarding you</H3>
              <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                viverra porttitor quam. Proin rutrum feugiat hendrerit. Fusce
                sed felis at massa finibus varius. Nulla mattis risus arcu,
                vitae facilisis metus mollis sed.
              </Text>

              <Actions>
                <Button onClick={() => setActiveView('step2')}>Next</Button>
              </Actions>
            </OnboardingDialogBody>
            <OnboardingDialogBody key="step2">
              <H3>This explains everything</H3>
              <Text as="p">
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Phasellus cursus venenatis suscipit. Donec et diam commodo,
                accumsan risus.
              </Text>

              <Actions>
                <Button onClick={hide}>Close</Button>
                <Button
                  onClick={() => setActiveView('step1')}
                  variant={ButtonVariant.secondary}
                >
                  Previous
                </Button>
              </Actions>
            </OnboardingDialogBody>
          </ContentTransition>
        </OnboardingDialog>
      </OnboardingWrapper>

      <H3>FAQ</H3>
      <Text>This is some random text</Text>
    </Body>
  )
}

export const Basic = () => <StorybookDialog />

/* Storybook */
export default {
  title: 'Onboarding Dialog',
}
