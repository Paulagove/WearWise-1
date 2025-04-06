// Función para mostrar los artículos en el inventario
function loadInventory() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const inventoryList = document.getElementById('inventory-list');

    inventoryList.innerHTML = ''; // Limpiar la lista antes de cargarla

    inventory.forEach((item, index) => {
        const inventoryItem = document.createElement('div');
        inventoryItem.classList.add('inventory-item');
        inventoryItem.setAttribute('data-category', item.category);
        inventoryItem.setAttribute('onclick', `showItemDetails(${index})`);

        // Creamos la etiqueta <img> para mostrar la imagen
        const img = document.createElement('img');
        img.src = item.img; // Utilizamos la imagen en Base64 almacenada
        img.alt = item.title;

        inventoryItem.appendChild(img);
        inventoryList.appendChild(inventoryItem);
    });
}

// Filtrar los artículos según el tipo
const filterButtons = document.querySelectorAll('.filter-menu button');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterItems(filter);
    });
});

// Función para filtrar artículos
function filterItems(filter) {
    const inventoryItems = document.querySelectorAll('.inventory-item');
    inventoryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Función para mostrar el modal con los detalles del artículo
function showItemDetails(index) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const item = inventory[index];

    document.getElementById('modal-image').src = item.img; // Mostrar la imagen en el modal
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-description').textContent = item.description;
    document.getElementById('item-details-modal').classList.add('active');
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('item-details-modal').classList.remove('active');
}

// Inicializar: cargar los artículos desde localStorage
loadInventory();
