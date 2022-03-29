import qs from "qs";

/**
 * Helper to get Strapi URL
 * @param {string}
 * @returns {string}
 */
export function getStrapiURL(path = "") {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
        }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} 
 * @param {Object} 
 * @param {Object} 
 * @returns Parsed API call response
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
    const mergedOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    }

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
        `/api${path}${queryString ? `?${queryString}` : ''}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
        console.error(response.statusText);
        throw new Error('An error occurred please try again')
    }

    const data = await response.json();
    return data;
}
