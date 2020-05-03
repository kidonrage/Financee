import React, { useState, forwardRef } from 'react'
import { getContrastingColor } from 'react-color/lib/helpers'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@material-ui/core'

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

const IncomesTable = ({incomes}) => {
  const classes = useStyles()

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Источник</StyledTableCell>
              <StyledTableCell align="right">Сумма</StyledTableCell>
              <StyledTableCell align="right">Инвестировано в цель</StyledTableCell>
              <StyledTableCell align="right">Дата</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomes.map((income, i) => (
              // TODO: Keys
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  <Chip
                    label={income.source.name}
                    style={{
                    backgroundColor: income.source.color,
                    color: getContrastingColor(income.source.color)
                  }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">{income.amount}</StyledTableCell>
                <StyledTableCell align="right">{income.goalSaving}</StyledTableCell>
                <StyledTableCell align="right">{income.date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default IncomesTable;