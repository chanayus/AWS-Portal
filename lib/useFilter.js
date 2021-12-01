

const dataFilter = (resource, value) =>{
  return !resource.length ? true : resource.includes(value);
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
    const {resource, region, owner,searchText} = filterData
    const filtered = data.filter((value) => dataFilter(resource,value.serviceName))
    .filter((value) => dataFilter(region, value.region))
    .filter((value) => dataFilter(owner, value.owner))
    .filter((value) => textFilter(value, searchText))

    setState(filtered)
}

