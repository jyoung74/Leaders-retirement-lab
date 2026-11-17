
const calculateButton = document.getElementById("calculate");

calculateButton.addEventListener("click", function () {
  const monthly = Number(document.getElementById("monthly").value);
  const pension = Number(document.getElementById("pension").value);
  const result = document.getElementById("result");

  if (
    !Number.isFinite(monthly) ||
    !Number.isFinite(pension) ||
    monthly < 0 ||
    pension < 0
  ) {
    result.textContent = "올바른 금액을 입력해 주세요.";
    return;
  }

  const shortage = Math.max(0, monthly - pension);

  if (shortage === 0) {
    result.textContent = "월 연금으로 희망 생활비를 충당할 수 있습니다.";
  } else {
    result.textContent = `월 부족 생활비: ${shortage.toLocaleString("ko-KR")}만원`;
  }
});
