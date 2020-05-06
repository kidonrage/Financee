import React, {useEffect, useState} from 'react'
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

  const [incomeSources, setIncomeSources] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    firebase.getIncomeSources()
      .then(setIncomeSources)
  }, [])

  return (
    <>
      <Button 
        className={classes.addBtn} 
        variant="contained" 
        color="primary" 
        onClick={() => setIsAddModalOpen(true)}
      >
        Добавить новый
      </Button>

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
        onAdd={(newIncomeSource) => {
          setIncomeSources(incomeSources => ([
            newIncomeSource,
            ...incomeSources,
          ]))
        }}
      />

    </>
  )
}

export default IncomeSourcesView