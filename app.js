import React, { useState } from "react"; import { motion } from "framer-motion";

export default function App() { const [username, setUsername] = useState(""); const [selected, setSelected] = useState(null); const [loading, setLoading] = useState(false); const [followers, setFollowers] = useState(1200); const [result, setResult] = useState(null);

const packages = [1000, 5000, 10000, 50000, 100000];

const simulateGrowth = (amount) => { setSelected(amount); setLoading(true); setResult(null);

setTimeout(() => {
  let start = followers;
  let end = followers + amount;
  let current = start;

  const interval = setInterval(() => {
    current += Math.ceil(amount / 40);
    if (current >= end) {
      current = end;
      clearInterval(interval);
      setLoading(false);
      setResult({
        newFollowers: end,
        growth: ((amount / start) * 100).toFixed(1),
      });
      setFollowers(end);
    }
    setFollowers(current);
  }, 40);
}, 2000);

};

const copy = (text) => { navigator.clipboard.writeText(text); };

return ( <div className="min-h-screen flex flex-col items-center justify-start text-white p-6" style={{background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)"}}> <h1 className="text-3xl font-bold mb-4 text-center">Instagram Growth Simulator with AI</h1>

<input
    placeholder="Enter your @username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="p-3 rounded-xl text-black w-full max-w-md mb-4"
  />

  {username && (
    <p className="mb-4">Analyzing profile: <b>@{username}</b></p>
  )}

  <div className="grid grid-cols-2 gap-3 max-w-md w-full mb-6">
    {packages.map((p) => (
      <button
        key={p}
        onClick={() => simulateGrowth(p)}
        className="rounded-2xl p-4 font-bold bg-white/20 backdrop-blur hover:scale-105 transition"
      >
        +{p.toLocaleString()} followers
      </button>
    ))}
  </div>

  {loading && (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center">
      <p>Analyzing profile...</p>
      <p>Applying growth strategy...</p>
    </motion.div>
  )}

  {!loading && (
    <h2 className="text-2xl font-bold mb-4">Followers: {followers.toLocaleString()}</h2>
  )}

  {result && (
    <div className="bg-white/10 p-4 rounded-2xl max-w-md w-full">
      <h3 className="text-xl font-bold mb-2">Results</h3>
      <p>New total: {result.newFollowers.toLocaleString()}</p>
      <p>Growth: +{result.growth}%</p>
      <p className="mb-4">Engagement boost detected 🚀</p>

      <h3 className="font-bold mb-2">This is how creators actually grow:</h3>

      <div className="mb-3">
        <p className="font-semibold">Viral Ideas:</p>
        <ul className="text-sm">
          <li>• Before vs After transformation</li>
          <li>• 3 tips nobody tells you</li>
          <li>• POV storytelling reel</li>
        </ul>
      </div>

      <div className="mb-3">
        <p className="font-semibold">Caption:</p>
        <p className="text-sm">"This changed everything... wait for it 👀"</p>
        <button onClick={()=>copy("This changed everything... wait for it 👀")} className="text-xs underline">Copy</button>
      </div>

      <div className="mb-3">
        <p className="font-semibold">Hashtags:</p>
        <p className="text-sm">#viral #growth #reels #explore #content</p>
        <button onClick={()=>copy("#viral #growth #reels #explore #content")} className="text-xs underline">Copy</button>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Hook:</p>
        <p className="text-sm">"Nobody talks about this..."</p>
        <button onClick={()=>copy("Nobody talks about this...")} className="text-xs underline">Copy</button>
      </div>

      <button className="w-full bg-white text-black p-3 rounded-xl font-bold">
        Unlock Real Growth Strategy
      </button>
    </div>
  )}

  <p className="text-xs mt-6 text-center opacity-70 max-w-md">
    This is a simulation. No real followers are added. Focus on organic growth strategies.
  </p>
</div>

); }
