import { Client, Databases, ID, Query, Storage } from 'appwrite';
import { env } from '../config/env';

export class StorageService {
  private static readonly DATABASE_ID = env.REACT_APP_APPWRITE_DATABASE_ID;
  private static readonly COLLECTION_ID = env.REACT_APP_APPWRITE_COLLECTION_ID;
  private static readonly BUCKET_ID = env.REACT_APP_APPWRITE_BUCKET_ID;
  private readonly client: Client;
  private databases: Databases;
  private storage: Storage;

  constructor() {
    this.client = new Client()
      .setEndpoint(env.REACT_APP_APPWRITE_URL)
      .setProject(env.REACT_APP_APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  private static _instance: StorageService;

  static get instance(): StorageService {
    if (!StorageService._instance) {
      StorageService._instance = new StorageService();
    }
    return StorageService._instance;
  }

  async getPost(slug: string) {
    try {
      return await this.databases.getDocument(
        StorageService.DATABASE_ID,
        StorageService.COLLECTION_ID,
        slug,
      );
    } catch (e) {
      console.error('Appwrite service getPost()', e);
    }
  }

  async getPosts(queries: string[] = [Query.equal('active', true)]) {
    try {
      return await this.databases.listDocuments(
        StorageService.DATABASE_ID,
        StorageService.COLLECTION_ID,
        queries,
      );
    } catch (e) {
      console.error('Appwrite service getPosts()', e);
    }
  }

  async createPost(slug: string, data: Post) {
    try {
      return await this.databases.createDocument(
        StorageService.DATABASE_ID,
        StorageService.COLLECTION_ID,
        slug,
        data,
      );
    } catch (e) {
      console.error('Appwrite service createPost()', e);
    }
  }

  async updatePost(slug: string, data: Post) {
    try {
      return await this.databases.updateDocument(
        StorageService.DATABASE_ID,
        StorageService.COLLECTION_ID,
        slug,
        data,
      );
    } catch (e) {
      console.error('Appwrite service updatePost()', e);
    }
  }

  async deletePost(slug: string) {
    try {
      await this.databases.deleteDocument(
        StorageService.DATABASE_ID,
        StorageService.COLLECTION_ID,
        slug,
      );
      return true;
    } catch (e) {
      console.error('Appwrite service deletePost()', e);
    }
  }

  async uploadFile(file: File) {
    try {
      return await this.storage.createFile(
        StorageService.BUCKET_ID,
        ID.unique(),
        file,
      );
    } catch (e) {
      console.error('Appwrite service uploadFile()', e);
    }
  }

  async deleteFile(fileId: string) {
    try {
      await this.storage.deleteFile(StorageService.BUCKET_ID, fileId);
      return true;
    } catch (e) {
      console.error('Appwrite service deleteFile()', e);
    }
  }

  getFilePreview(fileId: string) {
    return this.storage.getFilePreview(StorageService.BUCKET_ID, fileId);
  }
}

type Post = {
  title: string;
  content: string;
  featuredImage?: string;
  active?: boolean;
  userId?: string;
};
