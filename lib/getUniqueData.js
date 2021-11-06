export const getUniqueData = (data, key) =>{
    const uniqueData = [...new Set( data.map(value => value[key])) ];
    return uniqueData;
}