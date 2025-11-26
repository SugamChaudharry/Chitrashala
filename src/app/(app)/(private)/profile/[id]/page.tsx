import Image from "next/image";
import Link from "next/link";
import { api } from "~/trpc/server";
import {
  Heart,
  MessageCircle,
  Share2,
  Settings,
  MapPin,
  Calendar,
  Link2,
  Mail,
  MoreVertical,
  Grid3x3,
  Bookmark,
  Tag as TagIcon,
  Users,
  Image as ImageIcon,
  Video,
  Eye,
  UserPlus,
  UserCheck,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import PostCard from "../../home/_home-feed";

export default async function ProfilePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  // Fetch user data and their posts
  const { posts } = await api.post.getPosts();
  const userPosts = posts.filter(p => p.userId === id);
  const userData = userPosts[0]?.user;

  if (!userData) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-rose-50 dark:from-neutral-950 dark:to-neutral-900">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-12 h-12 text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User not found</h2>
          <p className="text-gray-500 dark:text-gray-400">This profile doesn't exist or has been removed.</p>
          <Link href="/home">
            <Button className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalPosts = userPosts.length;
  const totalImages = userPosts.filter(p => p.type === "image").length;
  const totalVideos = userPosts.filter(p => p.type === "video").length;
  const followers = 0; // Placeholder - will need follow relations
  const following = 0; // Placeholder - will need follow relations

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-rose-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900">
      {/* Cover Image */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 dark:from-rose-900 dark:via-pink-900 dark:to-rose-900">
        {userData.image ? (
          <Image
            src={userData.image}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-500 opacity-90" />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-neutral-900" />

        {/* Cover Actions */}
        <div className="absolute top-6 right-6 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white dark:bg-neutral-800/90 dark:hover:bg-neutral-800 backdrop-blur-sm rounded-full shadow-lg"
          >
            <Share2 size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white dark:bg-neutral-800/90 dark:hover:bg-neutral-800 backdrop-blur-sm rounded-full shadow-lg"
          >
            <MoreVertical size={20} />
          </Button>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-20 sm:-mt-24">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 mb-8">
            {/* Avatar */}
            <Avatar className="h-32 w-32 sm:h-40 sm:w-40 ring-8 ring-white dark:ring-neutral-900 shadow-2xl">
              <AvatarImage src={userData.avatarImage || userData.image || ""} />
              <AvatarFallback className="bg-gradient-to-br from-rose-500 to-pink-500 text-white text-4xl sm:text-5xl font-bold">
                {userData.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {userData.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-2">
                    <Mail size={16} />
                    {userData.email}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white rounded-full px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-semibold">
                    <UserPlus size={18} className="mr-2" />
                    Follow
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full px-6"
                  >
                    <MessageCircle size={18} className="mr-2" />
                    Message
                  </Button>
                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-2 border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full"
                    >
                      <Settings size={18} />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 dark:text-gray-300 text-base mb-4 max-w-2xl">
                Creative designer & content creator sharing visual stories. Passionate about art, photography, and design. Let's create something beautiful together! ✨
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-rose-500" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Link2 size={16} className="text-rose-500" />
                  <a href="#" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                    portfolio.com
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-rose-500" />
                  <span>Joined January 2024</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <Card className="border-2 border-gray-200 dark:border-neutral-800 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 mx-auto mb-3">
                  <Grid3x3 className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalPosts}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 dark:border-neutral-800 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{followers}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 dark:border-neutral-800 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 mx-auto mb-3">
                  <UserCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{following}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 dark:border-neutral-800 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 mx-auto mb-3">
                  <ImageIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalImages}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Images</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 dark:border-neutral-800 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 mx-auto mb-3">
                  <Video className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalVideos}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Videos</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 dark:border-neutral-800 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 mx-auto mb-3">
                  <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Likes</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full sm:w-auto bg-white dark:bg-neutral-800 border-2 border-gray-200 dark:border-neutral-700 rounded-2xl p-2 mb-8">
              <TabsTrigger
                value="posts"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200"
              >
                <Grid3x3 size={18} className="mr-2" />
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200"
              >
                <Bookmark size={18} className="mr-2" />
                Saved
              </TabsTrigger>
              <TabsTrigger
                value="tagged"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl px-6 py-3 font-semibold transition-all duration-200"
              >
                <TagIcon size={18} className="mr-2" />
                Tagged
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-0">
              {userPosts.length > 0 ? (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                  {userPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      href={post.id}
                      post={post}
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-3xl">
                  <CardContent className="py-16 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Grid3x3 className="w-10 h-10 text-rose-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No posts yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Share your first post to get started!</p>
                    <Link href="/upload">
                      <Button className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                        Create Post
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="saved" className="mt-0">
              <Card className="border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-3xl">
                <CardContent className="py-16 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bookmark className="w-10 h-10 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No saved posts</h3>
                  <p className="text-gray-500 dark:text-gray-400">Posts you save will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tagged" className="mt-0">
              <Card className="border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-3xl">
                <CardContent className="py-16 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TagIcon className="w-10 h-10 text-rose-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No tagged posts</h3>
                  <p className="text-gray-500 dark:text-gray-400">Posts you're tagged in will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
