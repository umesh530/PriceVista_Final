// Copilot: search normalization/tokenization helpers for PriceVista

const stopwords = new Set(['the','a','an','and','or','of','in','on','for','to','by','with','at','from','is','are','as','it','this','that','these','those']);

function normalizeQuery(q) {
  return (q || '')
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()\[\]"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(q) {
  if (!q) return [];
  const tokens = q.split(' ').filter(Boolean);
  // Remove stopwords and dedupe
  return [...new Set(tokens.filter(t => !stopwords.has(t)))];
}

module.exports = { normalizeQuery, tokenize };
