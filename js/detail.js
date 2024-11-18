// JSON 파일에서 상품 데이터 가져오기
fetch("./data/products.json")
  .then((response) => response.json())
  .then((data) => {
    const productName = getParameterByName("name");
    const product = data.find((item) => item.name === productName);

    if (product) {
      document.getElementById("productName").textContent = product.name;
      document.getElementById("productPrice").textContent = `₩${product.price}`;
      document.getElementById("productImage").src = `./img/${product.image}`;

      // 줄바꿈을 HTML에서 표시하도록 변환
      document.getElementById("productDescription").innerHTML =
        product.description.replace(/\n/g, "<br>");
    }
  })
  .catch((error) =>
    console.error("상품 데이터를 불러오는 중 오류가 발생했습니다:", error)
  );

// 상품 선택
window.addEventListener("load", () => {
  const productName = document.getElementById("productName").textContent;
  const eventData = {
    event_name: "view_iten",
    ep_category: "ecommerce",
    ep_action: "상품 상세",
  };

  const transaction = {
    currency: "KRW",
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
      price: 6000,
      ip_first: "상품 매개변수1",
      ip_second: "상품 매개변수2",
    },
  ];

  sendGAEcommerce(eventData, transaction, items);
});
