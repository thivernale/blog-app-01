import { Account, Client, ID } from 'appwrite';
import { env } from '../config/env';

export class AuthService {
  private readonly client: Client;
  private account: Account;

  constructor() {
    this.client = new Client()
      .setEndpoint(env.VITE_APPWRITE_URL)
      .setProject(env.VITE_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  private static _instance: AuthService;

  static get instance(): AuthService {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService();
    }
    return AuthService._instance;
  }

  async createAccount({ name, password, email }: UserRegistration) {
    // eslint-disable-next-line no-useless-catch
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        throw new Error('Account not created');
      }
    } catch (e) {
      throw e;
    }
  }

  async login({ email, password }: UserCredentials) {
    // eslint-disable-next-line no-useless-catch
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
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.account.deleteSessions();
    } catch (e) {
      throw e;
    }
  }
}

export type UserCredentials = { email: string; password: string };
export type UserRegistration = UserCredentials & { name: string };

export const authService = AuthService.instance;
