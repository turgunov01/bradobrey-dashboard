type RequestOptions<TBody = unknown> = {
  body?: TBody;
  headers?: HeadersInit;
  method?: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
  query?: Record<string, unknown>;
  silent?: boolean;
  successMessage?: string;
};

function extractErrorMessage(error: any) {
  const data = error?.data || error?.response?._data;

  if (typeof data === "string") {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (error?.statusMessage) {
    return error.statusMessage;
  }

  if (error?.message) {
    return error.message;
  }

  return "The request could not be completed.";
}

export function useApiClient() {
  const toast = useToast();
  const uiStore = useUiStore();

  function notifySuccess(title: string, description?: string) {
    if (import.meta.client) {
      toast.add({
        color: "primary",
        description,
        title,
      });
    }
  }

  function notifyError(error: unknown, fallback?: string) {
    const description = fallback || extractErrorMessage(error);

    if (import.meta.client) {
      toast.add({
        color: "error",
        description,
        title: "Request failed",
      });
    }
  }

  async function request<TResponse, TBody = unknown>(
    url: string,
    options: RequestOptions<TBody> = {},
  ) {
    try {
      const data = await $fetch<TResponse>(url, {
        body: options.body as BodyInit | Record<string, unknown> | undefined,
        headers: options.headers,
        method: options.method || "GET",
        query: options.query,
      });

      if (import.meta.client) {
        uiStore.pushDebug({
          at: new Date().toISOString(),
          method: options.method || "GET",
          request: options.body ?? options.query,
          response: data,
          status: "success",
          url,
        });
      }

      if (options.successMessage) {
        notifySuccess(options.successMessage);
      }

      return data;
    } catch (error) {
      if (import.meta.client) {
        uiStore.pushDebug({
          at: new Date().toISOString(),
          error,
          method: options.method || "GET",
          request: options.body ?? options.query,
          response: null,
          status: "error",
          url,
        });
      }

      if (!options.silent) {
        notifyError(error);
      }

      throw error;
    }
  }

  async function rawRequest<TResponse, TBody = unknown>(
    url: string,
    options: RequestOptions<TBody> = {},
  ) {
    try {
      const response = await $fetch.raw<TResponse>(url, {
        body: options.body as BodyInit | Record<string, unknown> | undefined,
        headers: options.headers,
        method: options.method || "GET",
        query: options.query,
      });

      if (import.meta.client) {
        uiStore.pushDebug({
          at: new Date().toISOString(),
          method: options.method || "GET",
          request: options.body ?? options.query,
          response: response._data,
          status: "success",
          url,
        });
      }

      return {
        data: response._data,
        headers: response.headers,
        status: response.status,
      };
    } catch (error) {
      if (import.meta.client) {
        uiStore.pushDebug({
          at: new Date().toISOString(),
          error,
          method: options.method || "GET",
          request: options.body ?? options.query,
          response: null,
          status: "error",
          url,
        });
      }

      if (!options.silent) {
        notifyError(error);
      }

      throw error;
    }
  }

  return {
    notifyError,
    notifySuccess,
    rawRequest,
    request,
  };
}
