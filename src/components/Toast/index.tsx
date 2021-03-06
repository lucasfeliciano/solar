import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { Portal } from '../Portal'
import { space, shadow, device, radius, easing, color } from '../../theme'
import { useTransition } from '../../hooks'
import { TransitionState } from '../../hooks/useTransition'

const duration = 400

const ItemListContainer = styled.ul`
  position: fixed;
  z-index: 10;
  left: 0;
  bottom: 0;
  width: ${space[512]};
  max-width: 100%;
  flex-direction: column-reverse;
  pointer-events: none;

  @media ${device.tablet} {
    left: ${space[16]};
    bottom: ${space[16]};
  }
`

interface ItemContainerStyles {
  state: boolean | TransitionState
}

const ItemContainer = styled.li<ItemContainerStyles>`
  position: absolute;
  width: 100%;
  pointer-events: auto;
  padding: 0 ${space[16]} ${space[16]};
  opacity: 0;
  transform: ${props =>
    props.state === 'entering' || props.state === 'entered'
      ? 'translate3d(0,0,0)'
      : 'translate3d(0,1rem,0)'};
  transition-duration: ${duration}ms;
  transition-timing-function: ${easing.easeOutCubic};
  transition-property: opacity, transform;

  &:nth-last-of-type(4) {
    transform: translate3d(0, -1.8rem, 0) scale(0.94);
  }

  &:nth-last-of-type(3) {
    opacity: ${props =>
      props.state === 'entering' || props.state === 'entered' ? 0.6 : 0};
    transform: translate3d(0, -1.2rem, 0) scale(0.96);
  }

  &:nth-last-of-type(2) {
    opacity: ${props =>
      props.state === 'entering' || props.state === 'entered' ? 0.8 : 0};
    transform: translate3d(0, -0.6rem, 0) scale(0.98);
  }

  &:last-of-type {
    opacity: ${props =>
      props.state === 'entering' || props.state === 'entered' ? 1 : 0};
    position: relative;
  }
`

export interface ToastProps {
  persist?: boolean
}

export const Toast = styled.div<ToastProps>`
  border-radius: ${radius.lg};
  background-color: ${color.nova};
  box-shadow: ${shadow.strong};
  padding: ${space[16]};

  [data-theme='dark'] & {
    border: 1px solid ${color.spaceLightest};
  }
`

export const ToastContext = React.createContext({
  notify: (_renderCallback: (_?: (event?: any) => void) => any) => {},
})
export const ToastConsumer = ToastContext.Consumer

export function withToastContext(Component: React.ComponentType) {
  return function WrapperComponent(props: any) {
    return (
      <ToastConsumer>
        {stateAndHelpers => <Component {...props} {...stateAndHelpers} />}
      </ToastConsumer>
    )
  }
}

interface ItemStateProps {
  key: number
  renderCallback: any
  persist: any
}

export const ToastProvider: React.FC = props => {
  const [items, setItems] = React.useState<ItemStateProps[]>([])
  const [cancellations, setCancellations] = React.useState<number[]>([])

  function notify(renderCallback: () => any) {
    const component = renderCallback()
    const { persist } = component.props
    const key = performance.now()
    setItems([...items, { key, renderCallback, persist }])
  }

  function cancel(key: number) {
    setCancellations([...cancellations, key])
  }

  function remove(key: number) {
    setCancellations(cancellations.filter(i => i !== key))
    requestAnimationFrame(() => {
      setItems(items.filter(item => item.key !== key))
    })
  }

  function getStateAndHelpers() {
    return {
      notify,
    }
  }

  return (
    <ToastContext.Provider value={getStateAndHelpers()}>
      {props.children}
      <Portal>
        <ItemList on={items.length > 0}>
          {items.map(item => (
            <Item
              key={item.key}
              on={cancellations.indexOf(item.key) === -1}
              cancel={() => cancel(item.key)}
              remove={() => remove(item.key)}
              persist={item.persist}
            >
              {item.renderCallback(() => cancel(item.key))}
            </Item>
          ))}
        </ItemList>
      </Portal>
    </ToastContext.Provider>
  )
}

export interface ItemListProps {
  on: boolean
  children: ReactNode
}

function ItemList({ on, children }: ItemListProps) {
  const [, mounted] = useTransition({ in: on, timeout: duration })
  if (!mounted) return null
  return <ItemListContainer>{children}</ItemListContainer>
}

export interface ItemProps {
  on: boolean
  remove: () => void
  cancel: () => void
  persist: boolean
  children: ReactNode
}

function Item({ on, remove, cancel, persist, children }: ItemProps) {
  let timer: NodeJS.Timeout | null = null
  const [state, mounted] = useTransition({
    in: on,
    timeout: duration,
    onEntered: () => {
      if (!persist) {
        timer = setTimeout(cancel, 3000)
      }
    },
    onExited: () => {
      timer && clearTimeout(timer)
      remove()
    },
  })
  if (!mounted) return null
  return <ItemContainer state={state}>{children}</ItemContainer>
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast() must be used within a ToastProvider')
  }
  return context
}
