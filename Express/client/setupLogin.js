let token = null;
export const setupLogin = (formElement) => {
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
    try {
      const response = await fetch("./login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          pass,
        }),
      });
      const data = await response.json();
      console.log("ok", data);
    } catch (err) {
      console.log("ko", err);
    }
  });
};

export const getToken = () => {
  return token;
};
