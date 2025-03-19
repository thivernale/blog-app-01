import { Account, Client, ID } from 'appwrite';
import { environment } from '../config/environment';

export class AuthService {
  private readonly client: Client;
  private account: Account;

  constructor() {
    this.client = new Client()
      .setEndpoint(environment().REACT_APP_APPWRITE_URL)
      .setProject(environment().REACT_APP_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async createAccount({ name, password, email }: UserRegistration) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (!userAccount) {
        return this.login({ email, password });
      } else {
        throw new Error('Account not created');
      }
    } catch (e) {
      throw e;
    }
  }

  async login({ email, password }: UserCredentials) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (e) {
      throw e;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (e) {
      console.error('Appwrite service getCurrentUser()', e);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (e) {
      throw e;
    }
  }
}

type UserCredentials = { email: string; password: string };
type UserRegistration = UserCredentials & { name: string };

const authService = new AuthService();

export default authService;
