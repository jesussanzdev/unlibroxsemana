import fs from 'fs';
import path from 'path';

const booksPath = path.join(process.cwd(), 'data/recomendations.json');
const books = JSON.parse(fs.readFileSync(booksPath, 'utf-8'));

function getWeeklyBooks(count = 10) {
  const today = new Date();
  const firstJan = new Date(today.getFullYear(), 0, 1);
  const days = Math.floor((today.getTime() - firstJan.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + firstJan.getDay() + 1) / 7);

  const startIndex = weekNumber % books.length;
  const rotated = [...books.slice(startIndex), ...books.slice(0, startIndex)];
  return rotated.slice(0, count);
}

export default function handler(req, res) {
  const pageSize = 8;
  const items = getWeeklyBooks(pageSize);
  res.status(200).json({ items, hasMore: false });
}