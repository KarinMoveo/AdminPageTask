import axios from "axios";

export async function authenticateUserFromAPI(credentials: { email: string; password: string }, action: 'signup' | 'login') {
      const result = await axios({
        url: `auth/${action}`,
        method: 'POST',
        data: credentials,
      });
      return result.data;
  }
  