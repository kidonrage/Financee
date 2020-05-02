import React, { useState, useEffect, useMemo, useCallback, createRef } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import BottomScrollListener from 'react-bottom-scroll-listener';
import IncomesTable from '../../components/IncomesTable'
import { getIncomes, getNextIncomes } from './requests'
import styles from './styles'
import Spinner from '../../components/Spinner'

const pageSize = 10

const useStyles = makeStyles(styles)

const Income = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState([])
  const [incomes, setIncomes] = useState([])
  const [lastVisible, setLastVisible] = useState([])
  const [isAllLoaded, setIsAllLoaded] = useState(false)

  useEffect(() => {
    setLoading(true)

    getIncomes(pageSize)
      .then((fetchedData) => {
        const {incomes, lastDocument} = fetchedData;
        setIncomes(incomes)

        if (lastDocument) {
          setLastVisible(lastDocument)
        } else {
          setIsAllLoaded(true)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const getMoreIncomes = useCallback(() => {
    if (!lastVisible) {
      return []
    }

    setLoading(true)
    
    getNextIncomes(pageSize, lastVisible)
      .then((fetchedData) => {
        const {lastDocument} = fetchedData;
        setIncomes([...incomes, ...fetchedData.incomes])
        
        if (lastDocument) {
          setLastVisible(lastDocument)
        } else {
          setIsAllLoaded(true)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [lastVisible, incomes])

  if (!incomes.length) {
    return <p>Нет добавленных доходов</p>
  }

  return (
    <BottomScrollListener onBottom={isAllLoaded ? () => {} : getMoreIncomes} >
      <div className={classes.root}>
        <div className={classes.table}>
          <IncomesTable
            incomes={incomes}
          />
        </div>

        {isAllLoaded && (
          <p>Все доходы загружены</p>
        )}

        <Spinner 
          className={clsx(classes.loader, {
            [classes.activeLoader]: loading
          })}
        />
      </div>
    </BottomScrollListener>
  )
}

export default Income