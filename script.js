
document.addEventListener("DOMContentLoaded", function () {

  // 1. 모바일 메뉴 열기 / 닫기
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "메뉴 닫기" : "메뉴 열기"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
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
  const form = document.getElementById("diagnosisForm");
  const result = document.getElementById("diagnosisResult");

  if (form && result) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const ageSelect = document.getElementById("retireAge");
      const age = parseInt(
        ageSelect.options[ageSelect.selectedIndex].text,
        10
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
        monthlyCost <= 0 ||
        assets < 0
      ) {
        result.innerHTML =
          "<p>입력한 정보를 다시 확인해 주세요.</p>";
        return;
      }

      // 1억원 = 10,000만원
      const totalAssets = assets * 10000;

      // 자산으로 충당할 수 있는 생활비 개월 수
      const months = totalAssets / monthlyCost;

      const years = months / 12;

      const yearsText = years.toFixed(1);

      let message;

      if (assets === 0) {
        message = "보유 자산이 없습니다. 연금과 은퇴소득을 함께 점검해 보세요.";
      } else {
        message =
          "입력하신 자산으로 월 생활비를 단순 충당할 경우 약 " +
          yearsText +
          "년입니다.";
      }

      result.innerHTML =
        "<p><strong>" +
        age +
        "세 은퇴 가정</strong></p>" +
        "<p>" +
        message +
        "</p>" +
        "<p>예상 보유자산: " +
        assets.toLocaleString("ko-KR") +
        "억원 / 월 생활비: " +
        monthlyCost.toLocaleString("ko-KR") +
        "만원</p>";
    });
  }

  // 3. 하단 연도 자동 표시
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
