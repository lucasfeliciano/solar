import React, { ReactNode } from 'react'
import Downshift from 'downshift'
import {
  Input,
  InputMenu,
  InputMenuList,
  InputMenuItem,
  InputProps,
} from '../Input'
import { MagnifyingGlass } from '@ticketswap/comets'

type SelectItem = {
  value: string
  name: string
  displayName?: string
  adornment?: ReactNode
}

export interface ComboboxProps extends Omit<InputProps, 'onChange'> {
  onChange?: (event: SelectItem) => void
  id: string
  label: string
  items: SelectItem[]
  initialValue?: string
}

export const Combobox = ({
  items,
  onChange = () => null,
  initialValue = '',
  ...props
}: ComboboxProps) => (
  <Downshift
    id={props.id}
    onChange={selection => selection && onChange(selection)}
    itemToString={item => (item ? item.name : '')}
    initialSelectedItem={
      items.filter(item => initialValue.indexOf(item.value) > -1)[0]
    }
  >
    {({
      getInputProps,
      getItemProps,
      getMenuProps,
      isOpen,
      openMenu,
      inputValue,
      clearSelection,
      highlightedIndex,
      selectedItem,
    }) => (
      <div>
        <Input
          data-testid="combobox"
          {...getInputProps({
            onChange: clearSelection,
            onReset: clearSelection,
            onFocus: !selectedItem ? openMenu : null,
            leftAdornment:
              selectedItem && selectedItem.adornment ? (
                selectedItem.adornment
              ) : (
                <MagnifyingGlass size={24} />
              ),
            menu: isOpen && (
              <InputMenu {...getMenuProps()}>
                <InputMenuList>
                  {items
                    .filter(
                      item =>
                        !inputValue ||
                        (item &&
                          item.name &&
                          item.name
                            .toLowerCase()
                            .includes(inputValue.toLowerCase()))
                    )
                    .map((item, index) => (
                      <InputMenuItem
                        {...getItemProps({
                          key: item.name,
                          index,
                          item,
                          // @ts-ignore
                          highlighted:
                            highlightedIndex === index ? true : undefined,
                          selected: selectedItem === item ? true : undefined,
                          adornment: item.adornment,
                        })}
                      >
                        {item.name}
                      </InputMenuItem>
                    ))}
                </InputMenuList>
              </InputMenu>
            ),
            ...props,
          })}
        />
      </div>
    )}
  </Downshift>
)