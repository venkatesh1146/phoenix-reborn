export const appendZero = (num: number) => {
  return num.toString().length < 2 ? `0${num.toString()}` : num.toString()
}

export const encodeDateFormat = (d: any) => {
  return new Date(
    d.split('/')[2],
    d.split('/')[1] - 1,
    d.split('/')[0],
    12
  ).toISOString()
}

export const decodeDateFormat = (d: any) => {
  if (!d) return
  const date = new Date(d)
  return `${appendZero(date.getDate())}/${appendZero(
    date.getMonth() + 1
  )}/${appendZero(date.getFullYear())}`
}

export const decodeDateFormatWithHyphen = (d: any) => {
  if (!d) return
  const date = new Date(d)
  return `${appendZero(date.getFullYear())}-${appendZero(
    date.getMonth() + 1
  )}-${appendZero(date.getDate())}`
}