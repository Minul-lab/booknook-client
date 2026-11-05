"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface Book {
  _id: string;
  title: string;
  author: string;
  quantity: number;
  category: string;
  image: string;
  description: string;
  submittedAt: string;
  addedBy: {
    name: string;
    email: string;
  };
}

interface MyBooksClientProps {
  initialBooks: Book[];
}

const MyBooksClient = ({ initialBooks }: MyBooksClientProps) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [deleteBook, setDeleteBook] = useState<Book | null>(null);

  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    quantity: "",
    category: "",
    image: "",
    description: "",
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Open edit dialog with the old data filled in
  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setEditForm({
      title: book.title,
      author: book.author,
      quantity: String(book.quantity ?? ""),
      category: book.category,
      image: book.image,
      description: book.description,
    });
  };

  // Update book
  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBook) return;

    if (!editForm.category) {
      toast.error("Please select a category.");
      return;
    }

    try {
      setSaving(true);

      const token = await getTokenFromClient()

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/all-books/${selectedBook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...editForm,
            quantity: Number(editForm.quantity),
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update book");
      }

      const updatedBook = await res.json();

      setBooks((prev) =>
        prev.map((book) =>
          book._id === selectedBook._id ? updatedBook : book,
        ),
      );

      setSelectedBook(null);
      toast.success("Book updated successfully!");
    } catch (error) {
      toast.error("Could not update the book.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Delete book
  const handleDelete = async () => {
    if (!deleteBook) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/all-books/${deleteBook._id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      setBooks((prev) => prev.filter((book) => book._id !== deleteBook._id));

      setDeleteBook(null);
      toast.success("Book deleted successfully!");
    } catch (error) {
      toast.error("Could not delete the book.");
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="mx-auto container  px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Books</h1>
        <p className="mt-2 text-muted-foreground">
          Manage the books you have added to BookNook.
        </p>
      </div>

      {books.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center">
          <h2 className="text-xl font-semibold">No books found</h2>
          <p className="mt-2 text-muted-foreground">
            You haven&apos;t added any books yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {books.map((book) => (
            <Link
              className="mb-6"
              key={book._id}
              href={`http://localhost:3000/books/${book._id}`}
            >
              <div className="group mb-6 flex flex-row overflow-hidden rounded-xl border border-[#004D3B]/15 bg-[#FFAA00]/8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFAA00] hover:shadow-lg">
                {/* Book Image */}
                <div className="h-40 w-28 shrink-0 overflow-hidden sm:h-44 sm:w-36">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={100}
                    height={200}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Book Details */}
                <div className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:flex-row sm:items-center sm:p-5">
                  <div className="min-w-0 space-y-2">
                    <span className="inline-block rounded-full bg-[#004D3B]/10 px-3 py-1 text-xs font-semibold text-[#004D3B]">
                      {book.category}
                    </span>

                    <h2 className="truncate text-lg font-bold text-[#004D3B] transition-colors group-hover:text-[#FFAA00] sm:text-xl">
                      {book.title}
                    </h2>

                    <p className="text-sm font-medium text-[#004D3B]/70">
                      By {book.author}
                    </p>

                    <p className="text-xs text-[#004D3B]/50">
                      Added on{" "}
                      {new Date(book.submittedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex shrink-0 gap-2 sm:mt-0 sm:flex-col">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEdit(book);
                      }}
                      className="bg-[#004D3B] text-[#FFF8E7] transition-all hover:bg-[#00382B]"
                      size="lg"
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDeleteBook(book);
                      }}
                      className="bg-[#FFAA00] text-[#004D3B] px-10 transition-all hover:bg-[#E69900]"
                      size="lg"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={!!selectedBook}
        onOpenChange={(open) => {
          if (!open) setSelectedBook(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Book Title */}
            <div className="space-y-2">
              <Label
                htmlFor="edit-title"
                className="font-semibold text-[#004D3B]"
              >
                Book Title
              </Label>
              <Input
                id="edit-title"
                placeholder="Enter book title"
                required
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="border-[#004D3B]/20 focus-visible:ring-[#FFAA00]"
              />
            </div>

            {/* Author + Copies */}
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label
                  htmlFor="edit-author"
                  className="font-semibold text-[#004D3B]"
                >
                  Author Name
                </Label>
                <Input
                  id="edit-author"
                  placeholder="Enter author's name"
                  required
                  value={editForm.author}
                  onChange={(e) =>
                    setEditForm({ ...editForm, author: e.target.value })
                  }
                  className="border-[#004D3B]/20 focus-visible:ring-[#FFAA00]"
                />
              </div>

              <div className="flex-1 space-y-2">
                <Label
                  htmlFor="edit-quantity"
                  className="font-semibold text-[#004D3B]"
                >
                  Number of Copies
                </Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Enter number of copies"
                  required
                  value={editForm.quantity}
                  onChange={(e) =>
                    setEditForm({ ...editForm, quantity: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-", "."].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className="border-[#004D3B]/20 focus-visible:ring-[#FFAA00]"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="font-semibold text-[#004D3B]">Category</Label>
              <Select
                value={editForm.category}
                onValueChange={(value) =>
                  setEditForm({ ...editForm, category: value ?? "" })
                }
              >
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

            {/* Image URL */}
            <div className="space-y-2">
              <Label
                htmlFor="edit-image"
                className="font-semibold text-[#004D3B]"
              >
                Book Image URL
              </Label>
              <Input
                id="edit-image"
                type="url"
                placeholder="https://i.ibb.co/your-image.jpg"
                required
                value={editForm.image}
                onChange={(e) =>
                  setEditForm({ ...editForm, image: e.target.value })
                }
                className="border-[#004D3B]/20 focus-visible:ring-[#FFAA00]"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="edit-description"
                className="font-semibold text-[#004D3B]"
              >
                Short Description
              </Label>
              <Textarea
                id="edit-description"
                rows={4}
                required
                placeholder="Write a short description about this book..."
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="resize-none border-[#004D3B]/20 focus-visible:ring-[#FFAA00]"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedBook(null)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={saving}
                className="bg-[#004D3B] text-[#FFF8E7] hover:bg-[#00382B]"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteBook}
        onOpenChange={(open) => {
          if (!open) setDeleteBook(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

            <AlertDialogDescription>{
              `This will permanently delete "${deleteBook?.title}" from your
              collection. This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete Book"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default MyBooksClient;
