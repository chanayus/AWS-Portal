import fetch from "isomorphic-unfetch";

export const deleteResources = async (selectedData, callback) => {
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
    callback({ data, status: response.status });
  } catch (err) {
    callback({data: [], status: '400'});
  }
};
