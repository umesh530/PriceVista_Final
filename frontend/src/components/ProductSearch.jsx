// Copilot: implement efficient search + image mapping for PriceVista — follow the requirements above.
import React, { useState, useRef, useEffect } from 'react';

// Helper: normalize and tokenize query (should match backend logic)
function normalizeQuery(q) {
  return (q || '').toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()\[\]"]/g, ' ').replace(/\s+/g, ' ').trim();
}
function tokenize(q) {
  if (!q) return [];
  const stopwords = new Set(['the','a','an','and','or','of','in','on','for','to','by','with','at','from','is','are','as','it','this','that','these','those']);
  return [...new Set(q.split(' ').filter(t => t && !stopwords.has(t)))];
}

const LRU = () => {
  let cache = [];
  return {
    get: (q) => {
      const idx = cache.findIndex(e => e.q === q);
      if (idx !== -1) {
        const [item] = cache.splice(idx, 1);
        cache.unshift(item);
        return item.res;
      }
      return null;
    },
    set: (q, res) => {
      cache = cache.filter(e => e.q !== q);
      cache.unshift({ q, res });
      if (cache.length > 10) cache.pop();
    }
  };
};

const ProductSearch = ({ onResults, allProducts }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const inputRef = useRef();
  const abortRef = useRef();
  const lru = useRef(LRU());
  const debounceRef = useRef();

  // Debounced search
  useEffect(() => {
    if (!query) {
      setSuggestions([]); setResults([]); onResults && onResults([]); return;
    }
    setLoading(true);
    setShowDropdown(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doSearch(query);
    }, 300);
    // eslint-disable-next-line
  }, [query]);

  async function doSearch(q) {
    const norm = normalizeQuery(q);
    // LRU cache
    const cached = lru.current.get(norm);
    if (cached) {
      setResults(cached.products || []);
      setSuggestions((cached.products || []).slice(0, 5).map(p => p.title));
      setLoading(false);
      onResults && onResults(cached.products || []);
      return;
    }
    // Cancel previous
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}&limit=24&fields=title,images,price,vendor,tags,keywords`, { signal: abortRef.current.signal });
      if (!res.ok) throw new Error('Network');
      const data = await res.json();
      setResults(data.products || []);
      setSuggestions((data.products || []).slice(0, 5).map(p => p.title));
      lru.current.set(norm, data);
      setLoading(false);
      onResults && onResults(data.products || []);
      // Preload top 8 images
      (data.products || []).slice(0, 8).forEach(p => { if (p.images && p.images[0]) { const img = new window.Image(); img.src = p.images[0]; } });
    } catch (err) {
      // Fallback: client-side filter
      if (allProducts && allProducts.length) {
        const tokens = tokenize(norm);
        const filtered = allProducts.filter(p => tokens.every(t =>
          [p.title, p.vendor, ...(p.tags||[]), ...(p.keywords||[])].join(' ').toLowerCase().includes(t)
        ));
        setResults(filtered);
        setSuggestions(filtered.slice(0, 5).map(p => p.title));
        setLoading(false);
        onResults && onResults(filtered);
      } else {
        setResults([]); setSuggestions([]); setLoading(false);
      }
    }
  }

  // Keyboard navigation for suggestions
  function handleKeyDown(e) {
    if (!showDropdown) return;
    if (e.key === 'ArrowDown') {
      setSelectedIdx(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (selectedIdx >= 0 && suggestions[selectedIdx]) {
        setQuery(suggestions[selectedIdx]);
        setShowDropdown(false);
        inputRef.current.blur();
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  }

  // Render
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="flex items-center border rounded-lg bg-white px-3 py-2 shadow-sm">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 outline-none bg-transparent text-lg"
          placeholder="Search products (e.g. HP laptop)"
          value={query}
          onChange={e => { setQuery(e.target.value); setSelectedIdx(-1); }}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          aria-label="Search products"
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          aria-activedescendant={selectedIdx >= 0 ? `suggestion-${selectedIdx}` : undefined}
        />
        {loading && <span className="ml-2 animate-spin w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"></span>}
      </div>
      {showDropdown && suggestions.length > 0 && (
        <ul id="search-suggestions" className="absolute left-0 right-0 bg-white border rounded-b-lg shadow-lg z-20 max-h-56 overflow-auto mt-1" role="listbox">
          {suggestions.map((s, i) => (
            <li
              key={s}
              id={`suggestion-${i}`}
              className={`px-4 py-2 cursor-pointer ${i === selectedIdx ? 'bg-blue-100' : ''}`}
              onMouseDown={() => { setQuery(s); setShowDropdown(false); }}
              role="option"
              aria-selected={i === selectedIdx}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
      {/* Results grid (optional, can be rendered by parent) */}
      {/* <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map(p => (
          <div key={p._id} className="border rounded-lg p-2">
            <img src={p.images && p.images[0] ? p.images[0] : '/placeholder.jpg'} alt={p.title} className="w-full h-32 object-cover rounded mb-2" />
            <div className="font-bold text-sm">{p.title}</div>
            <div className="text-gray-600 text-xs">{p.vendor}</div>
            <div className="text-blue-700 font-semibold">₹{p.price}</div>
          </div>
        ))}
      </div> */}
      {query && !loading && results.length === 0 && (
        <div className="mt-4 text-center text-gray-500">
          <div>No products found. Try synonyms or check spelling.</div>
          <button className="mt-2 px-4 py-2 bg-blue-100 rounded" onClick={() => { setQuery(''); setShowDropdown(false); }}>Show all products</button>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
