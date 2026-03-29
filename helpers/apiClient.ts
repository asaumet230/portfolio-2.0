const API_BASE =
  process.env.NEXT_PUBLIC_API_PATH ||
  'http://localhost:8080/api';

// Request cache to deduplicate identical concurrent requests
const requestCache = new Map<string, Promise<any>>();

const getCacheKey = (method: string, endpoint: string, data?: any): string => {
  return `${method}:${endpoint}${data ? ':' + JSON.stringify(data) : ''}`;
};

const withDeduplication = async <T>(
  cacheKey: string,
  fetchFn: () => Promise<T>
): Promise<T> => {
  // If request is already in flight, return the same promise
  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey) as Promise<T>;
  }

  const promise = fetchFn();

  // Store promise in cache
  requestCache.set(cacheKey, promise);

  // Remove from cache after 5 seconds to allow fresh requests
  setTimeout(() => {
    requestCache.delete(cacheKey);
  }, 5000);

  return promise;
};

export const clearApiCache = (method: string, endpoint: string) => {
  requestCache.delete(getCacheKey(method, endpoint));
};

export const apiClient = {
  async post(endpoint: string, data: any, token?: string) {
    const cacheKey = getCacheKey('POST', endpoint, data);

    return withDeduplication(cacheKey, async () => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['x-token'] = token;
      }

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      return response.json();
    });
  },

  async get(endpoint: string, token?: string) {
    const cacheKey = getCacheKey('GET', endpoint);

    return withDeduplication(cacheKey, async () => {
      const headers: Record<string, string> = {};

      if (token) {
        headers['x-token'] = token;
      }

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      return response.json();
    });
  },

  async put(endpoint: string, data: any, token?: string) {
    const cacheKey = getCacheKey('PUT', endpoint, data);

    return withDeduplication(cacheKey, async () => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['x-token'] = token;
      }

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      return response.json();
    });
  },

  async delete(endpoint: string, token?: string) {
    const cacheKey = getCacheKey('DELETE', endpoint);

    return withDeduplication(cacheKey, async () => {
      const headers: Record<string, string> = {};

      if (token) {
        headers['x-token'] = token;
      }

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        let message = 'Request failed';
        try {
          const error = await response.json();
          message = error.message || message;
        } catch {}
        throw new Error(message);
      }

      // 204 No Content o respuesta vacía — DELETE exitoso sin body
      if (response.status === 204) return {};
      try {
        return await response.json();
      } catch {
        return {};
      }
    });
  },
};
