import { useEffect, useState } from "react";
import { endpoints, IS_MOCK, wpApi } from "../services/api";
import { POSTS, filterPosts, paginatePosts } from "../mocks/actualities";

const MOCK_DELAY = 600;

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

/**
 * Custom hook to fetch and manage posts with support for filtering, searching, and pagination.
 * 
 * @param {object} options
 * @param {string} options.category - Category ID to filter by (default: "all")
 * @param {string} options.search - Search term to filter by (default: "")
 * @param {number} options.page - Current page number (default: 1)
 * @param {number} options.perPage - Number of posts per page (default: 6)
 */
const usePosts = ({ category = "all", search = "", page = 1, perPage = 6 } = {}) => {
  const [data, setData] = useState({
    items: [],
    totalPages: 0,
    total: 0,
  });
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
          const filtered = filterPosts(category, search);
          const paginated = paginatePosts(filtered, page);
          setData(paginated);
          return;
        }

        // Real API implementation (WordPress)
        // Note: Real API would handle pagination, searching, and filtering server-side
        const response = await wpApi.get(endpoints.posts, {
          params: { 
            per_page: perPage, 
            page: page,
            search: search,
            categories: category !== "all" ? category : undefined, // WP uses numeric IDs usually
            _embed: true 
          },
        });
        
        // For WP, we'd get total pages from headers
        const total = parseInt(response.headers["x-wp-total"], 10) || response.data.length;
        const totalPages = parseInt(response.headers["x-wp-totalpages"], 10) || 1;
        
        setData({
          items: response.data,
          totalPages,
          total,
        });
      } catch (requestError) {
        setError(requestError.message || "Request failed");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, search, page, perPage, reloadToken]);

  return {
    posts: data.items,
    totalPages: data.totalPages,
    total: data.total,
    loading,
    error,
    retry: () => setReloadToken((value) => value + 1),
  };
};

export default usePosts;