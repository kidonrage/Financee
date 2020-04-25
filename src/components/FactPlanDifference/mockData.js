import {green, red} from '@material-ui/core/colors'

const mockFetchData = {
  startMonth: 4,
  differences: [10, -20, 30, 5]
}

const monthsList = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]

const getChartData = (userData = mockFetchData) => {
  let labels = []
  for( let i=0; i < monthsList.length; i++) {
    var pointer = (i + userData.startMonth) % monthsList.length;
    labels.push(monthsList[pointer]);
  }
  
  const backgroundColors = userData.differences.map(difference => {
    return difference >= 0 ? green[500] : red[500]
  })
  
  const chartData = {
    labels,
    datasets: [{
      label: 'Отклонение',
      data: userData.differences,
      backgroundColor: backgroundColors,
    }]
  }

  return chartData
}

export default getChartData