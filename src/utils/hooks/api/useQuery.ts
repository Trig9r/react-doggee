import React from "react";

export const useQuery = <K>(
  url:string,
  deps: React.DependencyList = [],
  config?: Omit<RequestInit, 'method'>
  ) => {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState(0);
  const [data, setData] = React.useState<K | null>(null);
  
  React.useEffect(() => {    
    setLoading(true);
    try {
      fetch(url, {
        method: "GET",
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...(!!config?.headers && config.headers)
        },
      }).then(async (res) => {
        const resData = await res.json() as K;      
        setLoading(false);
        setStatus(res.status);
        setData(resData);
      });
    } catch (err) {
      setLoading(false);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, deps);

  return {data, error, isLoading, status};
}