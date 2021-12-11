const ec2_layer = [
  "instance",
  "image",
  "launch-template",
  "snapshot",
  "key-pair",
  "elastic-ip",
  "volume",
  "network-interface",
  "nat-gateway",
  "security-group",
  "internet-gateway",
  "subnet",
  "network-acl",
  "route-table",
  "vpc",
];

const nameSortLogic = (a, b) => {
  if (a.serviceName < b.serviceName) {
    return -1;
  }
  if (a.serviceName > b.serviceName) {
    return 1;
  }
  if (a.serviceName === b.serviceName) {
    return a.resourceType < b.resourceType ? -1 : a.serviceName > b.serviceName ? 1 : 0;
  }
  return 0;
};


const generalSort = (a, b, key) => {
  if(key === "owner"){
    const validA = a[key] === "-" ? "unknow" : a[key].toLowerCase();
    const validB = b[key] === "-" ? "unknow" : b[key].toLowerCase();
    return (validA > validB) ? 1 : ((validB > validA) ? -1 : 0)
  } 
  if(key === "createdAt"){
    return b[key] - a[key]
  }
  return (a[key].toLowerCase() > b[key].toLowerCase()) ? 1 : ((b[key].toLowerCase() > a[key].toLowerCase()) ? -1 : 0)
}

export const useSorting = (data, sortKey, sortValue) => {

  if (sortValue === "default") {
    return data;
  } 
  
  else if (sortValue === "first") {
    if (sortKey === "resource") { return data.sort((a, b) => nameSortLogic(a, b)); }
    else{ return data.sort((a, b) => generalSort(a, b, sortKey)); }
  } 
  
  else if (sortValue === "last") {
    if (sortKey === "resource") { return data.sort((a, b) => nameSortLogic(a, b)).reverse();}
    else{ return data.sort((a, b) => generalSort(a, b, sortKey)).reverse(); }   
  }
  
};
