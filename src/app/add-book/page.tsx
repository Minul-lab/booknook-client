"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const AddBookPage = () => {
  const [category, setCategory] = useState("");
  const { data: session, isPending } = authClient.useSession();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const bookData = {
      title: formData.get("title"),
      author: formData.get("author"),
      category: category,
      image: formData.get("image"),
      description: formData.get("description"),
      submittedAt: new Date().toISOString(),
      addedBy: {
        name: session?.user.name,
        email: session?.user.email,
      },
    };
    const res = await fetch("http://localhost:8000/add-book",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData)
    });
    const data = await res.json()

    console.log("New Book:", data);
  };

  return (
    <main className="min-h-screen bg-[#FFF8E7] px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#004D3B] md:text-4xl">
            Add a New Book
          </h1>
          <p className="mt-2 text-sm text-[#004D3B]/70">
            Share a new book with the BookNook community.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-[#004D3B]/15 bg-white p-6 shadow-sm md:p-8"
        >
          {/* Book Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="font-semibold text-[#004D3B]">
              Book Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter book title"
              required
              className="border-[#004D3B]/20 focus-visible:ring-[#FFAA00]"
            />
          </div>

          {/* Author Name */}
          <div className="space-y-2">
            <Label htmlFor="author" className="font-semibold text-[#004D3B]">
              Author Name
            </Label>
            <Input
              id="author"
              name="author"
              placeholder="Enter author's name"
              required
              className="border-[#004D3B]/20 focus-visible:ring-[#FFAA00]"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="font-semibold text-[#004D3B]">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="w-full border-[#004D3B]/20 focus:ring-[#FFAA00]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fiction">Fiction</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="History">History</SelectItem>
                <SelectItem value="Kids">Kids</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Book Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image" className="font-semibold text-[#004D3B]">
              Book Image URL
            </Label>
            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://i.ibb.co/your-image.jpg"
              required
              className="border-[#004D3B]/20 focus-visible:ring-[#FFAA00]"
            />
            <p className="text-xs text-[#004D3B]/60">
              Paste your book cover image link from ImgBB or Postimages.
            </p>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="font-semibold text-[#004D3B]"
            >
              Short Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Write a short description about this book..."
              required
              rows={4}
              className="resize-none border-[#004D3B]/20 focus-visible:ring-[#FFAA00]"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="h-11 w-full bg-[#004D3B] text-base font-semibold text-[#FFF8E7] hover:bg-[#FFAA00] hover:text-[#004D3B]"
          >
            Add Book
          </Button>
        </form>
      </div>
    </main>
  );
};

export default AddBookPage;
