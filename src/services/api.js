import axios from "axios";

export const IS_MOCK = true;

const WP_BASE = import.meta.env.VITE_WP_API_URL;

export const wpApi = axios.create({
  baseURL: WP_BASE,
  timeout: 8000,
});

export const endpoints = {
  posts: "/wp/v2/posts",
  pages: "/wp/v2/pages",
  services: "/wp/v2/services",
  portfolio: "/wp/v2/portfolio",
  media: "/wp/v2/media",
};
