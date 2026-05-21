/** Footer destination labels → partial name match in API destination list */
export const FOOTER_DESTINATION_NAMES = {
  kathmandu: "Kathmandu Valley Heritage Tour",
  annapurna: "Annapurna Circuit Trek",
  chitwan: "Chitwan Safari Experience",
  everest: "Everest Base Camp Trek",
};

export function findDestinationId(destinations, key) {
  const target = FOOTER_DESTINATION_NAMES[key];
  if (!target) return null;
  const match = destinations.find((d) => d.name === target || d.name.includes(target.split(" ")[0]));
  return match ? match.id : null;
}
