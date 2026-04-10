import { useEffect, useState } from "react";
import { endpoints, IS_MOCK, wpApi } from "../services/api";
import mockServices from "../mocks/services.json";

const MOCK_DELAY = 400;

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const useServices = (perPage = 4) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        if (IS_MOCK) {
          await wait(MOCK_DELAY);
          setServices(mockServices.slice(0, perPage));
          return;
        }

        const response = await wpApi.get(endpoints.services, {
          params: { per_page: perPage },
        });
        setServices(response.data);
      } catch (requestError) {
        setError(requestError.message || "Request failed");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [perPage, reloadToken]);

  return {
    services,
    loading,
    error,
    retry: () => setReloadToken((value) => value + 1),
  };
};

export default useServices;
//WP CPT services