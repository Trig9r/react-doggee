import React from "react";

export const useMutation = <T, K>(request: (body: T) => Promise<any>) => {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState(0);

  const mutation = React.useCallback(async (body: T): Promise<ApiResponse<K>> => {
    setLoading(true);
    try {
      return await request(body).then(async (res) => {
        setStatus(res.status);
        console.log('res', res);
        setLoading(false);
        return res.data;
      });
    } catch (err) {
      setLoading(false);
      setError((err as Error).message);
      return { success: false, data: {message: (err as Error).message } }
    }
  }, []);

  return {mutation, error, isLoading, status};
}