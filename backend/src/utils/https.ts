import config from "../config/index.ts";
import type { FetchResult, FetchOptions } from "./types/https.d.ts";

export async function fetchInstance<T = any>(
  endpoint: string,
  options?: FetchOptions
): Promise<FetchResult<T>> {
  try {
    const response = await fetch(config.baseurl + endpoint, {
      headers: { ...(config.headers || {}), ...(options?.headers || {}) },
      ...options,
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const contentType = response.headers.get("content-type") || "";
    const data: T = contentType.includes("application/json")
      ? await response.json()
      : ((await response.text()) as unknown as T);

    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
