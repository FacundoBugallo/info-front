const API_KEY = "dc27602fb144453:3pd4kxr4lbr5ykq";

export async function getEconomicCalendar() {
  const url = `https://api.tradingeconomics.com/calendar?c=${API_KEY}&f=json`;

  const response = await fetch(url);
  const data = await response.json();

  if (!Array.isArray(data)) return [];
  return data;
}

