"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { X, Plus } from "lucide-react";

export default function DashboardPage() {
  const utils = api.useUtils();
  const { data, isLoading } = api.post.getUserPosts.useQuery();
  const editMutation = api.post.editPost.useMutation({
    onSuccess: () => utils.post.getUserPosts.invalidate(),
  });

  const [editId, setEditId] = useState<string | null>(null);
  type Visibility = "public" | "private";

  const [form, setForm] = useState<{
    title: string;
    description: string;
    visibility: Visibility;
    tags: string[];
    newTag: string;
  }>({
    title: "",
    description: "",
    visibility: "public",
    tags: [],
    newTag: "",
  });

  if (isLoading) return <div className="p-6 text-center">Loading your posts...</div>;
  if (!data?.posts?.length)
    return <div className="p-6 text-center text-gray-500">No posts yet.</div>;

  const handleEdit = (p: any) => {
    setEditId(p.id);
    setForm({
      title: p.title,
      description: p.description ?? "",
      visibility: p.visibility,
      tags: p.tags ?? [],
      newTag: "",
    });
  };

  const handleAddTag = () => {
    if (form.newTag.trim() && !form.tags.includes(form.newTag.trim())) {
      setForm({
        ...form,
        tags: [...form.tags, form.newTag.trim()],
        newTag: "",
      });
    }
  };

  const handleRemoveTag = (tag: string) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = async () => {
    if (!editId) return;
    await editMutation.mutateAsync({
      id: editId,
      title: form.title,
      description: form.description,
      visibility: form.visibility,
      tags: form.tags,
    });
    setEditId(null);
  };

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-8">Your Posts</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {data.posts.map((p) => (
          <Card key={p.id} className="overflow-hidden shadow-md hover:shadow-lg transition">
            {editId === p.id ? (
              <CardContent className="space-y-4 mt-4">
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Title"
                />
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Description"
                />

                {/* 🏷️ Tag Editing Section */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {form.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="flex items-center gap-1">
                        #{tag}
                        <X
                          size={14}
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={form.newTag}
                      onChange={(e) => setForm({ ...form, newTag: e.target.value })}
                      placeholder="Add a tag..."
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                    />
                    <Button type="button" variant="outline" onClick={handleAddTag}>
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>

                {/* 🔒 Visibility Selector */}
                <Select
                  value={form.visibility}
                  onValueChange={(v: "public" | "private") =>
                    setForm({ ...form, visibility: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-3 justify-end">
                  <Button onClick={handleSubmit}>Save</Button>
                  <Button variant="outline" onClick={() => setEditId(null)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            ) : (
              <>
                {p.type === "image" ? (
                  <img
                    src={p.mediaUrl}
                    alt={p.title}
                    className="w-full h-60 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={p.mediaUrl}
                    className="w-full h-60 object-cover"
                    controls
                  />
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{p.description}</p>
                  {p.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {p.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="text-sm text-gray-500 mb-3">
                    Visibility:{" "}
                    <span className="font-medium capitalize">{p.visibility}</span>
                  </div>
                  <Button variant="outline" onClick={() => handleEdit(p)}>
                    Edit
                  </Button>
                </CardContent>
              </>
            )}
          </Card>
        ))}
      </div>
    </main>
  );
}
