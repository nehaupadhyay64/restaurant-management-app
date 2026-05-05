let app = document.getElementById("app");

function showLogin() {
  app.innerHTML = `
    <h1>🍽️ DineEase Login</h1>
    <input id="user" placeholder="Username"><br>
    <input id="pass" type="password" placeholder="Password"><br>
    <button onclick="login()">Login</button>
    <p id="msg"></p>
  `;
}

function login() {
  let user = document.getElementById("user").value.trim();
  let pass = document.getElementById("pass").value.trim();

  if (user === "" || pass === "") {
    alert("Please fill all fields");
    return;
  }
  showMenu();
}

function showMenu() {
  app.innerHTML = `
    <h1>🍜Menu</h1>

    <input type="text" id="search" placeholder="Search food..." onkeyup="searchFood()">
    <button onclick="filterFood('all')">All</button>
    <button onclick="showAddPage()">More Items</button>

    <div id="menuItems">

      <!--  basePrice pass kiya -->
      <div class="food-card noodles" onclick="selectFood('Noodles', 100)">
        <img src="https://i.pinimg.com/1200x/a0/62/b7/a062b7046e8d291c9417a99e777cb121.jpg">
        <h3>Noodles </h3>
      </div>

      <div class="food-card pizza" onclick="selectFood('Pizza', 200)">
        <img src="https://i.pinimg.com/736x/7b/94/b5/7b94b5b4e3f9a45cd5d7d88ff2c33589.jpg">
        <h3>Pizza </h3>
      </div>

      <div class="food-card fries" onclick="selectFood('French Fries', 100)">
        <img src="https://i.pinimg.com/1200x/d3/35/2b/d3352b478577a405415310a24c226601.jpg">
        <h3>French Fries </h3>
      </div>

      <div class="food-card pasta" onclick="selectFood('Pasta', 100)">
        <img src="https://i.pinimg.com/1200x/31/bd/88/31bd88cc2c87124bc29a9009609be881.jpg">
        <h3>Pasta </h3>
      </div>

      <div class="food-card burger" onclick="selectFood('Burger', 100)">
        <img src="https://i.pinimg.com/736x/38/79/0b/38790bd653e68cc477a19f50b8a3f693.jpg">
        <h3>Burger </h3>
      </div>

      <div class="food-card coffee" onclick="selectFood('Coffee', 100)">
        <img src="https://i.pinimg.com/1200x/e9/6f/2c/e96f2c40e00e2d32e9d16a79776ad18b.jpg">
        <h3>Coffee </h3>
      </div>

    </div>
  `;
 foods.forEach((item,index) => {
    document.getElementById("menuItems").innerHTML += `
      <div class="food-card" onclick="selectFood('${item.name}', ${item.full})">
        <img src="${item.img}">
        <h3>${item.name}</h3>
      </div>
    `;
  });  
}

function showAddPage() {
  app.innerHTML = `
    <h1>Add New Item</h1>

    <input id="img" placeholder="Image URL"><br><br>
    <input id="name" placeholder="Food Name"><br><br>
    <input id="full" type="number" placeholder="Full Price"><br><br>
    <input id="half" type="number" placeholder="Half Price"><br><br>

    <button onclick="addItem()">Show</button>
    <button onclick="showMenu()">Back</button>
  `;
}
let foods = JSON.parse(localStorage.getItem("foods")) || [];

function addItem() {
  let img = document.getElementById("img").value;
  let name = document.getElementById("name").value;
  let full = Number(document.getElementById("full").value);
  let half = Number(document.getElementById("half").value);

  if (!img || !name || !half || !full) {
    alert("Fill all fields");
    return;
  }

  let newFood = { name, img, half, full };

  foods.push(newFood);
  localStorage.setItem("foods", JSON.stringify(foods));

  showMenu();
}

function searchFood() {
  let input = document.getElementById("search").value.toLowerCase();
  let items = document.querySelectorAll(".food-card");

  items.forEach(item => {
    let text = item.innerText.toLowerCase();

    if (text.includes(input)) {
      item.style.display = "inline-block";
    } else {
      item.style.display = "none";
    }
  });
}

function filterFood(category) {
  let items = document.querySelectorAll(".food-card");

  items.forEach(item => {
    item.style.display = "inline-block";
  });
}


let price = 0;

function selectFood(food, basePrice) {
  app.innerHTML = `
    <h1>${food}</h1>
    <button onclick="choosePrice(${basePrice})">Full Price ₹${basePrice}</button>
    <button onclick="choosePrice(${basePrice/2})">Half Price ₹${basePrice/2}</button>
  `;

  app.innerHTML += `<button onclick="showMenu()">Back to Menu</button>`;
}

function choosePrice(p) {
  price = p;
  showPayment();
}

function showPayment() {
  app.innerHTML = `
    <h1>💳 Payment</h1>
    <input id="amount" type="number" placeholder="Enter amount"><br>
    <button onclick="pay()">Pay</button>
    <p id="result"></p>  
  `;
}

function pay() {
  let amt = Number(document.getElementById("amount").value);

  if (amt < price) {
    app.innerHTML = `
      <h1>💳 Payment</h1>
      <p>⚠️ Please add more money</p>
      <button onclick="showPayment()">Try Again</button>
    `;
  } 
  
  else if (amt > price) {
    let change = amt - price;

    app.innerHTML = `
      <h1>💳 Payment</h1>
      <p>💰 Your change is ₹${change}</p>
      <p>Do you want to keep changing?</p>

      <button onclick="keepChange()">Keep Change</button>
      <button onclick="showMenu()">Add More Items</button>
      <button onclick="showMenu()">Back to Menu</button>
    `;
  } 
  
  else {
    app.innerHTML = `
      <h1>🎉 Order Confirmed 🎉</h1>
      <button onclick="showMenu()">Back to Menu</button>
    `;
  }
}

showLogin();