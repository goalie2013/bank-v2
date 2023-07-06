import axios from "axios";

// TODO: Change to axios or React Query
function useFetchData(url, method, options) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (url) {
        let ignore = false;
        const response =
          method === "GET"
            ? await axios.get(url)
            : await axios.post(url, options.user, options.headers);

        if (!ignore) setData(response.json());

        return () => {
          ignore = true;
        };
      }
    };
    try {
      fetchData();
    } catch (e) {
      console.error(e.message);
    }
  }, [url]);

  return data;
}
