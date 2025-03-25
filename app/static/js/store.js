document.addEventListener('DOMContentLoaded', () => {
    // Price range slider
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
  
    priceRange.addEventListener('input', () => {
      priceValue.textContent = `$${priceRange.value}`;
    });
  
    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view');
    quickViewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.product-price span:first-child').textContent;
        
        // Here you would typically open a modal or navigate to a product detail page
        alert(`Vista rápida de: ${productTitle}\nPrecio: ${productPrice}`);
      });
    });
  
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.product-price span:first-child').textContent;
        
        // Here you would typically add the item to the cart
        alert(`Añadido al carrito: ${productTitle}\nPrecio: ${productPrice}`);
      });
    });
  
    // Filtering and sorting (basic placeholder logic)
    const categoryCheckboxes = document.querySelectorAll('.filters-sidebar input[type="checkbox"]');
    const sortSelect = document.getElementById('sort-select');
  
    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', filterProducts);
    });
  
    sortSelect.addEventListener('change', sortProducts);
  
    function filterProducts() {
      const selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.id);
  
      const productCards = document.querySelectorAll('.product-card');
      
      productCards.forEach(card => {
        if (selectedCategories.length === 0) {
          card.style.display = 'block';
        } else {
          const shouldShow = selectedCategories.some(category => 
            card.textContent.toLowerCase().includes(category.toLowerCase())
          );
          card.style.display = shouldShow ? 'block' : 'none';
        }
      });
    }
  
    function sortProducts() {
      const sortValue = sortSelect.value;
      const productGrid = document.querySelector('.products-grid');
      const products = Array.from(document.querySelectorAll('.product-card'));
  
      products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.product-price span').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.product-price span').textContent.replace('$', ''));
  
        switch(sortValue) {
          case 'Precio: Menor a Mayor':
            return priceA - priceB;
          case 'Precio: Mayor a Menor':
            return priceB - priceA;
          default:
            return 0;
        }
      });
  
      products.forEach(product => productGrid.appendChild(product));
    }
  });