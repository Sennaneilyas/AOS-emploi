import { useEffect, useState } from "react";
import { endpoints, IS_MOCK, wpApi } from "../services/api";
import { getPostBySlug } from "../mocks/actualities";

const MOCK_DELAY = 500;

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

/**
 * Hook to fetch a single post by its slug.
 */
const usePostDetail = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        if (IS_MOCK) {
          await wait(MOCK_DELAY);
          const data = getPostBySlug(slug);
          if (data) {
            setPost(data);
          } else {
            setError("Post not found");
          }
          return;
        }

        // Real API implementation
        const response = await wpApi.get(endpoints.posts, {
          params: { slug, _embed: true },
        });

        if (response.data && response.data.length > 0) {
          setPost(response.data[0]);
        } else {
          setError("Post not found");
        }
      } catch (requestError) {
        setError(requestError.message || "Request failed");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};

export default usePostDetail;
