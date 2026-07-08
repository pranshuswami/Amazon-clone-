import { useEffect, useState } from "react";
import axios from "axios";
import AmazonGridCard from "../components/AmazonCardGrid";
import HomeSlider from "../components/HomeSlider";

const Home = () => {
  const [categories, setCategories] = useState([]);

  const hardcodedCards = [
    {
      category_id: 101,
      category_name: "Deals of the Day",
      slug: "deals",
      category_image: "https://images.unsplash.com/photo-1549488344-c367f73a074e?w=400",
    },
    {
      category_id: 102,
      category_name: "Amazon Prime",
      slug: "prime",
      category_image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400",
    },
    {
      category_id: 103,
      category_name: "Gift Cards",
      slug: "gift-cards",
      category_image: "https://images.unsplash.com/photo-1549465220-1a8b9e984950?w=400",
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => {
        setCategories(res.data.data || []);
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);
      });
  }, []);

  const allCards = [...categories, ...hardcodedCards];

  return (
    <div className="  min-h-screen bg-white pb-12 overflow-x-hidden w-full">
      <div className="hidden md:block w-full max-w-full overflow-hidden">
        <HomeSlider />
      </div>
      <div className=" flex overflow-auto md:hidden w-full md:w-400 px-4 gap-2 py-2">
        <img className="w-80 h-140 rounded-lg"
        src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/48f2ed6f-bba2-42fc-80fe-580a21bbd5b0.jpg" />

         <img className="w-80 h-140 rounded-lg"
         src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/9f40523d-7472-44a0-b228-1e54156eebe9._SX855_.jpg" />

          <img className="w-80 h-140 rounded-lg"
          src="https://m.media-amazon.com/images/I/61eGjnAcIQL._SX855_.jpg" />
      </div>
      <div className="md:hidden flex gap-2 px-3 py-2 overflow-auto">
        <img className=" relative h-50 w-40 rounded-lg"
         src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/61afe145-2233-4a56-a9b4-01b08ee54775._SX414_.jpg" />

         <p className="absolute pl-2 py-1.5 font-extrabold text-white">Active 2P
         </p>
         
         <p className="absolute pl-2 py-9 text-xs mt-1 text-white">amazFit
         </p>

         <button className="absolute top-200 pl-2 text-xs w-fit h-fit p-1 rounded-full">Sponsered</button>

         <img className="h-50 w-40 rounded-lg"
         src="https://m.media-amazon.com/images/I/51hSLrqwA7L._SX413_.jpg" />
          <p className="absolute pl-2 py-1.5 font-extrabold text-white">shop bog deals
         </p>

         <img className="h-50 w-40 rounded-lg"
         src="https://m.media-amazon.com/images/I/512qyP63yUL._SX413_.jpg" />

         <img className="h-50 w-40 rounded-lg"
         src="https://m.media-amazon.com/images/I/51JB2LWud6L._SX413_.jpg" />
      </div>
      <img 
      className="md:hidden"src="https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/3d901200-6af2-473e-b873-fa1dc09daf59._ZPPHNwYW4gZm9yZWdyb3VuZD0iV2hpdGUiPjxzcGFuIGZvbnQ9IkVtYmVyIE1vZGVybiBEaXNwbGF5IFN0YW5kYXJkIFJlZ3VsYXIgIDI2LjkyIj48cz48c3Bhbj7igrk8L3NwYW4+MTgsOTkwPC9zPiAgPC9zcGFuPjxzcGFuIGZvbnQ9IkVtYmVyIE1vZGVybiBEaXNwbGF5IFN0YW5kYXJkIEJvbGQgMjYuOTIiPjxzcGFuPuKCuTwvc3Bhbj4xNywyNDA8L3NwYW4+PC9zcGFuPg==,21,387,600,60,0_ZPPHNwYW4gZm9udD0iRW1iZXIgTW9kZXJuIERpc3BsYXkgU3RhbmRhcmQgUmVndWxhciAxNyIgZm9yZWdyb3VuZD0iV2hpdGUiPiBXaXRoIGNvdXBvbiBhbmQgU0JJIGNyZWRpdCBjYXJkICA8L3NwYW4+,21,443,600,40,0_SY0_SX0__.jpg" />

      <div className="max-w-[1500px] mx-auto px-4 mt-3 md:px-1 relative z-10 md:mt-[clamp(-140px,-8vw,-40px)] lg:mt-[clamp(-180px,-9vw,-90px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {allCards.map((category) => (
            <AmazonGridCard
              key={category.category_id}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
