// 메인 페이지
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

var slider;
if (document.querySelector(".product-slider")) {
  slider = document.querySelector(".product-slider");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    slider.scrollLeft = scrollLeft - walk;
  });
}

// 상품 상세 페이지
// URL 파라미터 읽기 함수
function getParameterByName(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// 구매 페이지로 이동하면서 URL 파라미터로 상품 정보 전달
function goToCheckout() {
  const name = document.getElementById("productName").textContent;
  const price = document
    .getElementById("productPrice")
    .textContent.replace("₩", "")
    .replace(/,/g, "")
    .trim();
  const quantity = document.getElementById("quantity").value;

  window.location.href = `checkout.html?name=${encodeURIComponent(
    name
  )}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(
    quantity
  )}`;
}

// 숫자에 천 단위 ',' 추가 함수
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 결제 페이지
// 총 결제 금액 업데이트 함수
function updateTotal() {
  const basePrice = parseInt(
    document.getElementById("totalPrice").textContent.replace(/[₩,]/g, ""),
    10
  );
  const discount = parseInt(
    document.getElementById("discountAmount").textContent.replace(/[₩,]/g, ""),
    10
  );
  const shipping = 1000;

  const total = basePrice + shipping - discount;
  document.getElementById("totalAmount").textContent = `₩${formatNumber(
    total
  )}`;
}

// 쿠폰 적용 함수
function applyCoupon() {
  const couponValue =
    document.getElementById("coupon").value === "1000" ? 1000 : 0;
  document.getElementById("discountAmount").textContent = `₩${formatNumber(
    couponValue
  )}`;
  updateTotal();
}
