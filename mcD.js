// items array
  const menuItems = [
    { name: 'Big Mac', price: 50, category: 'burger', image: 'McDonalds/imgs/bigmac.jpg' },
    { name: 'Chicken McNuggets (9 stk.)', price: 28, category: 'sides', image: 'McDonalds/imgs/nuggets.jpg' },
    { name: 'Pommes Frites', price: 25, category: 'sides', image: 'McDonalds/imgs/fries.jpg' },
    { name: 'Cheese Burger', price: 12, category: 'burger', image: 'McDonalds/imgs/cheeseburger.jpg' },
    { name: 'McChicken', price: 35, category: 'burger', image: 'McDonalds/imgs/mcChicken.jpg' },
    { name: 'McBacon', price: 32, category: 'burger', image: 'McDonalds/imgs/McBacon.jpg' },
    { name: 'Coca-Cola', price: 20, category: 'drinks', image: 'McDonalds/imgs/cola.jpg' },
    { name: 'Sundae', price: 10, category: 'dessert', image: 'McDonalds/imgs/sundae.jpg' },
    { name: 'McFlurry', price: 25, category: 'dessert', image: 'McDonalds/imgs/mcFlurry.jpg' }, 
    { name: 'Fanta', price: 20, category: 'drinks', image: 'McDonalds/imgs/fanta.jpg' },
    { name: 'Frappe KitKat', price: 28, category: 'drinks', image: 'McDonalds/imgs/frappe.jpg' },
    { name: 'Mixed Team Box', price: 53, category: 'sides', image: 'McDonalds/imgs/mixedTeamBox.jpg' },
    { name: 'Homestyle Kylling Bacon', price: 48, category: 'burger', image: 'McDonalds/imgs/homestyleBacon.jpg' },
    { name: 'Chocolade Muffin', price: 18, category: 'dessert', image: 'McDonalds/imgs/chocMuffin.jpg' },
    { name: 'Sukker Donut', price: 12, category: 'dessert', image: 'McDonalds/imgs/sukkerDonut.jpg' },
    { name: 'Chocolade Donut', price: 12, category: 'dessert', image: 'McDonalds/imgs/chocDonut.jpg' },
  ];

  let orderNumber = 1;
  const cartListPopup = document.getElementById('cart-list-popup');
  const cartTotalPopup = document.getElementById('cart-total-popup');

  // Display menu items
  const menu = document.getElementById('menu-category');

  function displayMenu(category) {
    menu.innerHTML = '';
    menuItems
      .filter(item => category === 'all' || item.category === category)
      .forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-md-3'; 
        const card = document.createElement('div');
        card.className = 'menu-card';
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.name;
        image.width = 200;
        card.appendChild(image);
        const itemName = document.createElement('p');
        itemName.textContent = item.name;
        card.appendChild(itemName);
        const itemPrice = document.createElement('p');
        itemPrice.textContent = `${item.price} kr.`;
        itemPrice.style.fontWeight = 'bold';
        card.appendChild(itemPrice);
        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.addEventListener('click', () => addToCart(item));
        card.appendChild(addButton);
        col.appendChild(card);
        menu.appendChild(col);
      });
  }

  displayMenu('all'); // Display all items initially

  // Cart items
  const cartItems = [];

  // Add item to cart
  function addToCart(item) {
    cartItems.push(item);
    updateCartPopup();
  }

function updateCartPopup() {
    cartListPopup.innerHTML = '';
    let total = 0;
    cartItems.forEach((item, index) => {
        const itemTotalPrice = item.price * (item.quantity || 1);
        total += itemTotalPrice;

        const listItem = document.createElement('li'); 

        const quantityLabel = document.createElement('span');
        listItem.appendChild(quantityLabel);

        listItem.innerHTML = `<strong>[${item.quantity || 1}]</strong> ${item.name} - <strong>${item.price} kr.</strong> `;

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => changeQuantity(index, 1));
        listItem.appendChild(increaseButton);

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => changeQuantity(index, -1));
        listItem.appendChild(decreaseButton);

        cartListPopup.appendChild(listItem);
    });
    cartTotalPopup.textContent = `Total: ${total} kr.`;
}


 // Remove item from the cart
 function removeCartItem(index) {
    cartItems.splice(index, 1);
    updateCartPopup();
  }

  // Change item quantity in the cart
  function changeQuantity(index, amount) {
    if (cartItems[index].quantity === undefined) {
        cartItems[index].quantity = 1;
    }
    cartItems[index].quantity += amount;

    // Remove item if quantity becomes zero
    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }
    
    updateCartPopup();
}

  // Toggle cart popup visibility
  function toggleCartPopup() {
    const cartPopup = document.getElementById('cart-popup');
    if (cartPopup.style.display === 'block') {
      cartPopup.style.display = 'none';
    } else {
      cartPopup.style.display = 'block';
    }
  }

// Place order
function placeOrder() {
    if (cartItems.length > 0) {
        alert(`Order placed successfully! Your order number is ${orderNumber}`);
        document.getElementById('current-order-number').textContent = orderNumber + 1; // + 1 for the next order number
        orderNumber++;
        cartItems.length = 0; // Clear cart
        updateCartPopup();
        toggleCartPopup(); // Close cart popup after placing order
    } else {
        alert('Your cart is empty. Add items to the cart before placing an order.');
    }
}


  // Cancel order
  function cancelOrder() {
    cartItems.length = 0; // Clear cart
    updateCartPopup();
    toggleCartPopup(); // Close cart popup after canceling order
    alert('Order canceled successfully!');
  }

  // Function to filter menu items based on category
  function filterCategory(category) {
    displayMenu(category);
  }
