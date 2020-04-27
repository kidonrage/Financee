import React from 'react'
// import { getContrastingColor } from 'react-color/lib/helpers'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Chip } from '@material-ui/core'

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

function createData(source, sourceColor, amount, saved, date) {
  return { source, sourceColor, amount, saved, date }
}

const rows = [
  createData('Работа', 'brown', 190, 100, Date.now()),
  createData('Бизнес 1', 'green', 1000, 100, Date.now()),
  createData('Бизнес 2', 'brown', 190, 100, Date.now()),
  createData('Бизнес 2', 'brown', 190, 100, Date.now()),
  createData('Кофе', 'brown', 190, 100, Date.now()),
]

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

const IncomesTable = () => {
  const classes = useStyles()

  return (
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
          {rows.map((row, i) => (
            // TODO: Keys
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">
                <Chip
                  label={row.source}
                  style={{
                  backgroundColor: row.sourceColor,
                  // color: getContrastingColor(row.sourceColor)
                }}
                />
              </StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell align="right">{row.saved}</StyledTableCell>
              <StyledTableCell align="right">{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default IncomesTable;