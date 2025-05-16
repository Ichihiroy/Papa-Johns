let selectedProduct = null;
let modalCount = 1;
let modalPrice = 0;
let basket = [];

const modalProduct = document.getElementById("modalProduct");
const modalProductBar = document.getElementById("modalProductBar");
const modalProductBar_p = document.getElementById("modalProductBar_p");

function showMenu() {
  const navMenu = document.getElementById("navMenu");

  navMenu.classList.toggle("hidden");
  navMenu.classList.toggle("active");
}

const allProducts = document.getElementById("allProducts");

function filterProducts() {
  let code = "";
  data.category.map((item) => {
    code += `
            <h2 class="text-black text-[24px] lg:text-[42px] my-4 uppercase">${item.category}</h2>
                    <div id="${item.category}" class="products grid grid-cols-2 md:grid-cols-3 sm:grid-cols-2 gap-6 lg:basis-[60%]">

                    </div> 
        `;
  });
  allProducts.innerHTML += code;
}

filterProducts();

const products = document.getElementsByClassName("products");

function showAllProduct() {
  for (const key of products) {
    let kod = "";
    console.log(key.id);

    data[key.id].map((item, i) => {
      kod += `
                <div onclick="toggleAccardion('${item.id}','${
        key.id
      }')" class="rounded-xl group hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] overflow-hidden w-full flex flex-col justify-between">  
                        <div class="">
                            <img src="${
                              item.img
                            }" alt="" class="w-full object-cover rounded-xl">
                        </div>
                        <div class="p-3 mb-3 relative">
                            <h3  class="lg:text-[16px] text-[12px] head_p ">${
                              item.title
                            }</h3>
                            <p class="text-[#72747A] text-[10px] lg:text-[14px] font-medium py-2">${
                              item.composition ? item.composition : ""
                            }</p>
                            <p class="text-[#212529] text-xs">${Number(
                              item.price
                            ).toFixed(2)} AZN${
        item.variations.length != 0 ? "-dən" : ""
      } </p>
                        </div>
                        <button class="opacity-0 group-hover:opacity-100 text-xs uppercase bg-[#cfeb0b] py-1  w-[80%] text-center mx-auto block rounded-[50px] border border-gray-950 my-3 ">Səbətə
                         əlave et</button>
                </div>

            `;
    });
    key.innerHTML = kod;
  }
}
showAllProduct();

function showCategory(li, category) {
  const elem = document.querySelectorAll("#list li");

  for (const element of elem) {
    element.classList.remove("activeli");
  }

  li.classList.add("activeli");

  const allProducts = document.querySelectorAll(".products");
  const headings = document.querySelectorAll("#allProducts h2");
  const kampaniyalar = document.querySelector("#allProducts > div");

  if (!category) {
    if (kampaniyalar) kampaniyalar.classList.remove("hidden");

    for (const product of allProducts) {
      product.style.display = "grid";
    }

    for (const heading of headings) {
      heading.style.display = "block";
    }
    return;
  }

  for (const product of allProducts) {
    product.style.display = "none";
  }

  for (const heading of headings) {
    heading.style.display = "none";
  }

  if (kampaniyalar) kampaniyalar.classList.add("hidden");

  const selectedCategory = document.getElementById(category);
  if (selectedCategory) {
    selectedCategory.style.display = "grid";

    const categoryHeading = selectedCategory.previousElementSibling;
    if (categoryHeading && categoryHeading.tagName === "H2") {
      categoryHeading.style.display = "block";
    }
  }
}

function handleLocation() {
  const iframe = document.getElementById("iframe");
  iframe.classList.toggle("hidden");
}



