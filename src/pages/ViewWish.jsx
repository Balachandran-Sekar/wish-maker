import { useParams } from "react-router-dom";
import BackgroundDecor from "../components/BackgroundDecor";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const wishes = [
  "Wishing You a Day Full of Smiles & Joy",
  "May Your Birthday Be as Amazing as You Are",
  "A Very Special Birthday Just for You",
  "Sending You Love, Laughter & Cake",
];

export default function ViewWish() {
  const { id } = useParams();
  const [wish, setWish] = useState(null);

  useEffect(() => {
    const fetchWish = async () => {
      const ref = doc(db, "wishes", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setWish(snap.data());
    };
    fetchWish();
  }, [id]);

  const randomWish = wishes[Math.floor(Math.random() * wishes.length)];

  if (!wish) return <div>Loading...</div>;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
      <BackgroundDecor />

      <div className="bg-white/95 p-10 rounded-3xl shadow-2xl text-center max-w-sm z-10">
        <p className="text-lg mb-2">{randomWish}</p>

        <h1 className="text-4xl font-extrabold text-yellow-400 mb-4 animate-glow">
          {wish.birthdayName}
        </h1>

        {wish.imageUrl && (
          <img
            src={wish.imageUrl}
            alt="Birthday"
            className="w-full h-48 object-cover rounded-xl"
          />
        )}

        {wish.message && <p className="italic mb-4">"{wish.message}"</p>}

        <p className="text-sm text-gray-600">
          — From {wish.wisherName || "Someone special 💝"}
        </p>
      </div>
    </div>
  );
}
