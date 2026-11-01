import type { Entry } from './db';

export function summarize(entries: Entry[]) {
  const income = entries.filter(x => x.kind === 'income').reduce((sum,x) => sum + x.amount, 0);
  const expense = entries.filter(x => x.kind === 'expense').reduce((sum,x) => sum + x.amount, 0);
  return { income, expense, balance: income - expense, count: entries.length };
}

export function validateEntry(input: Pick<Entry,'title'|'amount'|'date'|'category'>) {
  if (!input.title.trim()) return 'লেনদেনের বিবরণ লিখুন';
  if (!Number.isFinite(input.amount) || input.amount <= 0) return 'সঠিক পরিমাণ লিখুন';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date) || Number.isNaN(Date.parse(`${input.date}T00:00:00`))) return 'সঠিক তারিখ নির্বাচন করুন';
  if (!input.category.trim()) return 'খাত লিখুন';
  return null;
}

export function toCsv(entries: Entry[]) {
  const quote = (s: string) => `"${s.replaceAll('"','""')}"`;
  return ['তারিখ,ধরন,বিবরণ,খাত,পরিমাণ,পদ্ধতি,নোট', ...entries.map(e => [e.date,e.kind==='income'?'আয়':'ব্যয়',e.title,e.category,String(e.amount),e.method,e.note].map(x=>quote(String(x))).join(','))].join('\r\n');
}
