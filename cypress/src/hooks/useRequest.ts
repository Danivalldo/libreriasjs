import { useContext, useState } from "react";
import { TokenContext } from "../context/TokenContext";
import Toastify from "toastify-js";

const useRequest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token, setToken } = useContext(TokenContext);
  const request = async (EP: string, body?: object, method?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", token ?? "");

      const response = await fetch(EP, {
        cache: "no-cache",
        method: method ?? (body ? "POST" : "GET"),
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (response.status === 401) {
        Toastify({
          text: token
            ? "Your session expired"
            : "You do not have permission to be here",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          className: "toast-error",
        }).showToast();
        setToken(null);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { request, isLoading, error };
};

export default useRequest;
