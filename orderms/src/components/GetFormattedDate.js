function getFormattedDate(dateToFormat) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }
  const date = new Date(dateToFormat).toLocaleString("en-EN", options)
  return date
}
export default getFormattedDate