function toggleAccardion(id, categoryId) {
  selectedProduct = data[categoryId].find((item) => item.id == id);

  modalCount = 1;
  modalPrice = parseFloat(selectedProduct.price);

  if (categoryId === "pizza") {
    modalProductBar_p.style.display = "block";
    modalProductBar.style.display = "none";

    modalProductBar_p.innerHTML = `

      <div class="bg-[#f6f6f6] min-h-[650px] lg:rounded-t-[40px] ">
                <div class="absolute right-6 top-5" >
                 <button onclick="toggleModal()" class="">
                 <i class="fa-solid fa-x text-[25px]  "></i>
                </button>
              </div>
                <div class="flex flex-col lg:flex-row gap-[20px]  pt-10 px-10 ">
                  <div class="modal_title  md:flex flex-row lg:flex-col gap-4 lg:w-[281px]  ">
                    <div class=" w-full md:w-[200px] lg:w-full   ">
                      <img class="object-cover rounded-[15px] " src="${selectedProduct.img}" alt="">
                    </div>
                   <div>
                    <h3 class="head_p text-black text-[18px] md:text-[32px] lg:text-[24px] min-w-[1200px]:text-[32] pt-4 px-2">${selectedProduct.title}</h3>
                    <p class="text-[#212529] text-[14px] font-sans font-medium px-2">${selectedProduct.composition}</p>
                   </div>
                  </div>
                  <div class="modal_variations">
                    <div  class="variation_size">
                      <p class="text-[12px] md:text-[14px] lg:text-[18px] head_p py-4"><span class="text-black" >Ölçü</span> <span class="text-[#2d5d2a]">(Mütləq)</span></p>
                      <div class="size_detail flex items-center gap-[30px]">
                        <div id="delsize" class="border border-[#2d5d2a] px-3 py-1 rounded-lg">
                          <p class="text-[#72747a] head_p text-[14px] py-2">${selectedProduct.variations[0]?.size}</p>
                          <p class="head_p text-[14px] text-[#2d5d2a]">${selectedProduct.variations[0]?.price}</p>
                        </div>
                        <div class="open_detail flex gap-[10px]">
                          <p id="del_p"  onclick="openDetailSize('${id}', '${categoryId}')"  class="text-[12px] md:text-[14px] text-[#c9c9c9] font-sans ">Diger variant secin ➔</p>
                          <div id="close_detailSize" class="opacity-0  flex flex-wrap gap-[20px]">
                             
                          
                          </div>
                        </div>
                      </div>
                    </div>
                    <div  class="variation_type">
                      <p class="text-[12px] md:text-[14px] lg:text-[18px] head_p py-4"><span class="text-black" >Xemirin novunu secin</span> <span class="text-[#2d5d2a]">(Mütləq)</span></p>
                      <div  class="size_detail flex items-center gap-[30px]">
                        <div id="type_detail" class="border border-[#2d5d2a] px-3 py-3 w-[120px] rounded-lg">
                          <p class="text-[#72747a] head_p text-[14px] py-2">${selectedProduct.variations[0]?.type}</p>
                        </div>
                        <div class="open_detail">
                          <p id="del_type" onclick="openDetailType('${id}', '${categoryId}')" class="text-[12px] md:text-[14px] text-[#c9c9c9] font-sans">Diger variant secin ➔</p>
                           <div id="close_detailType"  class=" opacity-0  py-2 flex flex-wrap gap-[20px]">
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
               <div class="flex  gap-[30px] justify-end lg:px-10 px-2">
                <div class="flex gap-1 md:gap-4 items-center">
                <button onclick="updateModalCount(-1)" class="p-1 border border-gray-200 rounded-[50%] w-[30px] h-[30px] ">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <p id="modalCountDisplay" class="text-[#2d5d2a] font-sans font-bold">${modalCount}</p>
                <button onclick="updateModalCount(1)" class=" p-1 border border-gray-200 rounded-[50%] w-[30px] h-[30px]" >
                  <i class="fa-solid fa-plus"></i>
                </button>
                <p id="modalPriceDisplay" class="text-[#2d5d2a] text-[14px] lg:text-[18px] head_p">${modalPrice}AZN</p>
                
              </div>
              <div class="">
                <button onclick="addBasket('${id}' ,'${categoryId}')" class="uppercase bg-[#cfeb0b] w-[200px] p-1  text-center mx-auto block rounded-[50px] border border-gray-950 my-3">
                SƏBƏTƏ Əlave et ➔
              </button>
            </div>
               </div>
    `;

    toggleModal();
    return;
  }

  modalProductBar_p.style.display = "none";
  modalProductBar.style.display = "block";

  modalProductBar.innerHTML = `
      <div class="rounded-lg "> 
         <div class="flex justify-end items-center  ">
           <button onclick="toggleModal()" class="pr-4 pt-4">
            <i class="fa-solid fa-xmark w-[24px] h-[24px]"></i>
          </button>
         </div>
      </div>
       <div class=" ">
      <div class="bg-[#fff] rounded-[40px] p-2">
        <div>
          <img src="${
            selectedProduct.img
          }" alt="" class="w-full object-cover overflow-hidden rounded-[40px]" />
        </div>
         <div class="p-3 mb-3 relative">
        <h3 class="text-[24px] head_p">${selectedProduct.title}</h3>
        <p class="text-[#616265] text-[16px] font-medium py-2">
          ${!selectedProduct.composition ? "" : selectedProduct.composition}
        </p>
      </div>
      </div>
        </div>
        <div class="flex justify-between p-3 items-center">
       <p id="modalPriceDisplay" class="text-[#2d5d2a] text-[14px] lg:text-[18px] head_p">${modalPrice} AZN</p>
        <div class="flex gap-1 items-center">
          <button onclick="updateModalCount(-1)" class="p-1 border border-gray-200 rounded-[50%] w-[30px] h-[30px] ">
            <i class="fa-solid fa-minus"></i>
          </button>
          <p id="modalCountDisplay" class="text-[#2d5d2a] font-sans font-bold">${modalCount}</p>
          <button onclick="updateModalCount(1)" class=" p-1 border border-gray-200 rounded-[50%] w-[30px] h-[30px]" >
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
       <div>
        <button onclick="addBasket('${id}' ,'${categoryId}')" class="uppercase bg-[#cfeb0b] p-1 w-[200px] text-center mx-auto block rounded-[50px] border border-gray-950 my-3">
        SƏBƏTƏ Əlave et ➔
      </button>
       </div>
      </div>
      </div>
      </div>`;

  toggleModal();
}

