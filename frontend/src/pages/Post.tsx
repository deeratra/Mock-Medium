import { useParams } from "react-router-dom"
import { FullPost } from "../components/FullPost"
import { useBlog } from "../hooks"
import { AppBar } from "../components/AppBar"
import { BlogSkeleton } from "../components/BlogSkeleton"

export const Post = () => {
    const { id } = useParams();
    const { loading, post } = useBlog({
        id: id || ""
    })

    if (loading) {
        return <div>
            <AppBar /><BlogSkeleton /></div>
    }
    if (post) {
        return <div>
            <AppBar />
            <FullPost post={post} />
        </div>
    }
}