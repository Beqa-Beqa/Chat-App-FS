export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, body) => {
  const result = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body
  });

  const data = await result.json();

  if(!result.ok) {
    let message;

    if(data?.message) message = data.message;
    else message = data;

    return {error: true, message};
  }

  return data;
}