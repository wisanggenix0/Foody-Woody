const navLink = document.getElementById("navigasi");

const loginCard = document.getElementById("loginCard");
const registerCard = document.getElementById("registerCard");

const imgSourceWrapper = document.getElementById("imgSourceWrapper");
const minusBtnAll = document.querySelectorAll(".minusBtn");
const plusBtnAll = document.querySelectorAll(".plusBtn");
const addToCartAll = document.querySelectorAll(".addToCart");
const quantityAll = document.querySelectorAll(".quantity");

// Cart
const cartButton = document.getElementById("cartButton");
const cartWrapper = document.getElementById("cartWrapper");
const cartCardWrapper = document.getElementById("cartCardWrapper");
const cancelCart = document.getElementById("cancelCart");
const checkout = document.getElementById("checkout");
const productNameAll = document.querySelectorAll(".productName");
const priceAll = document.querySelectorAll(".price");

// No items an total
const noItems = document.getElementById("noItems");
const total = document.getElementById("total");


function hambtn() {
  navLink.classList.toggle("translate-x-32");
  navLink.classList.toggle("translate-x-max");
}

function closeBtn() {
  navLink.classList.toggle("translate-x-32");
  navLink.classList.toggle("translate-x-max");
}

function changeCard() {
  registerCard.classList.toggle("hidden");
  registerCard.classList.toggle("flex");
  loginCard.classList.toggle("hidden");
  loginCard.classList.toggle("flex");
  return false;
}

function imgSource() {
  imgSourceWrapper.classList.toggle("h-0");
  imgSourceWrapper.classList.toggle("h-fit");
  return false;
}

minusBtnAll.forEach((minusBtn, index) => {
  minusBtn.addEventListener("click", (e) => {
    const currentValue = parseInt(quantityAll[index].innerHTML);
    const newValue = currentValue - 1;

    // Replace Value
    if (currentValue == 0) {
      return;
    }
    quantityAll[index].innerHTML = newValue;
    console.log((quantityAll[index].innerHTML = newValue));
  });
});

plusBtnAll.forEach((plusBtn, index) => {
  plusBtn.addEventListener("click", (e) => {
    const currentValue = parseInt(quantityAll[index].innerHTML);
    const newValue = currentValue + 1;

    quantityAll[index].innerHTML = newValue;
    console.log((quantityAll[index].innerHTML = newValue));
  });
});

// Fungsi membuat card cart
const cardCart = (productName, price, quantity, total) => {
  // konversi integer ke string
  const subTotal = total.toLocaleString('id-ID', {style: 'currency', currency: 'IDR',} );

  const card = `<div class="w-full shadow-md rounded bg-slate-100 flex justify-evenly py-2 cardCart">
                <h1>${productName}</h1>
                <h1>${price}</h1>
                <h1>x <span>${quantity}</span></h1>
                <h1>= <span class="subTotal">${subTotal}</span></h1>
                <button class="bg-red-500 text-slate-200 hover:bg-primary-300 py-1 px-2 rounded shadow transition duration-300 delay-100 deleteFromCart">
                del
                </button>
              </div>`;
  
              return card
};

// Fungsi Rp. 12.000 => 12000
const toInteger = (price, quantity) => {
  let stringPrice = price.replace("Rp.", "");
  let intergerPrice = parseInt(stringPrice.replace(".", ""));
  return intergerPrice * quantity;
};

addToCartAll.forEach((addToCart, index) => {
  addToCart.addEventListener("click", () => {
    const name = productNameAll[index].innerHTML;
    const price = priceAll[index].innerHTML;
    const currentValue = parseInt(quantityAll[index].innerHTML);
    const subTotal = toInteger(price, currentValue);

    if (currentValue == 0) {
      return;
    }

    const card = cardCart(name, price, currentValue, subTotal);
    cartCardWrapper.insertAdjacentHTML('afterbegin', card)

    if(total.classList.contains('hidden')) {

      noItems.classList.toggle('hidden')
      total.classList.toggle('hidden')
      checkout.classList.toggle('hidden')
    }

    quantityAll[index].innerHTML = 0
    totals()
    // console.log(name);
    // console.log(price);
    // console.log(currentValue);
  });
});

//membuat Fungsi Tombol Cart
cartButton.addEventListener("click", () => {
  const deleteFromCart = document.querySelectorAll(".deleteFromCart");

  cartWrapper.classList.toggle("h-screen");
  
  deleteFromCart.forEach(btnDelete => {
    btnDelete.addEventListener('click', (e) => {
      e.preventDefault()
      const cardCart = e.target.parentNode
      cardCart.remove()
      totals()
      const totalElement = document.querySelector('#total span');
      if(totalElement.innerHTML == 'Rp&nbsp;0,00') {

        total.classList.toggle('hidden')
        noItems.classList.toggle('hidden')
        checkout.classList.toggle('hidden')
      }
  })
})
});

cancelCart.addEventListener("click", () => {
  cartWrapper.classList.toggle("h-screen");
});

checkout.addEventListener("click", () => {
  const cardElement = document.querySelectorAll('.cardCart')
  
  cardElement.forEach(card => {
    card.remove()
  })

  total.classList.toggle('hidden')
  noItems.classList.toggle('hidden')
  checkout.classList.toggle('hidden')

});

function toIntegerTotals(subTotal) {
  let subTotalString = subTotal.replace(/\D/g, "");
  let subTotalInterger = parseInt(subTotalString.toString().slice(0 , -2)); 

  return subTotalInterger
}

const totals = () => {

  const integerSubTotals = []

  const subTotals = document.querySelectorAll('.subTotal');
  const totalElement = document.querySelector('#total span');

  subTotals.forEach(subTotal => {
    integerSubTotals.push(toIntegerTotals(subTotal.innerHTML))
  })

  const total = integerSubTotals.reduce( (accumulator, currentValue) =>
      accumulator + currentValue, 0
  );


  totalElement.innerHTML = total.toLocaleString('id-ID', {style: 'currency', currency: 'IDR',} );

}

