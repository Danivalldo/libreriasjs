import loginManager from "./services/LoginManager";

export const setupLogin = (formElement, onLogInCb, onLogOutCb) => {
  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const usernameInput = e.target.querySelector('input[name="username"]');
    const passInput = e.target.querySelector('input[name="password"]');
    const username = usernameInput.value;
    const pass = passInput.value;
    usernameInput.value = "";
    passInput.value = "";
    if (!username || !pass) {
      return;
    }
    const token = await loginManager.login(username, pass);
    console.log(token);
    // try {
    //   const response = await fetch("./login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username,
    //       pass,
    //     }),
    //   });
    //   const data = await response.json();
    //   if (data.error) {
    //     throw new Error(data.error);
    //   }
    //   console.log("ok", data);
    //   token = data.token;
    // } catch (err) {
    //   console.log("ko", err.message);
    // }
  });
};
