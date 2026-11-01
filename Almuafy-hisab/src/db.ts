import { openDB } from 'idb';

export type Entry = { id: string; kind: 'income'|'expense'; title: string; amount: number; category: string; date: string; method: string; note: string; updatedAt: string };
export type Customer = { id: string; name: string; phone: string; address: string; updatedAt: string };
const dbPromise = openDB('almuafy-hisab', 1, { upgrade(db) { db.createObjectStore('entries', { keyPath: 'id' }); db.createObjectStore('customers', { keyPath: 'id' }); } });

export async function listEntries() { return (await dbPromise).getAll('entries'); }
export async function saveEntry(entry: Entry) { await (await dbPromise).put('entries', entry); }
export async function removeEntry(id: string) { await (await dbPromise).delete('entries', id); }
export async function listCustomers() { return (await dbPromise).getAll('customers'); }
export async function saveCustomer(customer: Customer) { await (await dbPromise).put('customers', customer); }
