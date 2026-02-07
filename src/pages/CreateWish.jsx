import { useState } from "react";
import BackgroundDecor from "../components/BackgroundDecor";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


const USERNAME = "aaa";
const PASSWORD = "bbb";

export default function CreateWish() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Wish data
  const [birthdayName, setBirthdayName] = useState("");
  const [wisherName, setWisherName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // 🔐 Login
  const handleLogin = () => {
    if (username === USERNAME && password === PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  // 🖼️ Image upload with compression
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressed = canvas.toDataURL('image/jpeg', 0.7);
        setImage(compressed);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  // 🔗 Create link with validation
  const createLink = async () => {
    try {
      if (!birthdayName.trim()) {
        setError("Birthday person name is required ❗");
        return;
      }

      setError("");

      // Save wish in Firestore (with base64 image)
      const docRef = await addDoc(collection(db, "wishes"), {
        birthdayName,
        wisherName,
        message,
        imageUrl: image || "",
        createdAt: serverTimestamp(),
      });

      setLink(`${window.location.origin}/wish/${docRef.id}`);
    } catch (err) {
      console.error("Error creating wish:", err);
      setError("Failed to create link. Check console for details.");
    }
  };


  // 📋 Copy
  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 🔐 LOGIN PAGE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-[300px] text-center">
          <h1 className="text-2xl font-bold mb-4">🔐 Login</h1>

          <input
            className="w-full mb-3 p-3 border rounded-xl"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="w-full mb-3 p-3 border rounded-xl"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {loginError && (
            <p className="text-red-500 text-sm mb-2">{loginError}</p>
          )}

          <button
            onClick={handleLogin}
            className="bg-indigo-500 text-white w-full py-3 rounded-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // 🎉 CREATE WISH PAGE
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center overflow-hidden">
      <BackgroundDecor />

      <div className="relative z-10 bg-white/90 p-8 rounded-3xl shadow-2xl w-[330px] text-center">
        <h1 className="text-2xl font-bold mb-4">🎉 Create Birthday Wish</h1>

        <input
          className="w-full mb-2 p-3 border rounded-xl"
          placeholder="Birthday Person Name *"
          value={birthdayName}
          onChange={(e) => setBirthdayName(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <input
          className="w-full mb-2 p-3 border rounded-xl"
          placeholder="Your Name (optional)"
          value={wisherName}
          onChange={(e) => setWisherName(e.target.value)}
        />

        <textarea
          className="w-full mb-3 p-3 border rounded-xl resize-none"
          placeholder="Write your wishes (optional)"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Image Upload */}
        <label className="w-full mb-3 p-3 border-2 border-dashed border-rose-300 rounded-xl cursor-pointer hover:bg-rose-50 transition flex items-center justify-center gap-2">
          <span className="text-rose-500">📷</span>
          <span className="text-gray-600">Choose Image (optional)</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {image && (
          <div className="relative mb-3">
            <img
              src={image}
              alt="Preview"
              className="w-full h-40 object-cover rounded-xl"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full"
            >
              ✕
            </button>
          </div>
        )}

        <button
          onClick={createLink}
          className="bg-rose-500 text-white w-full py-3 rounded-full"
        >
          Create Link 🔗
        </button>

        {link && (
          <div className="mt-4">
            <div className="flex gap-2">
              <input
                className="flex-1 p-2 text-xs border rounded-lg"
                value={link}
                readOnly
              />
              <button
                onClick={copyLink}
                className="bg-rose-500 text-white px-3 rounded-lg"
              >
                {copied ? "✅" : "📋"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
