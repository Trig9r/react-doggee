import React from "react";

export const useQuery = <K>(request: <T>() => Promise<any>, deps: React.DependencyList = []) => {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [status, setStatus] = React.useState(0);
  const [data, setData] = React.useState<K | null>(null);
  
  React.useEffect(() => {    
    setLoading(true);
    try {
      request<K>().then(async (res) => {
        setLoading(false);
        setStatus(res.status);
        setData(res.data);
      });
    } catch (err) {
      setLoading(false);
      setError((err as Error).message);
    }
  }, deps);

  return {data, error, isLoading, status};
}