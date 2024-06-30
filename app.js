// Placeholder product data
const productData = [
    { name: 'product1', imgPath: 'https://via.placeholder.com/140' },
    { name: 'product2', imgPath: 'https://via.placeholder.com/120' },
    { name: 'product3', imgPath: 'https://via.placeholder.com/100' },
    { name: 'product4', imgPath: 'https://via.placeholder.com/80' },
    { name: 'product5', imgPath: 'https://via.placeholder.com/60' }
  ];
  
  const products = [];
  const totalRounds = 25;
  let currentRounds = totalRounds;
  
  // Product constructor
  function Product(name, imgPath) {
    this.name = name;
    this.imgPath = imgPath;
    this.timesShown = 0;
    this.timesClicked = 0;
    products.push(this);
  }
  
  // Initialize products
  productData.forEach(data => new Product(data.name, data.imgPath));
  
  // Randomly generate three unique products
  function getRandomProducts() {
    const selectedProducts = [];
    while (selectedProducts.length < 3) {
      const randomIndex = Math.floor(Math.random() * products.length);
      const product = products[randomIndex];
      if (!selectedProducts.includes(product)) {
        selectedProducts.push(product);
        product.timesShown++;
      }
    }
    return selectedProducts;
  }
  
  // Display products in the DOM
  function displayProducts() {
    const imageContainer = document.querySelector('.image-container');
    imageContainer.innerHTML = '';
    const selectedProducts = getRandomProducts();
    selectedProducts.forEach(product => {
      const imgElement = document.createElement('img');
      imgElement.src = product.imgPath;
      imgElement.alt = product.name;
      imgElement.dataset.name = product.name;
      imageContainer.appendChild(imgElement);
    });
  }
  
  // Handle product click
  function handleClick(event) {
    if (event.target.tagName === 'IMG') {
      const clickedProductName = event.target.dataset.name;
      const clickedProduct = products.find(product => product.name === clickedProductName);
      clickedProduct.timesClicked++;
      currentRounds--;
      if (currentRounds > 0) {
        displayProducts();
      } else {
        document.getElementById('view-results').disabled = false;
        document.querySelector('.image-container').removeEventListener('click', handleClick);
      }
    }
  }
  
  // Display results
  function displayResults() {
    const resultsList = document.querySelector('#results ul');
    resultsList.innerHTML = '';
    products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.name} had ${product.timesClicked} votes, and was seen ${product.timesShown} times.`;
      resultsList.appendChild(listItem);
    });
  }
  
  // Initialize app
  document.querySelector('.image-container').addEventListener('click', handleClick);
  document.getElementById('view-results').addEventListener('click', displayResults);
  
  // Display initial products
  displayProducts();
  