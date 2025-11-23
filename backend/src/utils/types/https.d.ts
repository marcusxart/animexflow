export interface FetchResult<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}
