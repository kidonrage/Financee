import React from 'react'
import {
  Popover, makeStyles
} from '@material-ui/core'
import { BlockPicker } from 'react-color'

const ColorPicker = ({color, colors, children, handleColorChange}) => {
  const classes = makeStyles(theme => ({
    colorInputPopover: {
      background: 'none'
    }
  }))

  const [pickerAnchor, setPickerAnchor] = React.useState(null);
  const pickerOpen = Boolean(pickerAnchor);

  const handlePickerOpen = (event) => {
    setPickerAnchor(event.currentTarget);
  };

  const handlePickerClose = () => {
    setPickerAnchor(null);
  };

  return (
    <>
      <div onClick={handlePickerOpen}>
        {children}
      </div>
      <Popover 
        open={pickerOpen}
        anchorEl={pickerAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: -8,
          horizontal: 'center',
        }}
        onClose={handlePickerClose}
        classes={{
          paper: classes.colorInputPopover
        }}
      >
        <BlockPicker 
          color={ color }
          onChangeComplete={ handleColorChange }
          onChange={ handleColorChange }
          colors={colors}
        />
      </Popover>
    </>
  )
}

export default ColorPicker