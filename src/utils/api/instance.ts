type BaseUrl = string;
const baseUrl: BaseUrl = 'http://localhost:3001/';

export class API {
  readonly baseUrl: BaseUrl;

  constructor(baseUrl: BaseUrl) {
    this.baseUrl = baseUrl
  }

  async request<T>(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(this.baseUrl + endpoint, { 
      method: 'GET',
      credentials: 'include',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(!!options?.headers && options.headers)
      }
    });

    if (!res.ok) throw new Error(res.statusText);

    const resData = await res.json() as ApiResponse<T>
    return {data: resData, status: res.status};
  }

  get<T>(endpoint: string, options: Omit<RequestInit, 'body'> = {}) {
    return this.request<T>(endpoint, {...options, method:'GET'});
  }

  post<T>(endpoint: string, body: Record<string, any>, options: RequestInit = {}) {
    return this.request<T>(endpoint, {
      ...options,
      method:'POST',
      ...(!!body && {body: JSON.stringify(body)})
    });
  }
}

export const api = new API(baseUrl);