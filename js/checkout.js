let productName;
let productPriceString;
let productPrice;
let productQuantity;
let totalAmount;

document.addEventListener("DOMContentLoaded", () => {
  // 결제 수단 선택 이벤트
  const paymentMethods = document.querySelector(".payment-methods");
  let selectedText = "";

  paymentMethods.addEventListener("change", () => {
    const selectedInput = document.querySelector(
      '.payment-methods input[type="radio"]:checked'
    );
    if (selectedInput) {
      selectedText = selectedInput.parentElement.textContent.trim();
      btnClickEvent("결제 수단", selectedText);
    }
  });

  // URL에서 전달받은 상품 정보 설정
  productName = getParameterByName("name");
  productPriceString = getParameterByName("price");
  productPrice = parseInt(productPriceString.replace(/,/g, ""), 10);
  productQuantity = parseInt(getParameterByName("quantity"), 10);
  totalAmount = productPrice * productQuantity;

  // products.json에서 상품 이미지 가져오기
  fetch("./data/products.json")
    .then((response) => response.json())
    .then((data) => {
      const product = data.find((item) => item.name === productName);
      if (product) {
        document.getElementById("productImage").src = `./img/${product.image}`;
      } else {
        console.error("해당 상품을 찾을 수 없습니다.");
      }
    })
    .catch((error) => {
      console.error("상품 데이터를 불러오는 중 오류가 발생했습니다:", error);
    });

  // 상품 정보 및 가격 설정
  document.getElementById("productName").textContent = productName;
  document.getElementById("productPrice").textContent = `₩${formatNumber(
    productPrice
  )}`;
  document.getElementById("productQuantity").textContent = `${productQuantity}`;
  document.getElementById("totalPrice").textContent = `₩${formatNumber(
    totalAmount
  )}`;
  document.getElementById("totalAmount").textContent = `₩${formatNumber(
    totalAmount + 1000
  )}`;

  // 구매하기 버튼 클릭 이벤트
  document.querySelector(".buy-now")?.addEventListener("click", () => {
    const productImage = document.getElementById("productImage").src;
    const name = document.getElementById("productName").textContent;
    const price = document
      .getElementById("productPrice")
      .textContent.replace("₩", "")
      .replace(/,/g, "")
      .trim();
    const quantity = document.getElementById("productQuantity").textContent;
    const value = document
      .getElementById("totalAmount")
      .textContent.replace("₩", "")
      .replace(/,/g, "")
      .trim();
    const coupon =
      document.getElementById("coupon").selectedOptions[0].textContent;

    window.location.href = `complete.html?image=${encodeURIComponent(
      productImage
    )}&name=${encodeURIComponent(name)}&price=${encodeURIComponent(
      price
    )}&quantity=${encodeURIComponent(quantity)}&value=${encodeURIComponent(
      value
    )}&coupon=${encodeURIComponent(coupon)}`;
  });
});

// 결제 완료 이벤트 함수
function clickCheckout() {
  const discount = parseInt(
    document.getElementById("discountAmount").textContent.replace(/[₩,]/g, ""),
    10
  );
  const coupon = document.getElementById("coupon");
  const selectedText = document
    .querySelector('.payment-methods input[type="radio"]:checked')
    ?.parentElement.textContent.trim();

  const eventData = {
    event_name: "add_payment_info",
    ep_category: "ecommerce",
    ep_action: "상품 결제",
  };

  const transaction = {
    currency: "KRW",
    value: totalAmount + 1000,
    coupon: coupon?.selectedOptions[0]?.textContent,
    payment_type: selectedText,
    shipping: 1000,
  };

  const items = [
    {
      item_id: productName,
      item_name: productName,
      item_brand: productName.substring(0, productName.length - 2),
      item_category: "애니메이션",
      item_category2: "일본",
      item_category3: "만화",
      item_category4: "15세",
      item_category5: productName.substring(0, productName.length - 2),
      coupon: coupon?.selectedOptions[0]?.textContent,
      discount: discount,
      price: productPrice,
      quantity: productQuantity,
      ip_first: "상품 매개변수1",
      ip_second: "상품 매개변수2",
    },
  ];

  sendGAEcommerce(eventData, transaction, items);
}
