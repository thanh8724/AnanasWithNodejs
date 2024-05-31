console.log(">>> Design Chart");
function start() {
  showHiddenNavBar();
  // getAccountByIdUser(renderHeader);
  logOut();
}
start();
// function renderHeader(account) {
//   document.querySelector(".box__image--avatarAccount img").src =
//     account.avatarAccount;
//   document.querySelector(".name__account").textContent = account.nameAccount;
//   setTimeout(currentTime(), 60 * 60000);
// }
function showHiddenNavBar() {
  document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".hidden-show--navBar");
    const isMenuVisible = localStorage.getItem("menuVisible") === "true";
    if (isMenuVisible) {
      document.querySelector("body").classList.remove("navbar-active");
    } else {
      document.querySelector("body").classList.add("navbar-active");
    }
    toggleButton.addEventListener("click", function () {
      document.querySelector("body").classList.toggle("navbar-active");
      const newMenuVisibility = !document
        .querySelector("body")
        .classList.contains("navbar-active");
      localStorage.setItem("menuVisible", newMenuVisibility.toString());
    });
  });
  if (document.querySelector(".header__title--welcome"))
    document.querySelector(
      ".header__title--welcome"
    ).textContent = `Welcome back, ${
      "Quoc Thanh"
      // JSON.parse(localStorage.getItem("account")).nameAccount
    }🖖`; //-> render
}
// chart js start
function designChart1() {
  const labels = ["January", "February", "March", "April", "May"];
  let data = generateRandomData();
  // Get the canvas element
  const ctx = document.getElementById("myChart1").getContext("2d");
  // Create a line chart
  const myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "My Data",
          data: data,
          borderColor: "#de2e6c",
          backgroundColor: "#fce7f075",
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "category",
          labels: labels,
          beginAtZero: true,
          display: false, // Ẩn trục x
        },
        y: {
          beginAtZero: true,
          display: false, // Ẩn trục y
        },
      },
      plugins: {
        roundRectangle: {
          radius: 10, // Điều này điều chỉnh độ bo tròn tổng thể của biểu đồ
        },
        legend: {
          display: false, // Ẩn chú thích
        },
        title: {
          display: false, // Ẩn tiêu đề
        },
      },
    },
  });
  changeChartData(myLineChart, 15000);
}
function designChart2() {
  const labels = ["January", "February", "March", "April", "May"];
  let data = generateRandomData();
  // Get the canvas element
  const ctx = document.getElementById("myChart2").getContext("2d");
  // Create a line chart
  const myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "My Data",
          data: data,
          borderColor: "#de2e6c",
          backgroundColor: "#fce7f075",
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "category",
          labels: labels,
          beginAtZero: true,
          display: false, // Ẩn trục x
        },
        y: {
          beginAtZero: true,
          display: false, // Ẩn trục y
        },
      },
      plugins: {
        roundRectangle: {
          radius: 10, // Điều này điều chỉnh độ bo tròn tổng thể của biểu đồ
        },
        legend: {
          display: false, // Ẩn chú thích
        },
        title: {
          display: false, // Ẩn tiêu đề
        },
      },
    },
  });
  changeChartData(myLineChart, 5000);
}
function designChart3() {
  const labels = ["January", "February", "March", "April", "May"];
  const data = generateRandomData();
  // Get the canvas element
  const ctx = document.getElementById("myChart3").getContext("2d");
  // Create a line chart
  const myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "My Data",
          data: data,
          borderColor: "#de2e6c",
          backgroundColor: "#fce7f075",
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "category",
          labels: labels,
          beginAtZero: true,
          display: false, // Ẩn trục x
        },
        y: {
          beginAtZero: true,
          display: false, // Ẩn trục y
        },
      },
      plugins: {
        roundRectangle: {
          radius: 10, // Điều này điều chỉnh độ bo tròn tổng thể của biểu đồ
        },
        legend: {
          display: false, // Ẩn chú thích
        },
        title: {
          display: false, // Ẩn tiêu đề
        },
      },
    },
  });
  changeChartData(myLineChart, 10000);
}
function designChart4() {
  const labels = ["January", "February", "March", "April", "May"];
  const data = generateRandomData();
  // Get the canvas element
  const ctx = document.getElementById("myChart4").getContext("2d");
  // Create a line chart
  const myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "My Data",
          data: data,
          borderColor: "#de2e6c",
          backgroundColor: "#fce7f075",
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "category",
          labels: labels,
          beginAtZero: true,
          display: false, // Ẩn trục x
        },
        y: {
          beginAtZero: true,
          display: false, // Ẩn trục y
        },
      },
      plugins: {
        roundRectangle: {
          radius: 10, // Điều này điều chỉnh độ bo tròn tổng thể của biểu đồ
        },
        legend: {
          display: false, // Ẩn chú thích
        },
        title: {
          display: false, // Ẩn tiêu đề
        },
      },
    },
  });
  changeChartData(myLineChart, 20000);
}
function generateRandomData() {
  return Array.from({ length: 5 }, () => Math.floor(Math.random() * 500));
}
function changeChartData(myLineChart, seconds) {
  setInterval(() => {
    data = generateRandomData();
    myLineChart.data.datasets[0].data = data;
    myLineChart.update();
  }, seconds);
}
// END CHART JS DASHBOARD

// lấy giờ hiện tại hiển thị
function currentTime() {
  let now = new Date();
  let currentHour = now.getHours();
  let result = "";
  if (currentHour >= 5 && currentHour < 12) {
    result = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    result = "Good Afternoon";
  } else if (currentHour >= 18 && currentHour < 21) {
    result = "Good Evening";
  } else {
    result = "Good Night";
  }
  document.querySelector(".box__box__info--account-left small").textContent =
    result;
}

function logOut() {
  const buttonLogOut = document.querySelector("#logOutAccount");
  buttonLogOut.onclick = () => {
    if (localStorage.getItem("account")) {
      localStorage.removeItem("account");
      window.location.href = "../pages/index.html";
    }
  };
}
