import React from "react";
import {
  Heart,
  MessageCircle,
  Settings,
  MoreHorizontal,
  Image as ImageIcon,
  Video,
} from "lucide-react"; // Renamed Image to ImageIcon
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "~/components/ui/dropdown-menu";

interface Post {
  id: number;
  type: "image" | "video";
  title: string;
  image: string; // Using image for thumbnail
  likes: number;
  comments: number;
  user: string;
}

interface ManageContentPageProps {
  posts: Post[];
}

export const ManageContentPage: React.FC<ManageContentPageProps> = ({
  posts,
}) => {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Content</h2>
          <p className="text-gray-600">Manage your posts and media</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-rose-300 text-gray-700 rounded-full font-medium hover:bg-rose-50 hover:text-rose-700"
          >
            All
          </Button>
          <Button
            variant="ghost"
            className="text-gray-600 hover:bg-rose-50 hover:text-rose-700 rounded-full"
          >
            Images
          </Button>
          <Button
            variant="ghost"
            className="text-gray-600 hover:bg-rose-50 hover:text-rose-700 rounded-full"
          >
            Videos
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all border-none">
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-square object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Button size="icon" className="bg-white hover:bg-rose-50 text-gray-700 hover:text-rose-700 rounded-full">
                  <Settings size={18} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" className="bg-white hover:bg-rose-50 text-gray-700 hover:text-rose-700 rounded-full">
                      <MoreHorizontal size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Post</DropdownMenuItem>
                    <DropdownMenuItem>View Analytics</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete Post</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {post.type === "video" && (
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <Video size={12} className="inline" />
                </div>
              )}
              {post.type === "image" && (
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <ImageIcon size={12} className="inline" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 truncate">
                {post.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex gap-3">
                  <span className="flex items-center gap-1">
                    <Heart size={14} />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {post.comments}
                  </span>
                </div>
                <span className="text-xs text-gray-400">2 days ago</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
