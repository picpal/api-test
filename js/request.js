async function callApi (url, method = 'GET', body = null, headers = {}) {
    // Setting up the options for the fetch call
    const options = {
        method,
        headers: {
        'Content-Type': 'application/json',
        ...headers,
        },
    };

    // Adding body to the options if method is POST or PUT
    if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
    }

    try {
        // Performing the API call
        const response = await fetch(url, options);

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response as JSON
        const data = await response.json();

        return data;
    } catch (error) {
        // Handle errors
        console.error('Error during API call:', error);
        throw error;
    }
};
  