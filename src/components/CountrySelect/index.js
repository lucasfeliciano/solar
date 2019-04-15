import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { Input } from '../Input'
import { MenuContainer, Menu, Item } from '../Select'
import { Flag } from '../Flag'
import { Icon } from '../Icon'

export const CountrySelect = ({ items, onChange, initialValue, ...props }) => (
  <Downshift
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
      <div style={{ position: 'relative' }}>
        <Input
          {...getInputProps({
            onChange: clearSelection,
            onReset: clearSelection,
            onFocus: !selectedItem ? openMenu : null,
            leftAdornment: selectedItem ? (
              <Flag countryCode={selectedItem.value} />
            ) : (
              <Icon glyph="loupe-solid" size={24} />
            ),
            ...props,
          })}
        />
        {isOpen && (
          <MenuContainer>
            <Menu {...getMenuProps()}>
              {items
                .filter(
                  item =>
                    !inputValue ||
                    item.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item, index) => (
                  <Item
                    {...getItemProps({
                      key: item.name,
                      index,
                      item,
                      highlighted:
                        highlightedIndex === index ? 'true' : undefined,
                      selected: selectedItem === item ? 'true' : undefined,
                      adornment: <Flag countryCode={item.value} />,
                    })}
                  >
                    {item.name}
                  </Item>
                ))}
            </Menu>
          </MenuContainer>
        )}
      </div>
    )}
  </Downshift>
)

CountrySelect.defaultProps = {
  initialValue: '',
  onChange: () => {},
}

CountrySelect.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  initialValue: PropTypes.string,
}