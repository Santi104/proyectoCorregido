import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: process.env.DATABASE_URL || './db.sqlite3',
  driver: sqlite3.Database
});

export default dbPromise;
