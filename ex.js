function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Function to call the API and fetch a random product
  function fetchRandomProduct(apiUrl) {
    return new Promise((resolve, reject) => {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.json();
        })
        .then((data) => {
          resolve(data.productNumber); // Modify this according to your API response structure
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
  // Function to generate an array of unique random products
  function generateRandomProducts(apiUrl, numProducts) {
    return new Promise((resolve, reject) => {
      const uniqueProducts = new Set();
      const result = [];
  
      function fetchNextProduct() {
        if (result.length === numProducts) {
          resolve(result);
          return;
        }
  
        fetchRandomProduct(apiUrl)
          .then((productNumber) => {
            if (productNumber !== null && !uniqueProducts.has(productNumber)) {
              uniqueProducts.add(productNumber);
              result.push(productNumber);
            }
            fetchNextProduct();
          })
          .catch((error) => {
            reject(error);
          });
      }
  
      fetchNextProduct();
    });
  }
  
  // Example usage:
  const apiUrl = 'your_api_endpoint_here';
  const numProductsToLoad = 5; // Change this according to the desired number of products
  generateRandomProducts(apiUrl, numProductsToLoad)
    .then((randomProducts) => {
      console.log(randomProducts); // Array of unique random products
    })
    .catch((error) => {
      console.error('Error generating random products:', error);
    });