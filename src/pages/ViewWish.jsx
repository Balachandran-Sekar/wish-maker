import { useParams } from "react-router-dom";
import BackgroundDecor from "../components/BackgroundDecor";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

// 🎉 Wishes with emojis
const wishes = [
  "🎉 Wishing You a Day Full of Smiles & Joy 😊",
  "🎂 May Your Birthday Be as Amazing as You Are ✨",
  "🥳 A Very Special Birthday Just for You 🎈",
  "💖 Sending You Love, Laughter & Cake 🍰",
  "🌈 Celebrate Big, Smile Bigger Today 🎉",
];

// 🎨 Background themes
const themes = [
  "from-purple-500 to-pink-500",
  "from-indigo-500 to-sky-400",
  "from-rose-500 to-orange-400",
  "from-emerald-500 to-cyan-400",
];

export default function ViewWish() {
  const { id } = useParams();
  const [wish, setWish] = useState(null);

  const [theme] = useState(
    themes[Math.floor(Math.random() * themes.length)]
  );

  const [randomWish] = useState(
    wishes[Math.floor(Math.random() * wishes.length)]
  );

  useEffect(() => {
    const fetchWish = async () => {
      const ref = doc(db, "wishes", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setWish(snap.data());
    };
    fetchWish();
  }, [id]);

  if (!wish) return <div className="text-center mt-20">Loading…</div>;

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br ${theme} flex items-center justify-center overflow-hidden`}
    >
      <BackgroundDecor />

      <div className="bg-white/95 p-10 rounded-3xl shadow-2xl text-center max-w-sm z-10">

        {/* 🎉 Wish text */}
        <p className="text-lg mb-3 font-medium text-gray-700">
          {randomWish}
        </p>

        {/* 👑 Birthday name — MULTICOLOR (Godrej-style) */}
        <h1
          className="
            text-4xl sm:text-5xl font-['Great_Vibes'] tracking-wide mb-5
            bg-gradient-to-r from-blue-600 via-green-500 to-red-500
            bg-clip-text text-transparent
          "
        >
          {wish.birthdayName}
        </h1>

        {/* 🖼️ Optional image */}
        {wish.imageUrl && (
          <img
            src={wish.imageUrl}
            alt="Birthday"
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
        )}

        {/* 💌 Message */}
        {wish.message && (
          <p className="italic mb-4 text-gray-700">
            “{wish.message}”
          </p>
        )}

        {/* ✍️ Created by */}
        <div className="mt-6 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            💝 Created by{" "}
            <span className="font-semibold text-gray-800">
              {wish.wisherName || "Someone special"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
