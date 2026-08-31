const cache = new Map();

export function cachedFetch(url, ttl = 60000) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return Promise.resolve(cached.data);
  }

  const promise = fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      cache.set(url, { data, timestamp: Date.now() });
      return data;
    })
    .catch((err) => {
      cache.delete(url);
      throw err;
    });

  cache.set(url, { data: promise, timestamp: Date.now() });
  return promise;
}
