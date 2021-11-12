import moment from "moment";

export const useFormat = (data) => {
  const finalData = [];
  const serviceCondition = {
    events: "eventbridge",
  };
  const tagCondition = ["owner", "createdAt"];
  Object.keys(data).map((value) => {
    data[value].map((value) => {
      value.region =  value.serviceName === "s3" ? "all region" : value.ResourceARN.split(":")[3];
      value.serviceName = serviceCondition[value.ResourceARN.split(":")[2]] ?? value.ResourceARN.split(":")[2];
      value.resourceType = value.ResourceARN.split(":")[5].split("/")[0];
      
      value.Tags.map((tagValue) => {
        if (tagCondition.includes(tagValue.Key)) {
          value[tagValue.Key] = tagValue.Value 
        }
      });
      (value.isChoose = false), finalData.push(value);
    });
  });
  finalData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  finalData.map((value) =>  {
    value.createdAt = value.createdAt ? moment(value.createdAt).format("DD/MM/YYYY HH:mm") : "-"
    if(value.createdAt === "Invalid date"){
      value.createdAt = "-"
    }
  }
  )
  return finalData;
};
