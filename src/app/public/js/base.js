function start() {
  // getAccount();
}
start();
async function getAccount() {
  const apiUrl = "http://localhost:3000/accounts";
  try {
    await fetch(apiUrl)
      .then((response) => response.json())
      .then((accounts) => {
        const infoAccount = accounts.filter((account) => {
          if (localStorage.getItem("account")) {
            return (
              account.emailAccount ==
              JSON.parse(localStorage.getItem("account")).emailAccount
            );
          }
        });
        renderBoxLogin(infoAccount[0]);
      });
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  }
}

function renderBoxLogin(infoAccount) {
  if (infoAccount == undefined) {
    document.querySelector("#link_loginHederTop").textContent = "Đăng nhập";
    document.querySelector("#link_loginHederTop").href = "account.html";
  } else {
    document.querySelector("#link_loginHederTop").textContent =
      infoAccount.nameAccount;
    document.querySelector("#link_loginHederTop").href = "user-general.html";
  }
}
