import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import MyBooksClient from "@/components/my-books-client";


const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  
  const res = await fetch(
    `http://localhost:8000/my-books/${encodeURIComponent(user.email)}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return <div className="py-20 text-center">Failed to load your books.</div>;
  }

  const data = await res.json();

  return (
    <div className="bg-[#FFF8E7]">
      
        <MyBooksClient initialBooks={data}  />
      
    </div>
  ); 
};

export default MyBooksPage;
