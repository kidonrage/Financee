import React, {useEffect, useState, useContext} from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { getContrastingColor } from 'react-color/lib/helpers'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
} from '@material-ui/core'
import firebase from '../../../utils/firebase'
import AddIncomeSourceModal from '../../../components/AddIncomeSourceModal'
import { UserDataContext } from '../../../components/UserDataProvider'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow)

const useStyles = makeStyles(theme => ({
  addBtn: {
    marginBottom: theme.spacing(2)
  }
}))

const IncomeSourcesView = () => {
  const classes = useStyles()

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const {incomeSources, reloadUserData} = useContext(UserDataContext) 

  return (
    <>
      {incomeSources.length < 5 && (
        <Button 
          className={classes.addBtn} 
          variant="contained" 
          color="primary" 
          onClick={() => setIsAddModalOpen(true)}
        >
          Добавить новый
        </Button>
      )}

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Источник</StyledTableCell>
              <StyledTableCell align="right">Инвестировано в цель</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomeSources.map((incomeSource, i) => (
              // TODO: Keys
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  <Chip
                    label={incomeSource.name}
                    style={{
                    backgroundColor: incomeSource.color,
                    color: getContrastingColor(incomeSource.color)
                  }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">{incomeSource.expectedSavingPercentage}%</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddIncomeSourceModal 
        open={isAddModalOpen}
        handleClose={() => setIsAddModalOpen(false)}
        onAdd={() => reloadUserData()}
      />

    </>
  )
}

export default IncomeSourcesView