function toggleModal() {
  modalProduct.classList.toggle("toggle-act");
  modalProductBar.classList.toggle("toggle-act");
}

function openDetailSize(id, categoryId) {
  const delsize = document.getElementById("delsize");
  const del_p = document.getElementById("del_p");
  const close_detailSize = document.getElementById("close_detailSize");

  close_detailSize.classList.remove("opacity-0");
  close_detailSize.classList.add("opacity-1");

  const selectedProduct = data[categoryId].find((item) => item.id == id);
  console.log(selectedProduct);

  close_detailSize.innerHTML = selectedProduct.variations
    .filter((variation) => variation.type === "Ənənəvi")
    .map(
      (variation) =>
        `
      <div onclick="selectSize('${variation.price}' ,'${variation.size}')" class="border border-[#2d5d2a] px-3 py-1 rounded-lg">
        <p class="text-[#72747a] head_p text-[12px] md:text-[14px] py-2">${variation.size}</p>
        <p class="head_p text-[12px] md:text-[14px] text-[#2d5d2a]">${variation.price} AZN</p>
      </div>

      `
    )
    .join("");

  delsize.style.display = "none";
  del_p.style.display = "none";
}

function openDetailType(id, categoryId) {
  const close_detailType = document.getElementById("close_detailType");
  const type_detail = document.getElementById("type_detail");
  const del_type = document.getElementById("del_type");

  close_detailType.classList.remove("opacity-0");
  close_detailType.classList.add("opacity-1");

  const selectedProduct = data[categoryId].find((item) => item.id == id);

  let types = [];

  selectedProduct.variations
    .map((variation) => variation.type)
    .filter((type) => {
      if (!types.includes(type)) {
        types.push(type);
        return true;
      }
      return false;
    })
    .map(
      (type) => `
      <div class="border border-[#2d5d2a] px-3 py-1 rounded-lg">
        <p class="text-[#72747a] head_p text-[12px] md:text-[14px] py-2">${type}</p>
      </div>
    `
    )
    .join("");

  close_detailType.innerHTML =
    types
      .map(
        (type) => `
    <div onclick="selectType('${type}')" class="border border-[#2d5d2a] px-3 py-1 rounded-lg">
        <p class="text-[#72747a] head_p text-[12px] md:text-[14px] py-2">${type}</p>
    </div>`
      )
      .join("") +
    `
    <div onclick="selectExtra(5)" class="border border-[#2d5d2a] px-3 py-1 rounded-lg">
        <p class="text-[#72747a] head_p text-[12px] md:text-[14px] py-2">Mozorella kenar</p>
        <p class="head_p text-[12px] md:text-[14px] text-[#2d5d2a]"> +5 AZN</p>
    </div>
    <div onclick="selectExtra(6)" class="border border-[#2d5d2a] px-3 py-1 rounded-lg">
        <p class="text-[#72747a] head_p text-[12px] md:text-[14px] py-2">Hot dog kenar</p>
        <p class="head_p text-[12px] md:text-[14px] text-[#2d5d2a]"> +6 AZN</p>
    </div>
`;

  type_detail.style.display = "none";
  del_type.style.display = "none";
}

