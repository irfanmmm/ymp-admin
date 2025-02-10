import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const useAxios = (defaultConfig) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const navigation = useNavigate();

  useEffect(() => {
    const request = axios.interceptors.request.use(async (req) => {
      const token = localStorage.getItem("user-data");
      if (token) {
        req.headers["Authorization"] = "Bearer " + token;
      }
      return req;
    });

    return () => {
      axios.interceptors.request.eject(request);
    };
  }, []);

  const fetchData = async (config) => {
    setLoading(true);
    try {
      var response = await axios({
        ...defaultConfig,
        ...config,
        
      });
      setData(response?.data);
    } catch (error) {
      if (error?.response?.status == 401) {
        localStorage.clear();
        navigation("/login");
      }

      if (axios.isAxiosError(error)) {
        if (error.code === axios.AxiosError.ERR_NETWORK) {
          navigation("ErrorScreen", {
            message: "Network Error Please Try To Connect!",
          });
          setError("Network Error Please Try To Connect!");
        } else if (error.code === axios.AxiosError.ERR_BAD_REQUEST) {
          setError("Invalid Request Type");
        }
        if (error.response.status === 500) {
          navigation("ErrorScreen", {
            message: "Internal Server Error Please Try After Some Time!",
          });
          setError("Internal Server Error Please Try After Some Time!");
        }
      }
    } finally {
      setLoading(false);
    }
    return response.data;
  };

  return {
    fetchData,
    loading,
    data,
    error,
  };
};
