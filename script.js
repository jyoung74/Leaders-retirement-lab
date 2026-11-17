
document.addEventListener("DOMContentLoaded", function () {
  // 모바일 메뉴
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  // 은퇴 진단 계산
  const form = document.getElementById("diagnosisForm");
  const result = document.getElementById("diagnosisResult");

  if (form && result) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const retireAge = Number(
        document.getElementById("retireAge").value
      );

      const retirementYears = Number(
        document.getElementById("retirementYears").value
      );

      const monthlyCost = Number(
        document.getElementById("monthlyCost").value
      );

      const nationalPension = Number(
        document.getElementById("nationalPension").value || 0
      );

      const personalPension = Number(
        document.getElementById("personalPension").value || 0
      );

      const financialAssets = Number(
        document.getElementById("financialAssets").value || 0
      );

      const realEstate = Number(
        document.getElementById("realEstate").value || 0
      );

      const inputs = [
        retireAge,
        retirementYears,
        monthlyCost,
        nationalPension,
        personalPension,
        financialAssets,
        realEstate
      ];

      if (inputs.some(value => !Number.isFinite(value) || value < 0)) {
        alert("모든 항목에 0 이상의 숫자를 입력해 주세요.");
        return;
      }

      if (
        monthlyCost <= 0 ||
        retirementYears <= 0 ||
        retireAge <= 0
      ) {
        alert("은퇴 나이, 생활비, 필요 기간을 확인해 주세요.");
        return;
      }

      // 모든 금액 단위는 만원으로 환산
      const monthlyPension =
        nationalPension + personalPension;

      const monthlyShortage = Math.max(
        0,
        monthlyCost - monthlyPension
      );

      // 은퇴 기간 전체의 연금 차감 후 부족 생활비
      const totalRequired =
        monthlyShortage * 12 * retirementYears;

      // 금융자산은 억원 단위이므로 만원으로 환산
      const availableFinancialAssets =
        financialAssets * 10000;

      // 부동산은 별도 표시하고 자동 합산하지 않음
      const additionalRequired = Math.max(
        0,
        totalRequired - availableFinancialAssets
      );

      const assetSurplus = Math.max(
        0,
        availableFinancialAssets - totalRequired
      );

      // 금융자산으로 부족 생활비를 충당할 수 있는 기간
      const coverageYears = monthlyShortage > 0
        ? availableFinancialAssets / (monthlyShortage * 12)
        : retirementYears;

      const won = function (value) {
        return Math.round(value).toLocaleString("ko-KR");
      };

      let conclusion = "";

      if (monthlyShortage === 0) {
        conclusion =
          "입력한 연금 예상액이 월 생활비 이상입니다. 다만 연금 개시 시점과 수령 기간을 별도로 확인해야 합니다.";
      } else if (additionalRequired === 0) {
        conclusion =
          "입력한 금융자산으로 설정한 기간의 부족 생활비를 단순 계산상 충당할 수 있습니다.";
      } else {
        conclusion =
          "설정한 은퇴 기간을 충당하기 위해 추가 은퇴자금 마련이 필요합니다.";
      }

      result.innerHTML = `
        <h3 class="result-heading">나의 은퇴 준비 진단 결과</h3>

        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">은퇴 희망 나이</span>
            <strong class="result-value">${retireAge}세</strong>
          </div>

          <div class="result-item">
            <span class="result-label">은퇴 후 필요 기간</span>
            <strong class="result-value">${retirementYears}년</strong>
          </div>

          <div class="result-item">
            <span class="result-label">월 예상 생활비</span>
            <strong class="result-value">${won(monthlyCost)}만 원</strong>
          </div>

          <div class="result-item">
            <span class="result-label">국민연금 + 개인연금</span>
            <strong class="result-value">${won(monthlyPension)}만 원</strong>
          </div>

          <div class="result-item">
            <span class="result-label">월 부족 생활비</span>
            <strong class="result-value">${won(monthlyShortage)}만 원</strong>
          </div>

          <div class="result-item">
            <span class="result-label">보유 금융자산</span>
            <strong class="result-value">${won(availableFinancialAssets)}만 원</strong>
          </div>

          <div class="result-item">
            <span class="result-label">보유 부동산</span>
            <strong class="result-value">${realEstate.toLocaleString("ko-KR")}억 원</strong>
          </div>

          <div class="result-item">
            <span class="result-label">필요 기간 총 부족 생활비</span>
            <strong class="result-value">${won(totalRequired)}만 원</strong>
          </div>
        </div>

        <div class="result-highlight">
          <span class="result-label">추가로 필요한 은퇴자금</span>
          <strong>${won(additionalRequired)}만 원</strong>
          <span class="result-label">
            ${additionalRequired === 0
              ? "단순 계산상 금융자산으로 충당 가능"
              : "현재 금융자산 기준 부족 금액"}
          </span>
        </div>

        <p class="result-message">${conclusion}</p>

        <p class="result-message">
          금융자산으로 부족 생활비를 충당할 수 있는 기간:
          <strong>${coverageYears.toFixed(1)}년</strong>
        </p>

        ${assetSurplus > 0
          ? `<p class="result-message">설정 기간 충당 후 남는 금융자산: <strong>${won(assetSurplus)}만 원</strong></p>`
          : ""}

        <p class="result-disclaimer">
          ※ 간이 계산 결과입니다. 국민연금과 개인연금이 은퇴 시작 시점부터
          동일한 금액으로 지급된다고 가정했습니다.
          연금 개시 시점, 수령 기간, 세금, 물가상승률, 투자수익률,
          자산 인출 순서는 반영하지 않았습니다.
          부동산은 매각 또는 임대 수입을 반영하지 않았습니다.
        </p>
      `;

      result.hidden = false;

      result.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    });
  }

  // 푸터 연도
  const year = document.getElementById("currentYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
