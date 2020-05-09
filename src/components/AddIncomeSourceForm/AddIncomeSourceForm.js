import React from 'react'
import {
  TextField,
  FormControl,
  FormHelperText,
  Chip,
  makeStyles
} from '@material-ui/core'
import clsx from 'clsx'
import { getContrastingColor } from 'react-color/lib/helpers'
import PercentageFormat from '../PercentageFormat'
import styles from './styles'
import ColorPicker from '../ColorPicker'

const useStyles = makeStyles(styles)

const AddIncomeSourceForm = ({name, expectedSavingPercentage, color, colors, handleChange, handleColorChange}) => {
  const classes = useStyles()

  return (
    <>
      <FormControl className={classes.formControl}>
          <TextField
            label="Название"
            value={name}
            onChange={handleChange}
            name="name"
            variant="outlined"
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            label="Планируемый % сохранения от дохода"
            value={expectedSavingPercentage}
            onChange={handleChange}
            name="expectedSavingPercentage"
            variant="outlined"
            InputProps={{
              inputComponent: PercentageFormat,
            }}
          />
        </FormControl>

        <FormControl className={clsx(classes.formControl, classes.colorControl)}>
          <FormHelperText className={classes.colorInputCaption}>
            Выберите цвет отметки:
          </FormHelperText>
          <ColorPicker
            color={color}
            colors={colors}
            handleColorChange={handleColorChange}
          >
            <Chip 
              size="small" 
              className={classes.colorInput} 
              style={{
                backgroundColor: color,
                color: getContrastingColor(color)
              }}
              label={name}
            />
          </ColorPicker>
        </FormControl>
    </>
  )
}

export default AddIncomeSourceForm