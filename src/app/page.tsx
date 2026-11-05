import Banner from "@/components/banner";
import NewArrivals from "@/components/newArrivals";
import HowBorrowingWorks from "@/components/section1";
import TopCategories from "@/components/section2";


export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <NewArrivals></NewArrivals>
      <HowBorrowingWorks></HowBorrowingWorks>
    <TopCategories/>
    </div>
  );
}
