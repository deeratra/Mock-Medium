import { Link } from "react-router-dom"

interface PostCardProps {
    id: string
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const PostCard = ({ authorName, title, content, publishedDate, id }: PostCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 p-4 cursor-pointer">
            <div className="flex gap-x-1">
                <div className="flex justify-center flex-col">
                    <Avatar name={authorName} />
                </div>
                <div className="font-extralight pl-2">
                    {authorName}
                </div>
                <div>&#8226;</div>
                <div className="pl-2 font-thin text-slate-500">
                    {publishedDate}
                </div>
            </div>
            <div className="flex flex-col gap-y-1">
                <div className="text-xl font-bold">{title}</div>
                <div className="text-md font-thin">{content}</div>
            </div>
            <div className="text-slate-400 text-sm p-3">
                {`${Math.ceil(content.length / 100)} minutes`}
            </div>
            {/* <div className="bg-slate-200 h-1 w-full"></div> */}
        </div>
    </Link>
}


export function Avatar({ name = 'Test', size = 'big' }: { name?: string, size?: string }) {
    return <div className={`relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="font-medium text-gray-600 dark:text-gray-300">{name ? name[0] : "H"}</span>
    </div>
}