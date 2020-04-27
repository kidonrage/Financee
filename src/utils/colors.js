export function getRandomColors(count = 10) {
  return import('@material-ui/core/colors')
    .then((colorsModule) => {
      const colors = Object.values(colorsModule)
        .filter(color => color[500] ) // Один объект в colors - черно-белый цвет с двумя полями, не подходит

      const shuffledColors = colors.sort(() => 0.5 - Math.random())

      const slice = shuffledColors.slice(0, count)

      return slice.map(color => color[500])
    });
}