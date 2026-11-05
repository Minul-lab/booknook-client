import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

interface BorrowedBook {
  _id: string;
  image: string;
  title: string;
  borrowedAt: string;
}

const MyBorrowPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="py-20 text-center">
        Please log in to view your borrowed books.
      </div>
    );
  }

  const token = await getTokenFromServer();

  const res = await fetch(
    `http://localhost:8000/borrow/${encodeURIComponent(user.email)}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    return (
      <div className="py-20 text-center">Failed to load borrowed books.</div>
    );
  }

  const data: BorrowedBook[] = await res.json();

  console.log(data);

  return (
    <main className="min-h-screen bg-[#FFF8E7] px-4 py-10">
      <div className="mx-auto container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#004D3B]">
            My Borrowed Books
          </h1>
          <p className="mt-2 text-sm text-[#004D3B]/70">
            Keep track of all the books you have borrowed from BookNook.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#004D3B]/15 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#004D3B]/5">
                  <TableHead className="font-semibold text-[#004D3B]">
                    Book Image
                  </TableHead>
                  <TableHead className="font-semibold text-[#004D3B]">
                    Book Title
                  </TableHead>
                  <TableHead className="font-semibold text-[#004D3B]">
                    Borrow Date
                  </TableHead>
                  <TableHead className="text-right font-semibold text-[#004D3B]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.map((book) => (
                  <TableRow key={book._id}>
                    <TableCell>
                      <Image
                        src={book.image}
                        alt={book.title}
                        width={100}
                        height={200}
                        className="h-16 w-12 rounded-md object-cover"
                      />
                    </TableCell>

                    <TableCell className="font-medium text-[#004D3B]">
                      {book.title}
                    </TableCell>

                    <TableCell className="text-[#004D3B]/70">
                      {new Date(book.borrowedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        timeZone: "Asia/Dhaka",
                      })}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        className="border-[#004D3B] text-[#004D3B] hover:bg-[#004D3B] hover:text-white"
                      >
                        Return Book
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyBorrowPage;
