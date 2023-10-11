const baseUrl = "http://localhost:8080";

const useFetch = () => {
  const email = sessionStorage.getItem('email')
  const password = sessionStorage.getItem('password')

  return {
    fetch: async(url = "/", method = "GET", body = {}, headers={}) => {
      if(url !== '/' && url !== '/login') {
        body = {
          ...body,
          email,
          password
        }
      }
      return fetch(baseUrl + url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(body),
      });
    },
  };
};


export default useFetch;
