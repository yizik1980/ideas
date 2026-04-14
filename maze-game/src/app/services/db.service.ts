import { Injectable } from '@angular/core';
import { GameResult } from '../models';

const DB_NAME = 'maze-game-db';
const DB_VERSION = 1;
const STORE = 'results';

@Injectable({ providedIn: 'root' })
export class DbService {
  private db: IDBDatabase | null = null;

  private open(): Promise<IDBDatabase> {
    if (this.db) return Promise.resolve(this.db);
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
          store.createIndex('completedAt', 'completedAt');
        }
      };
      req.onsuccess = (e) => {
        this.db = (e.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async saveResult(result: Omit<GameResult, 'id'>): Promise<number> {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      const req = tx.objectStore(STORE).add(result);
      req.onsuccess = () => resolve(req.result as number);
      req.onerror = () => reject(req.error);
    });
  }

  async getAllResults(): Promise<GameResult[]> {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => resolve(req.result as GameResult[]);
      req.onerror = () => reject(req.error);
    });
  }

  async getTopResults(limit = 10): Promise<GameResult[]> {
    const all = await this.getAllResults();
    return all.sort((a, b) => b.score - a.score).slice(0, limit);
  }
}
