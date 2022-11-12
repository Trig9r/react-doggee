import React from "react";

type MutationMethods = 'post' | 'put' | 'delete';

export const useMutation = <T, K>(
  url:string, 
  method: MutationMethods,
  config?: Omit<RequestInit, 'method'>
  ) => {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState(0);

  const mutation = React.useCallback(async(body: T): Promise<ApiResponse<K>> => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        ...config,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(!!config?.headers && config.headers)
        },
        ...(!!body && {body: JSON.stringify(body)})
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

  return {mutation, error, isLoading, status};
}