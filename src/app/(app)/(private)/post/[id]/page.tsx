import Image from "next/image";
import { api } from "~/trpc/server";

interface PostDetailPageProps {
  params: { id: string };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const post = await api.post.getPostById({ id: params.id });

  if (!post) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Post not found
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4 mb-20">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      {post.mediaUrl && (
        <div className="my-4">
          {post.type === "image" ? (
            <Image
              src={post.mediaUrl}
              alt={post.title}
              width={800}
              height={600}
              className="rounded-lg"
            />
          ) : (
            <video
              src={post.mediaUrl}
              controls
              className="rounded-lg w-full"
            />
          )}
        </div>
      )}

      <p className="text-gray-700">{post.description}</p>

      <div className="flex items-center gap-3 mt-6">
        {post.user?.avatarImage && (
          <Image
            src={post.user.avatarImage}
            alt={post.user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div>
          <p className="font-medium">{post.user?.name}</p>
          <p className="text-sm text-gray-500">
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : "—"}
          </p>
        </div>
      </div>
    </main>
  );
}