function addBasket(id, categoryId) {
  modalProduct.classList.remove("toggle-act");
  const selectedProduct = data[categoryId].find((item) => item.id == id);

  const existingItem = basket.find((item) => item.id == id);

  if (existingItem) {
    existingItem.count += modalCount;
  } else {
    basket.push({
      id: selectedProduct.id,
      title: selectedProduct.title,
      size: selectedProduct.selectedSize
        ? selectedProduct.selectedSize.split(" - ")[0]
        : selectedProduct.size || " ",
      type: selectedProduct.selectedType || " ",
      price:
        (selectedProduct.selectedPrice || parseFloat(selectedProduct.price)) +
        (selectedProduct.selectedExtraPrice || 0),
      count: modalCount,
    });
  }
  console.log(basket);
  modalCount = 1;
  modalPrice = parseFloat(selectedProduct.price);

  renderBasket();
  updateMobileCart();
}

function goBack() {
  document.getElementById("basket").classList.remove("cart-overlay");
}

function showCart() {
  document.getElementById("basket").classList.add("cart-overlay");
}

function renderBasket() {
  const sebet = document.getElementById("sebet");
  const yekun = document.getElementById("yekun");
  const mobileCartBar = document.getElementById("mobile-cart-bar");

  const emptyBasketMessage = document.getElementById("emptyBasketMessage");
  const emptyBasketImage = document.getElementById("emptyBasketImage");

  const tesdiqBtn = document.getElementById("tesdiqBtn");

  if (!basket.length) {
    mobileCartBar.style.display = "none";
    emptyBasketMessage.style.display = "block";
    emptyBasketImage.style.display = "inline-block";
    tesdiqBtn.disabled = true;
    sebet.innerHTML = "";
    yekun.innerHTML = "";
    return;
  } else {
    mobileCartBar.style.display = "flex";
    emptyBasketMessage.style.display = "none";
    emptyBasketImage.style.display = "none";
    tesdiqBtn.disabled = false;
  }

  sebet.innerHTML = basket
    .map(
      (item) =>
        `
    <div class=" py-2 px-2">
            <div class="flex justify-between gap-5 items-baseline">
              <p class="text-black head_p text-[14px] ">${item.title} - ${
          item.size
        }</p>
               <button  onclick="removeProduct('${item.id}')" class="pr-4 pt-4">
               <i class="fa-solid fa-xmark w-[13px] h-[13px]"></i>
               </button>
            </div>
            <p class="text-black text-left text-[14px] font-medium font-sans"> ${
              item.type || " "
            }</p>
          <div class="flex py-2  justify-end gap-4">
            <div class="flex gap-2">
            <button onclick="updateCount('${
              item.id
            }', -1)"  class=" p-2 border flex justify-center items-center border-gray-200 rounded-[50%] w-[15px] h-[15px]" >
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="text-black text-[14px] head_p">${item.count}</span>
            <button onclick="updateCount('${
              item.id
            }', 1)"   class="p-2 border flex justify-center items-center border-gray-200 rounded-[50%] w-[15px] h-[15px]" >
              <i class="fa-solid fa-plus "></i>
             </button>
            </div>
            <p class="text-[#212529] head_p">${item.price * item.count} AZN</p>
          </div>
      </div>
    `
    )
    .join("");

  const totalPrice = basket.reduce(
    (sum, item) => (sum += item.price * item.count),
    0
  );
  yekun.innerHTML = `
    <div class="flex justify-between border-t border-t-[#212529] py-2">
    <p class="text-[#212529] font-medium font-sans text-md uppercase">Yekun </p>
    <p class="text-[#212529] font-medium font-sans text-md" >${totalPrice} AZN</p>
    </div>
    `;
  console.log(totalPrice);
}

