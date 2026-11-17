
const $ = (id) => document.getElementById(id);

$("year").textContent = new Date().getFullYear();

$("menuButton").addEventListener("click", () => {
  $("nav").classList.toggle("open");
});

document.querySelectorAll("#nav a").forEach(a => {
  a.addEventListener("click", () => $("nav").classList.remove("open"));
});

function wonMan(value) {
  const n = Math.max(0, Math.round(value));
  const eok = Math.floor(n / 10000);
  const man = n % 10000;

  if (eok && man) return `${eok.toLocaleString("ko-KR")}억 ${man.toLocaleString("ko-KR")}만원`;
  if (eok) return `${eok.toLocaleString("ko-KR")}억원`;
  return `${man.toLocaleString("ko-KR")}만원`;
}

function calculate() {
  const age = Number($("age").value);
  const retireAge = Number($("retireAge").value);
  const cost = Number($("monthlyCost").value);
  const pension = Number($("monthlyPension").value);
  const assets = Number($("assets").value);
  const years = Number($("years").value);

  if (![age, retireAge, cost, pension, assets, years].every(Number.isFinite) ||
      age < 18 || retireAge < age || retireAge > 100 ||
      cost < 0 || pension < 0 || assets < 0 || years < 1 || years > 60) {
    alert("입력값을 확인해 주세요. 은퇴 예정 나이는 현재 나이보다 커야 합니다.");
    return;
  }

  const monthlyGap = Math.max(0, cost - pension);
  const totalNeed = monthlyGap * 12 * years;
  const netGap = Math.max(0, totalNeed - assets);

  $("monthlyGap").innerHTML =
    `${monthlyGap.toLocaleString("ko-KR")}<span>만원</span>`;

  $("totalGap").textContent = wonMan(netGap);
}

$("calculate").addEventListener("click", calculate);
calculate();
