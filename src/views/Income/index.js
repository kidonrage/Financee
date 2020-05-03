import React, { useState, useEffect, useContext, useCallback, createRef } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import BottomScrollListener from 'react-bottom-scroll-listener';
import IncomesTable from '../../components/IncomesTable'
import { getIncomes, getNextIncomes } from './requests'
import styles from './styles'
import Spinner from '../../components/Spinner'
import { LoadingContext } from '../../components/Loading'

const pageSize = 10

const useStyles = makeStyles(styles)

const Income = () => {
  const classes = useStyles()
  const { loading, setLoading } = useContext(LoadingContext)

  const [loadingMore, setLoadingMore] = useState(false)
  const [incomesData, setIncomesData] = useState({
    incomes: [],
    lastVisible: null
  })
  const [isAllLoaded, setIsAllLoaded] = useState(false)

  const tableRef = createRef()

  useEffect(() => {
    setLoading(true)

    getIncomes(pageSize)
      .then((fetchedData) => {
        const {incomes, lastDocument} = fetchedData;

        setIncomesData({
          incomes,
          lastVisible: lastDocument
        })

        if (incomes.length < pageSize || !lastDocument) {
          setLoading(false)
          setIsAllLoaded(true)
        }
      })
  }, [])

  const getMoreIncomes = useCallback(() => {
    const { lastVisible } = incomesData
    if (!lastVisible) {
      return []
    }

    setLoadingMore(true)
    
    getNextIncomes(pageSize, lastVisible)
      .then((fetchedData) => {
        const {lastDocument} = fetchedData;

        setIncomesData(prevIncomesData => ({
          incomes: [...prevIncomesData.incomes, ...fetchedData.incomes],
          lastVisible: lastDocument
        }))

        if (fetchedData.incomes.length < pageSize || !lastDocument) {
          setIsAllLoaded(true)
        }
      })
      .finally(() => {
        console.log('setLoadingMore(false) getMoreIncomes')
        setLoadingMore(false)
      })
  }, [incomesData])

  useEffect(() => {
    const {incomes} = incomesData

    if (!loading || !tableRef.current || !incomes.length) {
      return
    }

    let bottomOffset = tableRef.current.getBoundingClientRect().bottom - window.innerHeight
    console.log(bottomOffset)

    if (bottomOffset < 0) {
      getMoreIncomes()
    } else {
      setLoading(false)
    }
  }, [incomesData, getMoreIncomes, loading, isAllLoaded, tableRef.current])

  if (!incomesData.incomes.length) {
    return <p>Нет добавленных доходов</p>
  }

  return (
    <BottomScrollListener onBottom={isAllLoaded ? () => {} : () => {console.log('bottom'); getMoreIncomes()}} >
      <div className={classes.root} ref={tableRef}>
        <div className={classes.table}>
          <IncomesTable
            incomes={incomesData.incomes}
          />
        </div>

        {isAllLoaded && (
          <p>Все доходы загружены</p>
        )}

        <Spinner 
          className={clsx(classes.loader, {
            [classes.activeLoader]: loadingMore
          })}
        />
      </div>
    </BottomScrollListener>
  )
}

export default Income