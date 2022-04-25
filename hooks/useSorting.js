const nameSortLogic = (a, b) => {
  if (a.serviceName < b.serviceName) {
    return -1
  }
  if (a.serviceName > b.serviceName) {
    return 1
  }
  if (a.serviceName === b.serviceName) {
    return a.resourceType < b.resourceType ? -1 : a.serviceName > b.serviceName ? 1 : 0
  }
  return 0
}

const generalSort = (a, b, key) => {
  const valueA = a[key] ?? "unknow"
  const valueB = b[key] ?? "unknow"
  if (key === "owner") {
    const validA = valueA === "-" ? "unknow" : a[key].toLowerCase()
    const validB = valueB === "-" ? "unknow" : b[key].toLowerCase()
    return validA > validB ? 1 : validB > validA ? -1 : 0
  }
  if (key === "createdAt") {
    return b[key] - a[key]
  }
  return valueA.toLowerCase() > valueB.toLowerCase() ? 1 : valueB.toLowerCase() > valueA.toLowerCase() ? -1 : 0
}

export const useSorting = (data, sortKey, sortValue) => {
  if (sortValue === "default") {
    return data
  } else if (sortValue === "first") {
    if (sortKey === "resource") {
      return data.sort((a, b) => nameSortLogic(a, b))
    } else {
      return data.sort((a, b) => generalSort(a, b, sortKey))
    }
  } else if (sortValue === "last") {
    if (sortKey === "resource") {
      return data.sort((a, b) => nameSortLogic(a, b)).reverse()
    } else {
      return data.sort((a, b) => generalSort(a, b, sortKey)).reverse()
    }
  }
}
