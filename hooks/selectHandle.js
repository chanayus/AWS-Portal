export const chooseHandle = (item, data, setState) => {
  setState(
    data.map((value) => {
      if (item.resourceId === value.resourceId) {
        value.isChoose = !value.isChoose
      }
      return value
    })
  )
}

export const chooseAllHandle = (data, setState, isSelectAll, setIsSelectAll, includeList = [], unusedResources = []) => {
  setState(
    data.map((value) => {
      if (includeList.includes(value.resourceType ?? "undefined")) {
        value.isChoose = isSelectAll ? false : true
      }
      return value
    })
  )
  setIsSelectAll(!isSelectAll)
}
