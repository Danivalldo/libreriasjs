class RegisterManager {
  constructor() {
    this.endpoint = "./register";
  }
  async register(username, pass, repeatedPass) {
    if (!username || !pass || !repeatedPass) {
      throw new Error("Todos los campos son obligatorios");
    }
    if (pass !== repeatedPass) {
      throw new Error("La contraseña no coincide");
    }
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        pass,
      }),
    });
    if (response.status !== 200) {
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      throw new Error(response.statusText);
    }
  }
}

const registerManager = new RegisterManager();

export default registerManager;
