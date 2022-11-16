class LoginManager {
  constructor() {
    this.endpoint = "./login";
    this.token = null;
  }
  async login(username, pass) {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }
  getToken() {
    return this.token;
  }
}

const loginManager = new LoginManager();

export default loginManager;
