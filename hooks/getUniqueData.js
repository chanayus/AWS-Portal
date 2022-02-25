export const getUniqueData = (data, key) => {
  const uniqueData = [...new Set(data.map((value) => value[key]))]
  if (key === "region") {
    return uniqueData.filter((value) => value !== "all region").sort()
  } else {
    return uniqueData.sort()
  }
}

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
]

export const getUniqueResourceType = (data, service) => {
  const resources = data.filter((value) => value.serviceName === service)
  const uniqueData = [...new Set(resources.map((value) => value.resourceType))]

  if (service === "ec2") {
    const sorted = []
    ec2_layer.map((value) => {
      if (uniqueData.includes(value)) {
        sorted.push(value)
      }
    })
    return sorted
  }
  return uniqueData
}
