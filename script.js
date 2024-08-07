// Your users should be able to: 

// - Add items to the cart and remove them
// - Increase/decrease the number of items in the cart
// - See an order confirmation modal when they click "Confirm Order"
// - Reset their selections when they click "Start New Order"
// - View the optimal layout for the interface depending on their device's screen size
// - See hover and focus states for all interactive elements on the page



const addToCartButtons = document.querySelectorAll("#btn"); //allows one to select all buttons with the common id
const orderBtn = document.getElementById("orderBtn");
const message = document.getElementById("preOrderMessage");
let currentOrder = document.getElementById('order');
const orderbutton = document.getElementById("orderBtn");
let cakeImage = document.getElementById('preOrderImage');
let cart = []; //initializing the cart items to empty array

// Function to add an item to the cart
/*function addToCart(item) {
    cart.push({...item, quantity: 1});//adding new object(item) in the array cart
    //the object is set to come with a quantity of 1
  updateCartDisplay();//calls function updateCartDisplay
}*/
function addToCart(item) {
    // Find the item in the cart
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
        // If the item already exists, increase the quantity and update the total price
        existingItem.quantity++;
        existingItem.totalPrice = (existingItem.quantity * existingItem.price).toFixed(2);
    } else {
        // If the item doesn't exist, add it to the cart with quantity 1 and set total price
        cart.push({...item, quantity: 1, totalPrice: item.price.toFixed(2) });
    }

    updateCartDisplay(); // Update the cart display
}



// Function to display the items that are ordered
/*function updateCartDisplay() {
  if (cart.length === 0) { //checking if the cart is empty
    message.style.display = "block";//this is styling the message
    currentOrder.innerHTML = "";//display is empty when there are no items in the cart
  } else {
    message.style.display = "none";//removes the preorder message
    //below is a map function to iterate over each item in the cart array
    cakeImage.style.display = "none";//removing the cake img when an item is added into the list
    currentOrder.innerHTML = cart.map(item => `
      <div class="cart-item">
        ${item.name} - ${item.quantity} x $${item.price}
      </div>
    `).join("");
    //the part in quotes is the html structure of each item in the array
    //.join joins the strings generated by mmap function into a single string
  }
}*/
// Function to display the items that are ordered
function updateCartDisplay() {
    if (cart.length === 0) { // Check if the cart is empty
        message.style.display = "block"; // Show the message
        cakeImage.style.display = "block"; // Show the pre-order image
        currentOrder.innerHTML = ""; // Display is empty when there are no items in the cart
    } else {
        message.style.display = "none"; // Remove the pre-order message
        // Map function to iterate over each item in the cart array
        cakeImage.style.display = "none"; // Hide the pre-order image
        currentOrder.innerHTML = cart.map(item => `
      <div class="cart-item">
         <p> ${item.name} - ${item.quantity} x @$${item.price.toFixed(2)} $${item.totalPrice}</p>
         <button class="remove_item">X</button>
          
      </div>

  ` // The part in quotes is the HTML structure of each item in the array
        ).join(""); // It joins the strings generated by the map function into a single string
        // Add event listeners to the "Remove Item" buttons
        const removeButtons = document.querySelectorAll('.remove_item');
        removeButtons.forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }
}

// Function to remove an item from the cart
function removeItem(event) {
    // Retrieve the index of the item to be removed from the data attribute of the button
    const index = event.target.dataset.index;

    // Use splice to remove the item at the specified index from the cart array
    // The first argument of splice is the start index, and the second argument is the number of items to remove
    cart.splice(index, 1);

    // Call updateCartDisplay to refresh the cart display after removal
    updateCartDisplay();
}


// Function to make changes when add cart is clicked
addToCartButtons.forEach(button => { //using forEach because this function applies to all target buttons
    button.addEventListener('click', (event) => {
        const itemElement = event.target.closest('.item'); //find the closest element with class item(its the parent container that houses the  add to cart buttons and also other information about the dessert being orderred)
        const itemName = itemElement.querySelector("#dessertName").innerText;; //get the name of the dessert in the same container as the button
        const itemPrice = parseFloat(itemElement.querySelector("#price").innerText.replace('$', '')); //get price of the item and also remove dollar sign since I've used parsefloat for easier calculation
        addToCart({ name: itemName, price: itemPrice });; //add the element to the cart
    });
});

function showOrderConfirmation() {
    if (cart.length !== 0) {
        alert("Your order has been received!");
    } else {
        alert("please order your items!");
    }

}
orderbutton.addEventListener("click", showOrderConfirmation);