import fetch from "isomorphic-unfetch";

export const deleteResources = async (selectedData, callback) => {
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
    console.log(data);
    callback();
  } catch (err) {
    console.log(err);
  }
};
