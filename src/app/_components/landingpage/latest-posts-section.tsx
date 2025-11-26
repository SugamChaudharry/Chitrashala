import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ArrowRight } from "lucide-react";

interface Post {
  id: string;
  title: string;
  description: string | null;
  mediaUrl: string;
  thumbnailUrl: string | null;
  type: "image" | "video";
  createdAt: Date | null;
  user: {
    id: string;
    name: string;
    image: string | null;
  } | null;
  tags: string[];
}

interface LatestPostsSectionProps {
  posts: Post[];
}

export function LatestPostsSection({ posts }: LatestPostsSectionProps) {
  // Get latest 8 posts
  const latestPosts = posts.slice(0, 8);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Latest Inspirations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Fresh ideas from our creative community
            </p>
          </div>
          <Link
            href="/feed"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full hover:scale-105 transition-transform duration-300"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Posts Grid */}
        {latestPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/post/${post.id}`}
                  className="group relative block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <Image
                      src={post.thumbnailUrl || post.mediaUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Type Badge */}
                    {post.type === "video" && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                        Video
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* User Info */}
                    {post.user && (
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                          {post.user.image ? (
                            <Image
                              src={post.user.image || ""}
                              alt={post.user.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-400">
                              {post.user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {post.user.name}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile View All Button */}
            <div className="sm:hidden mt-8 text-center">
              <Link
                href="/feed"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full hover:scale-105 transition-transform duration-300"
              >
                View All Posts
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No posts available yet. Be the first to share your inspiration!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
