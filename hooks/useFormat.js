

const formatOwner = (tagName, owner) =>{
  const valueCondition = ["cie21", "ict21"]

  if(tagName === "cie2021" && (valueCondition.includes(owner.slice(0,5)) || owner.slice(0,5) === "group")){
    return `${valueCondition.includes(owner.slice(0,5)) ? owner.slice(0,5) : "cie21"}g${owner.slice(-1)}`;
  }
  else{
    const formatCondition = {
      cie21: `cie21g${owner.slice(-1)}`,
      ict21: `ict21g${owner.slice(-1)}`
    }
    return formatCondition[tagName];
  }
 
}

export const useFormat = (data) => {
  const finalData = [];
  const serviceCondition = {
    events: "eventbridge",
  };
  const allRegionCondition = ["cloudfront", "s3", "iam", "route53"];
  const tagCondition = ["owner", "createdAt"];
  const manualTagCndition = ["cie21", "ict21"];
  // loop in key
  Object.keys(data).map((value) => {
    
    // loop in value
    data[value].map((value) => {
      value.serviceName = serviceCondition[value.ResourceARN.split(":")[2]] ?? value.ResourceARN.split(":")[2];
      value.region = allRegionCondition.includes(value.serviceName) ? "CoverageAll" : value.ResourceARN.split(":")[3] === "" ? "-" : value.ResourceARN.split(":")[3];
      value.resourceType = value.ResourceARN.split(":")[5].split("/")[0] === "" ? value.serviceName : value.ResourceARN.split(":")[5].split("/")[0]  ;

      // Loop in Tag Array
      value.Tags.map((tagValue) => {
        if (tagCondition.includes(tagValue.Key)) {
          value[tagValue.Key] = tagValue.Value;
        }
        if(tagValue.Key === "cie2021"){
          value.owner = formatOwner(tagValue.Key, tagValue.Value) 
        }
      });

      // Get owner name from manual tag if owner is undefined
      if(!value.owner){
        value.Tags.map((tagValue) => {
          if (manualTagCndition.includes(tagValue.Key)) {
            value.owner = formatOwner(tagValue.Key, tagValue.Value)
          }
        });
      }

      value.owner ??= "-";
      value.createdAt ??= "2000-01-01T00:00:00Z";
      value.isChoose = false;
      finalData.push(value);
    });
  });

  // Sorting Data
  finalData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  finalData.map((value) => {
    value.createdAt = value.createdAt != "2000-01-01T00:00:00Z" ? value.createdAt : "-";
  });

  return finalData;
};
