import { METHODS, RequestsOptions } from "./types";

const baseUrl = 'https://61d8e2cfe6744d0017ba8cdc.mockapi.io/events';

//const baseUrl = 'http://localhost/events';

class Http {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private makeRequest = async <IDtoRequest>(options: RequestsOptions): Promise<IDtoRequest | undefined> => {
    try {
      const { method } = options;

      const headers = {
        'Content-Type': 'application/json;charset=utf-8'
      };

      const response = (method === METHODS.GET || method === METHODS.DELETE)
        ? await fetch(`${this.baseUrl}${options.url}`, { method, headers })
        : await fetch(`${this.baseUrl}${options.url}`, {
          method,
          body: JSON.stringify(options.body),
          headers
        });

      const rawResponseText = await response.text(); // Get raw response

      if (!response.ok) {
        console.error("HTTP Error Response:", response.status, response.statusText, rawResponseText);
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return JSON.parse(rawResponseText); // Parse JSON response
      } else {
        console.error("Unexpected content type:", contentType, "Raw response:", rawResponseText);
        throw new Error("Unexpected response format. Expected JSON.");
      }

    } catch (err: any) {
      console.error('HTTP Request failed:', err.message);
      alert(`Error: ${err.message}`);
      return undefined;
    }
  }

  get = async <IDto>(url: string) => this.makeRequest<IDto>({ url, method: METHODS.GET });
  post = async <IDto>(url: string, body?: Object) => this.makeRequest<IDto>({ url, method: METHODS.POST, body });
  delete = async <IDto>(url: string) => this.makeRequest<IDto>({ url, method: METHODS.DELETE });
  patch = async <IDto>(url: string, body?: Object) => this.makeRequest<IDto>({ url, method: METHODS.PATCH, body });
  put = async <IDto>(url: string, body?: Object) => this.makeRequest<IDto>({ url, method: METHODS.PUT, body });
}

export const request = new Http(baseUrl);