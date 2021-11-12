
const dataFilter = (value, condition) =>{
  if(condition === ""){
    return true
  }
  return value === condition 
}

const textFilter = (value, condition) => {
  condition = condition.toLowerCase()
  value.owner ??= ""
  if(condition === ""){
    return true
  }
  return value.resourceId.toLowerCase().includes(condition) || 
  value.serviceName.toLowerCase().includes(condition) || 
  value.region.toLowerCase().includes(condition) ||
  value.owner.toLowerCase().includes(condition)
}

export const selectFilterHandle = (data, setState, filterData) =>{
    const {resource, region, searchText} = filterData
    const filtered = data.filter((value) => dataFilter(value.serviceName, resource))
    .filter((value) => dataFilter(value.region, region))
    .filter((value) => textFilter(value, searchText))
    setState(filtered)
}

