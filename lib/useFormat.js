import moment from "moment";

export const useFormat = (data) => {
  const finalData = [];
  const serviceCondition = {
    events: "eventbridge",
  };
  const tagCondition = ["owner", "createdAt"];
  Object.keys(data).map((value) => {
    data[value].map((value) => {
      value.region = value.ResourceARN.split(":")[3];
      value.serviceName = serviceCondition[value.ResourceARN.split(":")[2]] ?? value.ResourceARN.split(":")[2];
      value.resourceType = value.ResourceARN.split(":")[5].split("/")[0];
      value.Tags.map((tagValue) => {
        if (tagCondition.includes(tagValue.Key)) {
          if(tagValue.Key === "createdAt"){
            const date = moment(tagValue.Value).format("DD/MM/YYYY HH:mm:ss")
            console.log(date)
            value[tagValue.Key] = date
          }
          else{
            value[tagValue.Key] = tagValue.Value 
          }
        }
      });
      (value.isChoose = false), finalData.push(value);
    });
  });
  return finalData;
};
