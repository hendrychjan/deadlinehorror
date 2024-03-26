export class UserService {
  constructor(axios) {
    this.axios = axios;
  }

  async register(user) {
    const res = await this.axios.post("/users/register", user, {
      params: {
        sendToken: true,
      },
    });
    return res.data;
  }

  async login(user) {
    const res = await this.axios.post("/users/login", user);
    return res.data;
  }
}
