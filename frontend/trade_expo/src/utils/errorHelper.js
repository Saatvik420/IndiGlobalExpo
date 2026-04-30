/**
 * Extracts a human-readable error message from an Axios error response.
 * Specifically handles Spring Boot error objects: { path, error, message, status }
 * 
 * @param {Error} err - The error object from Axios
 * @param {string} fallback - Fallback message if no message can be extracted
 * @returns {string} The extracted error message
 */
export const getErrorMessage = (err, fallback = 'An unexpected error occurred.') => {
  if (!err) return fallback;
  
  const errorData = err.response?.data;
  
  if (!errorData) {
    return err.message || fallback;
  }
  
  if (typeof errorData === 'string') {
    return errorData;
  }
  
  if (typeof errorData === 'object') {
    // Handle Spring Boot / common error object structures
    return errorData.message || errorData.error || fallback;
  }
  
  return fallback;
};
