export const getUniqueData = (data, key) =>{
    const uniqueData = [...new Set( data.map(value => value[key])) ];
    if(key === "region"){
        return uniqueData.filter((value) => value !== "all region").sort();
    }
    else{
        return uniqueData.sort();
    }
}