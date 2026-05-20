/** Parse budget field (e.g. "500", "$500") → number or null */
export function parseBudget(value) {
  if (value == null || String(value).trim() === "") return null;
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** Filter destinations by hero / browse search criteria */
export function filterDestinations(destinations, { query, maxBudget, fromDate } = {}) {
  let list = Array.isArray(destinations) ? [...destinations] : [];
  const q = (query || "").trim().toLowerCase();

  if (q) {
    list = list.filter((d) =>
      [d.name, d.city, d.country, d.category, d.description, d.difficulty]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q))
    );
  }

  if (maxBudget != null) {
    list = list.filter((d) => (d.priceFrom ?? d.price) <= maxBudget);
  }

  // Soft hint: prefer trips whose best season mentions travel month (no availability API)
  if (fromDate) {
    const month = new Date(fromDate).getMonth();
    const inWindow = (start, end) => {
      if (start <= end) return month >= start && month <= end;
      return month >= start || month <= end;
    };
    const seasonal = list.filter((d) => {
      const season = (d.bestSeason || "").toLowerCase();
      if (season.includes("mar") && season.includes("may") && inWindow(2, 4)) return true;
      if (season.includes("oct") && season.includes("nov") && inWindow(9, 10)) return true;
      if (!season || season.includes("oct") || season.includes("mar")) return true;
      return true;
    });
    if (seasonal.length > 0) list = seasonal;
  }

  return list;
}

export function buildSearchParams({ query, date, budget }) {
  const params = new URLSearchParams();
  if (query?.trim()) params.set("q", query.trim());
  if (date) params.set("date", date);
  const b = parseBudget(budget);
  if (b != null) params.set("budget", String(b));
  return params;
}

export function readSearchFromParams(searchParams) {
  return {
    query: searchParams.get("q") || "",
    date: searchParams.get("date") || "",
    budget: searchParams.get("budget") || "",
    maxBudget: parseBudget(searchParams.get("budget")),
  };
}
