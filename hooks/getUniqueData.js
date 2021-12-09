

export const getUniqueData = (data, key) =>{
    const uniqueData = [...new Set( data.map(value => value[key])) ];
    if(key === "region"){
        return uniqueData.filter((value) => value !== "all region").sort();
    }
    else{
        return uniqueData.sort();
    }
}


export const getUniqueResourceType = (data, service) =>{
    const resources = data.filter((value => value.serviceName === service))
    const uniqueData = [...new Set(resources.map(value => value.resourceType))];

    return uniqueData.sort();
}