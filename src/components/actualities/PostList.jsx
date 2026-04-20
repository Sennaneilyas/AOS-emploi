import PostCard from "./PostCard";

/**
 * @param {{
 *  posts: Array<object>
 * }} props
 */
function PostList({ posts }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