function updateCount(id, amount) {
  const item = basket.find((item) => item.id == id);
  item.count += amount;

  if (item.count <= 0) {
    basket = basket.filter((product) => product.id !== id);
  }

  renderBasket();
  updateMobileCart();
}

function updateModalCount(amount) {
  modalCount += amount;

  if (modalCount < 1) {
    modalCount = 1;
  }

  modalPrice = parseFloat(selectedProduct.price) * modalCount;

  document.getElementById("modalCountDisplay").innerText = modalCount;
  document.getElementById("modalPriceDisplay").innerText = modalPrice + " AZN";
}

function removeProduct(id) {
  basket = basket.filter((item) => item.id !== id);

  renderBasket();
  updateMobileCart();
}

renderBasket();

function selectSize(price, size) {
  selectedProduct.selectedPrice = parseFloat(price);
  selectedProduct.selectedSize = size;
  updateModalPrice();
}

function selectType(type) {
  selectedProduct.selectedType = type;
}

function selectExtra(extraPrice) {
  if (!selectedProduct.selectedExtraPrice) {
    selectedProduct.selectedExtraPrice = 0;
  }

  if (selectedProduct.selectedExtraPrice === extraPrice) {
    selectedProduct.selectedExtraPrice = 0;
  } else {
    selectedProduct.selectedExtraPrice = extraPrice;
  }

  updateModalPrice();
}

function updateModalPrice() {
  modalPrice = selectedProduct.selectedPrice
    ? parseFloat(selectedProduct.selectedPrice)
    : parseFloat(selectedProduct.price);

  if (selectedProduct.selectedExtraPrice) {
    modalPrice += selectedProduct.selectedExtraPrice;
  }

  modalPrice *= modalCount;

  document.getElementById("modalPriceDisplay").innerText = modalPrice + " AZN";
}

function updateExtraPrice() {
  modalPrice = parseFloat(selectedProduct.price) * modalCount;

  if (selectedProduct.selectedExtraPrice) {
    modalPrice += selectedProduct.selectedExtraPrice;
  }

  document.getElementById("modalPriceDisplay").innerText = modalPrice + " AZN";
}

function updateMobileCart() {
  // const mobileCartBar = document.getElementById("mobile-cart-bar")
  const mobileCartCount = document.getElementById("mobile-cart-count");
  const mobileCartTotal = document.getElementById("mobile-cart-total");

  const totalPrice = basket.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const productCount = basket.length;

  if (productCount > 0) {
    // mobileCartBar.classList.remove("hidden")
    mobileCartCount.innerText = productCount;
    mobileCartTotal.innerText = totalPrice.toFixed(2) + "AZN";
  } else {
    // mobileCartBar.classList.add("hidden")
  }
}
