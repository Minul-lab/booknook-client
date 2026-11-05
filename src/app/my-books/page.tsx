import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import MyBooksClient from "@/components/my-books-client";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return (
      <div className="py-20 text-center">Please log in to see your books.</div>
    );
  }

  const user = session?.user;
  const token=await getTokenFromServer()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/my-books/${user.email}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    return <div className="py-20 text-center">Failed to load your books.</div>;
  }

  const data = await res.json();

  return (
    <div className="bg-[#FFF8E7]">
      <MyBooksClient initialBooks={data} />
    </div>
  );
};

export default MyBooksPage;
