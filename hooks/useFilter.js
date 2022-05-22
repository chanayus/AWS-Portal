const dataFilter = (resource, value) => {
  return !resource.length ? true : resource.includes(value)
}

export const useTextFilter = (data, condition) => {
  condition = condition.toLowerCase()
  if (condition === "") {
    return data
  } else {
    return data.filter((value) => {
      value.owner ??= ""
      return (
        value.resourceId.toLowerCase().includes(condition) ||
        value.serviceName.toLowerCase().includes(condition) ||
        value.region.toLowerCase().includes(condition) ||
        value.resourceType.toLowerCase().includes(condition) ||
        value.owner.toLowerCase().includes(condition)
      )
    })
  }
}

export const useFilter = (data, setState, filterData) => {
  const { resource, region, owner, searchText } = filterData
  const filtered = data
    .filter((value) => dataFilter(resource, value.resourceType))
    .filter((value) => dataFilter(region, value.region))
    .filter((value) => dataFilter(owner, value.owner))

  setState(useTextFilter(filtered, searchText))
}

export const useCostTextFilter = (data, condition) => {
  condition = condition.toLowerCase()
  if (condition === "") {
    return data
  } else {
    return data.filter((value) => {
      value.owner ??= ""
      return (
        value.resourceId.toLowerCase().includes(condition) ||
        value.serviceType.toLowerCase().includes(condition) ||
        value.region.toLowerCase().includes(condition) ||
        value.owner.toLowerCase().includes(condition)
      )
    })
  }
}

export const useCostFilter = (data, filterData) => {
  return useCostTextFilter(data, filterData)
}
