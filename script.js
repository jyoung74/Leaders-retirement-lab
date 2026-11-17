
const $ = (id) => document.getElementById(id);

// 현재 연도 표시
$("year").textContent = new Date().getFullYear();

// 모바일 메뉴 열기 / 닫기
$("menuButton").addEventListener("click", () => {
  $("nav").classList.toggle("open");
});

// 메뉴 선택 후 닫기
document.querySelectorAll("#nav a").forEach((a) => {
  a.addEventListener("click", () => {
    $("nav").classList.remove("open");
  });
});

// 금액 표시
function formatMan(value) {
  const n = Math.max(0, Math.round(value));
  const eok = Math.floor(n / 10000);
  const man = n % 10000;

  if (eok && man) {
    return `${eok.toLocaleString("ko-KR")}억 ${man.toLocaleString("ko-KR")}만원`;
  }

  if (eok) {
    return `${eok.toLocaleString("ko-KR")}억원`;
  }

  return `${man.toLocaleString("ko-KR")}만원`;
}

// 은퇴자금 계산
function calculate() {
  const age = Number($("age").value);
  const retireAge = Number($("retireAge").value);
  const monthlyCost = Number($("monthlyCost").value);
  const monthlyPension = Number($("monthlyPension").value);
  const assets = Number($("assets").value);
  const years = Number($("years").value);

  const values = [
    age,
    retireAge,
    monthlyCost,
    monthlyPension,
    assets,
    years
  ];

  if (
    !values.every(Number.isFinite) ||
    age < 18 ||
    retireAge < age ||
    retireAge > 100 ||
    monthlyCost < 0 ||
    monthlyPension < 0 ||
    assets < 0 ||
    years < 1 ||
    years > 60
  ) {
    alert("입력값을 확인해 주세요.");
    return;
  }

  // 월 생활비 부족액
  const monthlyGap = Math.max(
    0,
    monthlyCost - monthlyPension
  );

  // 은퇴기간 전체 부족자금
  const totalNeed = monthlyGap * 12 * years;

  // 준비된 금융자산 차감
  const remainingGap = Math.max(
    0,
    totalNeed - assets
  );

  $("monthlyGap").innerHTML =
    `${monthlyGap.toLocaleString("ko-KR")}<span>만원</span>`;

  $("totalGap").textContent = formatMan(remainingGap);
}

// 계산 버튼 실행
$("calculate").addEventListener("click", calculate);

// 초기 계산
calculate();
