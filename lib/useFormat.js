import moment from "moment";

export const useFormat = (data) => {
  const finalData = [];
  const serviceCondition = {
    events: "eventbridge",
  };
  const allRegionCondition = ["cloudfront", "s3"];
  const tagCondition = ["owner", "createdAt"];
  Object.keys(data).map((value) => {
    data[value].map((value) => {
      value.serviceName = serviceCondition[value.ResourceARN.split(":")[2]] ?? value.ResourceARN.split(":")[2];
      value.region = allRegionCondition.includes(value.serviceName) ? "Coverage All" : value.ResourceARN.split(":")[3] === "" ? "-" : value.ResourceARN.split(":")[3];
      value.resourceType = value.ResourceARN.split(":")[5].split("/")[0];
      value.Tags.map((tagValue) => {
        if (tagCondition.includes(tagValue.Key)) {
          value[tagValue.Key] = tagValue.Value;
        }
      });
      value.owner ??= "-";
      value.createdAt ??= "2000-01-01T00:00:00Z";
      value.isChoose = false;
      finalData.push(value);
    });
  });
  finalData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  finalData.map((value) => {
    value.createdAt = value.createdAt != "2000-01-01T00:00:00Z" ? moment(value.createdAt).format("DD/MM/YYYY HH:mm") : "-";
    if (value.createdAt === "Invalid date") {
      value.createdAt = "-";
    }
  });
  return finalData;
};
