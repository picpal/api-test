async function callApi(endpoint, method = "GET", body = null, headers = {}) {
  // 요청하는 URL로 수정
  const url = "https:/dev...." + endpoint;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
}
