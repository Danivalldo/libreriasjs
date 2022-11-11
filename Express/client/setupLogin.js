export const setupLogin = (formElement) => {
  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.querySelector('input[name="username"]').value;
    const pass = e.target.querySelector('input[name="password"]').value;
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
