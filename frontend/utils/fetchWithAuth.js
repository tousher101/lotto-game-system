export default async function fetchWithAuth(url, options = {}) {
  const BASEURI = process.env.NEXT_PUBLIC_API_URI;
  
  const getAccessToken = () => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("token");
   
    if (!token || token === "null" || token === "undefined") return null;
    return token;
  };

  const createHeaders = (token) => {
    const headers = {
      ...(options.headers || {}),
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    };
    if (token) {
      
      headers["Authorization"] = `Bearer ${token.replace(/"/g, '')}`; 
    }
    return headers;
  };


  let currentToken = getAccessToken();
  let response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: createHeaders(currentToken),
  });

  
  if (response.status === 401 || response.status === 403) {
    console.warn("Token expired or invalid. Refreshing...");

    try {
      const refreshRes = await fetch(`${BASEURI}/api/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        const newAccessToken = refreshData;
       

        if (typeof window !== "undefined" && newAccessToken) {
          localStorage.setItem("token", newAccessToken);
          
      
          response = await fetch(url, {
            ...options,
            credentials: "include",
            headers: createHeaders(newAccessToken),
          });
        }
      } else {
        throw new Error("Refresh failed");
      }
    } catch (err) {
      if (typeof window !== "undefined") {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject("Session Expired");
    }
  }

 
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
}