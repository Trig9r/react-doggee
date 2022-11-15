import React from "react";

export const useQueryLazy = <K>(request: <T>() => Promise<any>) => {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState(0);
  const [data, setData] = React.useState<K | null>(null);
  
  const query = React.useCallback(async(): Promise<ApiResponse<K>> => {
    setLoading(true);
    try {
      return await request<K>().then(async (res) => {
        setStatus(res.status);
        setLoading(false);
        return res.data;
      });
    } catch (err) {
      setLoading(false);
      setError((err as Error).message);
      return { success: false, data: {message: (err as Error).message } }
    }
  }, []);

  return {query, error, isLoading, status};
}