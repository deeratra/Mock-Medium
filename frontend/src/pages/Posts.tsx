import { AppBar } from "../components/AppBar"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { PostCard } from "../components/PostCard"
import { useBlogs } from "../hooks"

export const Posts = () => {
    const { loading, posts } = useBlogs()

    if (loading) {
        return <div><BlogSkeleton /></div>
    }
    return <div>
        <AppBar /><div className="flex justify-center p-4">
            <div className="max-w-xl">
                {posts.map(post => <PostCard
                    id={post.id}
                    authorName={post.author.name || "Anonymous"}
                    title={post.title}
                    content={post.content}
                    publishedDate={"9 March 2023"}

                />)}
            </div>
        </div>
    </div>
}