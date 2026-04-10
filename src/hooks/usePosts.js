import { useEffect, useState } from "react";
import { endpoints, IS_MOCK, wpApi } from "../services/api";
import mockPosts from "../mocks/posts.json";

const MOCK_DELAY = 400;

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const usePosts = (perPage = 3) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        if (IS_MOCK) {
          await wait(MOCK_DELAY);
          setPosts(mockPosts.slice(0, perPage));
          return;
        }

        const response = await wpApi.get(endpoints.posts, {
          params: { per_page: perPage, _embed: true },
        });
        setPosts(response.data);
      } catch (requestError) {
        setError(requestError.message || "Request failed");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [perPage, reloadToken]);

  return {
    posts,
    loading,
    error,
    retry: () => setReloadToken((value) => value + 1),
  };
};

export default usePosts;
// WP posts