import { ApiError } from "./errors";

export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type ApiRequestOptions = {
  signal?: AbortSignal;
};

export async function apiRequest<T>(
  request: () => T | Promise<T>,
): Promise<ApiResponse<T>> {
  try {
    const data = await request();

    return {
      data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new ApiError(
        error.message,
        500,
      );
    }

    throw new ApiError(
      "Something went wrong.",
      500,
    );
  }
}

export async function apiGet<T>(
  getter: () => T | Promise<T>,
): Promise<T> {
  const response = await apiRequest(
    getter,
  );

  return response.data;
}

export async function apiPost<T>(
  action: () => T | Promise<T>,
): Promise<T> {
  const response = await apiRequest(
    action,
  );

  return response.data;
}

export async function apiPatch<T>(
  action: () => T | Promise<T>,
): Promise<T> {
  const response = await apiRequest(
    action,
  );

  return response.data;
}

export async function apiDelete<T>(
  action: () => T | Promise<T>,
): Promise<T> {
  const response = await apiRequest(
    action,
  );

  return response.data;
}