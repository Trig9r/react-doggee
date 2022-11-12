import React from "react";

export const useQueryLazy = <K>(
  url:string,
  config?: Omit<RequestInit, 'method'>
  ) => {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState(0);
  const [data, setData] = React.useState<K | null>(null);
  
  const query = React.useCallback(async(): Promise<ApiResponse<K>> => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "GET",
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...(!!config?.headers && config.headers)
        },
      });
      setLoading(false);
      setStatus(res.status);
      return await res.json();
    } catch (err) {
      setLoading(false);
      setError((err as Error).message);
      return { success: false, data: {message: (err as Error).message } }
    } finally {
      setLoading(false);
    }
  }, []);

  return {query, error, isLoading, status};
}