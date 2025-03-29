document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const editButtons = document.querySelectorAll('.edit-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const addProductBtn = document.querySelector('.add-product-btn');
    
    const deleteModal = document.getElementById('deleteModal');
    const productModal = document.getElementById('productModal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    
    const confirmDeleteBtn = document.querySelector('.confirm-delete-btn');
    const saveProductBtn = document.querySelector('.save-product-btn');
    
    const deleteProductName = document.getElementById('deleteProductName');
    const deleteProductId = document.getElementById('deleteProductId');
    const modalTitle = document.getElementById('modalTitle');
    
    // Funciones para mostrar/ocultar modales
    function showDeleteModal(productName, productId) {
      deleteProductName.textContent = productName;
      deleteProductId.textContent = productId;
      deleteModal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Evita scroll en el fondo
    }
    
    function showProductModal(isEdit, productData) {
      if (isEdit) {
        modalTitle.textContent = 'Editar Producto';
        // Rellenar el formulario con los datos del producto
        if (productData) {
          document.getElementById('productName').value = productData.name;
          document.getElementById('productPrice').value = productData.price;
          document.getElementById('productCategory').value = productData.category;
          document.getElementById('productCollection').value = productData.collection;
          document.getElementById('productStock').value = productData.stock;
          document.getElementById('productDescription').value = productData.description;
          
          // Marcar las tallas según los datos
          if (productData.sizes) {
            const sizeCheckboxes = document.querySelectorAll('input[name="sizes"]');
            sizeCheckboxes.forEach(checkbox => {
              if (productData.sizes.includes(checkbox.value)) {
                checkbox.checked = true;
              }
            });
          }
        }
      } else {
        modalTitle.textContent = 'Agregar Nuevo Producto';
        // Limpiar el formulario
        document.getElementById('productForm').reset();
      }
      
      productModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
    
    function closeModals() {
      deleteModal.style.display = 'none';
      productModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    
    // Event Listeners para abrir modales
    deleteButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const productCard = this.closest('.admin-product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        const productId = productCard.querySelector('.product-id').textContent.split(':')[1].trim();
        showDeleteModal(productName, productId);
      });
    });
    
    editButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const productCard = this.closest('.admin-product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
        const productStock = parseInt(productCard.querySelector('.product-stock').textContent.split(':')[1].trim().split(' ')[0]);
        const productCategory = productCard.querySelector('.product-category').textContent.split(':')[1].trim();
        
        // Datos simulados para la edición
        const productData = {
          name: productName,
          price: productPrice,
          stock: productStock,
          category: productCategory.toLowerCase().replace(' ', '-'),
          collection: 'urban', // Valor de ejemplo
          description: 'Descripción de ejemplo para ' + productName,
          sizes: ['M', 'L'] // Valores de ejemplo
        };
        
        showProductModal(true, productData);
      });
    });
    
    addProductBtn.addEventListener('click', function() {
      showProductModal(false);
    });
    
    viewButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const productCard = this.closest('.admin-product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        alert(`Vista detallada de: ${productName}\n\nAquí se mostraría la información completa del producto en una interfaz detallada.`);
      });
    });
    
    // Event Listeners para cerrar modales
    closeButtons.forEach(button => {
      button.addEventListener('click', closeModals);
    });
    
    cancelButtons.forEach(button => {
      button.addEventListener('click', closeModals);
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(e) {
      if (e.target === deleteModal) {
        closeModals();
      }
      if (e.target === productModal) {
        closeModals();
      }
    });
    
    // Acciones de los botones dentro de los modales
    confirmDeleteBtn.addEventListener('click', function() {
      const productId = deleteProductId.textContent;
      const productName = deleteProductName.textContent;
      
      // Aquí iría la lógica para eliminar el producto (AJAX o fetch a tu backend)
      console.log(`Eliminando producto: ${productName} (ID: ${productId})`);
      
      // Simulación de eliminación (elimina la tarjeta del DOM)
      const productCards = document.querySelectorAll('.admin-product-card');
      productCards.forEach(card => {
        const cardId = card.querySelector('.product-id').textContent.split(':')[1].trim();
        if (cardId === productId) {
          card.remove();
        }
      });
      
      // Mostrar notificación
      showNotification(`Producto "${productName}" eliminado correctamente`, 'success');
      
      closeModals();
    });
    
    saveProductBtn.addEventListener('click', function(e) {
      e.preventDefault(); // Prevenir envío del formulario
      
      // Obtener los datos del formulario
      const form = document.getElementById('productForm');
      const formData = new FormData(form);
      
      // Verificar campos requeridos
      const productName = formData.get('productName');
      const productPrice = formData.get('productPrice');
      const productCategory = formData.get('productCategory');
      const productStock = formData.get('productStock');
      
      if (!productName || !productPrice || !productCategory || !productStock) {
        showNotification('Por favor, completa todos los campos requeridos', 'error');
        return;
      }
      
      // Recopilar tallas seleccionadas
      const selectedSizes = [];
      document.querySelectorAll('input[name="sizes"]:checked').forEach(checkbox => {
        selectedSizes.push(checkbox.value);
      });
      
      // Crear objeto con los datos del producto
      const productData = {
        name: productName,
        price: parseFloat(productPrice),
        category: productCategory,
        collection: formData.get('productCollection'),
        stock: parseInt(productStock),
        sizes: selectedSizes,
        description: formData.get('productDescription')
      };
      
      // Aquí iría la lógica para guardar el producto (AJAX o fetch a tu backend)
      console.log('Guardando producto:', productData);
      
      // Simulación de guardado
      const isEdit = modalTitle.textContent === 'Editar Producto';
      
      if (isEdit) {
        showNotification(`Producto "${productName}" actualizado correctamente`, 'success');
      } else {
        // Simular la adición de un nuevo producto
        addNewProductCard(productData);
        showNotification(`Producto "${productName}" agregado correctamente`, 'success');
      }
      
      closeModals();
    });
    
    // Función para agregar una nueva tarjeta de producto al DOM
    function addNewProductCard(product) {
      const productsGrid = document.querySelector('.products-grid');
      
      // Generar un ID único
      const productId = `PROD-${Math.floor(Math.random() * 10000)}`;
      
      // Crear elemento de tarjeta
      const productCard = document.createElement('div');
      productCard.className = 'admin-product-card';
      
      // HTML interno de la tarjeta
      productCard.innerHTML = `
        <div class="product-img">
          <img src="${product.image || '/static/images/placeholder.png'}" alt="${product.name}">
          <div class="admin-actions">
            <button class="edit-btn"><i class="fas fa-edit"></i></button>
            <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
            <button class="view-btn"><i class="fas fa-eye"></i></button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <div class="product-details">
            <p class="product-id">ID: ${productId}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-stock">Stock: ${product.stock} unidades</p>
            <p class="product-category">Categoría: ${getCategoryName(product.category)}</p>
          </div>
        </div>
      `;
      
      // Insertar al inicio de la grilla
      productsGrid.insertBefore(productCard, productsGrid.firstChild);
      
      // Añadir event listeners a los nuevos botones
      const newEditBtn = productCard.querySelector('.edit-btn');
      const newDeleteBtn = productCard.querySelector('.delete-btn');
      const newViewBtn = productCard.querySelector('.view-btn');
      
      newEditBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showProductModal(true, {
          name: product.name,
          price: product.price,
          category: product.category,
          collection: product.collection,
          stock: product.stock,
          description: product.description,
          sizes: product.sizes
        });
      });
      
      newDeleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showDeleteModal(product.name, productId);
      });
      
      newViewBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        alert(`Vista detallada de: ${product.name}\n\nAquí se mostraría la información completa del producto en una interfaz detallada.`);
      });
    }
    
    // Función auxiliar para obtener el nombre de la categoría
    function getCategoryName(categoryValue) {
      const categories = {
        'ropa-hombre': 'Ropa Hombre',
        'ropa-mujer': 'Ropa Mujer',
        'tenis': 'Tenis',
        'accesorios': 'Accesorios'
      };
      
      return categories[categoryValue] || categoryValue;
    }
    
    // Sistema de notificaciones
    function showNotification(message, type = 'info') {
      // Crear elemento de notificación
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.innerHTML = `
        <div class="notification-content">
          <span>${message}</span>
          <button class="close-notification">&times;</button>
        </div>
      `;
      
      // Añadir al DOM
      document.body.appendChild(notification);
      
      // Mostrar con animación
      setTimeout(() => {
        notification.classList.add('show');
      }, 10);
      
      // Auto-cerrar después de 5 segundos
      setTimeout(() => {
        closeNotification(notification);
      }, 5000);
      
      // Event listener para cerrar manualmente
      const closeBtn = notification.querySelector('.close-notification');
      closeBtn.addEventListener('click', () => {
        closeNotification(notification);
      });
    }
    
    function closeNotification(notification) {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
    
    // Agregar estilos para notificaciones al head
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1100;
        max-width: 350px;
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.3s, transform 0.3s;
      }
      
      .notification.show {
        opacity: 1;
        transform: translateY(0);
      }
      
      .notification-content {
        padding: 15px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
      }
      
      .notification.success .notification-content {
        background-color: #4CAF50;
        color: white;
      }
      
      .notification.error .notification-content {
        background-color: #F44336;
        color: white;
      }
      
      .notification.info .notification-content {
        background-color: #2196F3;
        color: white;
      }
      
      .close-notification {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
      }
    `;
    
    document.head.appendChild(notificationStyles);
    
    // Inicializar controlador de rangos de precio
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    
    if (priceRange && priceValue) {
      priceRange.addEventListener('input', function() {
        priceValue.textContent = '$' + this.value;
      });
    }
  });