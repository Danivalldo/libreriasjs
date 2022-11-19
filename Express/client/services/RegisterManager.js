class RegisterManager {
  constructor() {
    this.endpoint = "./register";
  }
  async register(username, pass) {
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
  }
}

const registerManager = new RegisterManager();

export default registerManager;
