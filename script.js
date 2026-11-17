
document.addEventListener("DOMContentLoaded", function () {
  // 1. 모바일 메뉴
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const opened = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(opened));
      menuToggle.setAttribute(
        "aria-label",
        opened ? "메뉴 닫기" : "메뉴 열기"
      );
      menuToggle.textContent = opened ? "×" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "메뉴 열기");
        menuToggle.textContent = "☰";
      });
    });
  }

  // 2. 은퇴 준비 진단 계산기
  const diagnosisForm = document.getElementById("diagnosisForm");
  const diagnosisResult = document.getElementById("diagnosisResult");

  if (diagnosisForm && diagnosisResult) {
    diagnosisForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const age = Number(
        document.getElementById("retireAge").value
      );

      const monthlyCost = Number(
        document.getElementById("monthlyCost").value
      );

      const assets = Number(
        document.getElementById("assets").value
      );

      if (
        !Number.isFinite(age) ||
        !Number.isFinite(monthlyCost) ||
        !Number.isFinite(assets) ||
        age < 40 ||
        age > 90 ||
        monthlyCost <= 0 ||
        assets < 0
      ) {
        diagnosisResult.innerHTML =
          "<span class='result-label'>CHECK INPUT</span>" +
          "<p>입력값을 다시 확인해 주세요.</p>";
        return;
      }

      const monthlyAssets = assets * 10000;
      const annualCost = monthlyCost * 12;

      const years = monthlyAssets / annualCost;

      let message;

      if (assets === 0) {
        message = "현재 입력한 금융자산이 없습니다. 연금과 소득을 함께 점검해 보세요.";
      } else {
        message =
          "현재 금융자산으로 월 생활비를 단순 환산하면 약 " +
          years.toFixed(1) +
          "년을 충당할 수 있습니다.";
      }

      diagnosisResult.innerHTML =
        "<span class='result-label'>RETIREMENT CHECK RESULT</span>" +
        "<p>" +
        age +
        "세 은퇴 가정<br>" +
        message +
        "</p>";
    });
  }

  // 3. 현재 연도 표시
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
