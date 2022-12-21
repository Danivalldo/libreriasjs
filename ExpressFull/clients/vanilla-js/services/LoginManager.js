class LoginManager {
  constructor() {
    this.endpoint = "./login";
    this.token = null;
  }
  async login(username, pass) {
    if (!username || !pass) {
      throw new Error("Necesitas introducir usuario y contraseña");
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
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    this.token = data.token;
    return this.token;
  }
  getToken() {
    return this.token;
  }
}

const loginManager = new LoginManager();

export default loginManager;
