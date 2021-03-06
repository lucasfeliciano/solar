import React from 'react'
import { Toast, ToastConsumer, ToastProvider, useToast } from './'
import { Button, ButtonVariant } from '../Button'

const Wrapper = (story: () => React.ReactNode) => (
  <ToastProvider>{story()}</ToastProvider>
)

function UseToast() {
  const { notify } = useToast()
  return (
    <Button
      onClick={() =>
        notify(remove => (
          <Toast>
            Notification
            <button onClick={remove}>Close</button>
          </Toast>
        ))
      }
    >
      Show toast
    </Button>
  )
}

export default {
  title: 'Toast',
  decorators: [Wrapper],
}

export const Basic = () => (
  <ToastConsumer>
    {({ notify }) => (
      <Button onClick={() => notify(() => <Toast>Notification</Toast>)}>
        Show toast
      </Button>
    )}
  </ToastConsumer>
)

export const WithToast = () => <UseToast />

WithToast.storyName = 'useToast()'

export const Persistent = () => (
  <ToastConsumer>
    {({ notify }) => (
      <Button
        onClick={() =>
          notify(remove => (
            <Toast persist>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>Payment failed</span>
                <Button
                  onClick={remove}
                  size="small"
                  variant={ButtonVariant.secondary}
                >
                  Discard
                </Button>
              </div>
            </Toast>
          ))
        }
      >
        Show toast
      </Button>
    )}
  </ToastConsumer>
)
