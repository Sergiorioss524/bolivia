const BASE_URL = "https://api.worldbank.org/v2";

export async function fetchIndicator(indicator: string, country = "BO") {
  const res = await fetch(
    `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json&per_page=1000`
  );

  const data = await res.json();
  console.log("Fetched", indicator, "→", data?.[1]?.length ?? 0); // 👈 log here

  return data[1] ?? [];
}
