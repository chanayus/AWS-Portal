
export const useFormat = (data) => {
    const finalData = [];
    const serviceCondition = {
      events: "eventbridge",
    };
    Object.keys(data).map((value) => {
      data[value].map((value) => {
        value.region = value.ResourceARN.split(":")[3];
        value.serviceName = serviceCondition[value.ResourceARN.split(":")[2]] ?? value.ResourceARN.split(":")[2];
        value.resourceType = value.ResourceARN.split(":")[5].split("/")[0];
        value.Tags.map((tagValue) => {
          if (tagValue.Key === "owner") {
            value.owner = tagValue.Value;
          }
        });
        (value.isChoose = false), finalData.push(value);
      });
    });
    return finalData;
  };