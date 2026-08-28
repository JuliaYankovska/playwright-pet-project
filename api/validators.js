function isValidPrice(priceString) {
  return /^Rs\.\s?\d+$/.test(priceString);
}

function extractNumericPrice(priceString) {
  return parseInt(priceString.replace(/[^\d]/g, ''), 10);
}

function hasUniqueIds(items) {
  const ids = items.map((item) => item.id);
  return new Set(ids).size === ids.length;
}

function matchesSearchTerm(product, term) {
  const lowerTerm = term.toLowerCase();
  return (
    product.name.toLowerCase().includes(lowerTerm) ||
    product.category.category.toLowerCase().includes(lowerTerm)
  );
}

module.exports = { isValidPrice, extractNumericPrice, hasUniqueIds, matchesSearchTerm };