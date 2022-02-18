import fetch from "isomorphic-unfetch";

export const deleteResources = async (setResources, resources, selectedData) => {
  console.log(selectedData);
  let abortController = new AbortController();
  try {
    const response = await fetch("/api/delete-resoures", {
      signal: abortController.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedData),
    });
    const data = await response.json();
    setResources(resources.filter((item) => item.resourceId !== selectedData[0].resourceId));
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
