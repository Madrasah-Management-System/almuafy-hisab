import { describe, expect, it } from 'vitest';
import { summarize, toCsv, validateEntry } from './model';
import type { Entry } from './db';

const entry = (kind: Entry['kind'], amount: number): Entry => ({ id: crypto.randomUUID(), kind, amount, title: 'অফিস, ভাড়া', category: 'খরচ', date: '2026-11-01', method: 'নগদ', note: 'মাসিক "ভাড়া"', updatedAt: '2026-11-01T00:00:00.000Z' });

describe('accounting model', () => {
  it('calculates income, expenses, balance and count without demo values', () => {
    expect(summarize([entry('income', 1200), entry('expense', 400)])).toEqual({ income: 1200, expense: 400, balance: 800, count: 2 });
    expect(summarize([])).toEqual({ income: 0, expense: 0, balance: 0, count: 0 });
  });
  it('rejects incomplete or nonpositive records', () => {
    expect(validateEntry({title:' ',amount:10,date:'2026-11-01',category:'আয়'})).toContain('বিবরণ');
    expect(validateEntry({title:'বিক্রি',amount:-10,date:'2026-11-01',category:'আয়'})).toContain('পরিমাণ');
  });
  it('quotes CSV fields containing commas and quotes', () => {
    expect(toCsv([entry('income', 1)]).split('\r\n')[1]).toContain('"অফিস, ভাড়া"');
    expect(toCsv([entry('income', 1)]).split('\r\n')[1]).toContain('"মাসিক ""ভাড়া"""');
  });
});
