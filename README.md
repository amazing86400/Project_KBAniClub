# KB 애니클럽

## 프로젝트 개요
KB 애니클럽은 애니메이션 상품을 판매하기 위해 설계된 전자상거래 웹사이트입니다. Google Analytics 4(GA4)를 활용하여 사용자 행동 데이터를 수집하고 분석할 수 있도록 이벤트 태깅을 구현하였습니다. 이 프로젝트는 웹과 앱 모두에서 원활히 작동하는 반응형 웹으로 개발되었습니다.

👀 [웹사이트 구경하기](http://1.234.66.62/ga_kbshin/aniclub/main.html)

<br>

## 주요 기능
- **애니메이션 상품 판매**: 다양한 애니메이션 상품을 소개하고 구매할 수 있는 플랫폼입니다.
- **전자상거래 기능**:
  - 상품 목록 보기
  - 상품 상세 정보 확인
  - 결제 진행
  - 구매 완료 페이지 제공
- **GA4 이벤트 태깅**: 각 사용자 행동(상품 선택, 결제, 구매 완료 등)에 대해 GA4 이벤트가 기록되도록 설정
- **반응형 웹**: 웹 브라우저와 모바일 환경 모두에서 최적화된 사용자 경험 제공

<br>

## 개발 기간
- **2024년 11월 17일** ~ **2024년 11월 19일**

<br>

## 사용 기술
- **프론트엔드**: HTML, CSS, JavaScript
- **GA4 통합**: Google Tag Manager 및 dataLayer 활용
- **JSON 데이터**: 상품 정보를 동적으로 로드하기 위해 JSON 파일 사용

<br>

## 프로젝트 파일 구조
```
📂 프로젝트 루트
├── main.html       # 메인 페이지
├── detail.html     # 상품 상세 페이지
├── checkout.html   # 결제 페이지
├── complete.html   # 구매 완료 페이지
├── css/styles.css  # 스타일시트
├── data/products.json # 상품 데이터
├── img/imgs.jpeg   # 상품 이미지
├── js/
│   ├── common.js     # 공통 스크립트
│   ├── analytics.js  # GA4 이벤트 처리
│   ├── detail.js     # 상세 페이지 스크립트
│   ├── checkout.js   # 결제 페이지 스크립트
```

<br>

## 주요 페이지 설명
1. **메인 페이지 (main.html)**
   - 애니메이션 상품 목록을 표시합니다.
   - 클릭 이벤트로 상품 상세 페이지로 이동합니다.

2. **상품 상세 페이지 (detail.html)**
   - 선택된 상품의 상세 정보를 표시합니다.
   - "구매하기" 버튼을 통해 결제 페이지로 이동합니다.

3. **결제 페이지 (checkout.html)**
   - 장바구니 내역, 결제 정보 및 쿠폰 적용 기능을 제공합니다.
   - "구매하기" 버튼 클릭 시 구매 완료 페이지로 이동합니다.

4. **구매 완료 페이지 (complete.html)**
   - 구매가 성공적으로 완료되었음을 알리는 메시지를 표시합니다.

<br>

## GA4 이벤트 태깅 구현
- **페이지뷰 이벤트**: 사용자가 페이지를 방문할 때마다 GA4로 데이터 전송
- **클릭 이벤트**: 버튼 클릭 등 주요 사용자 행동을 기록
- **전자상거래 이벤트**: 상품 선택, 결제, 구매 완료 등 전자상거래와 관련된 이벤트 데이터 전송

<br>

## 스크린샷
![애니클럽_web](https://github.com/user-attachments/assets/40e6ef50-2315-4adc-b0d5-11ccb9b29f41)


