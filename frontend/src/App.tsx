import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const modeConfig: Record<string, { label: string, img: string, color: string }> = {
  lawyer: { label: "Lawyer", img: "https://cdn-icons-png.flaticon.com/512/3122/3122340.png", color: "#f59e0b" },
  doctor: { label: "Doctor", img: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png", color: "#10b981" },
  coach: { label: "Coach", img: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png", color: "#ef4444" },
  teacher: { label: "Teacher", img: "https://cdn-icons-png.flaticon.com/512/1995/1995531.png", color: "#3b82f6" },
  director: { label: "Director", img: "https://cdn-icons-png.flaticon.com/512/2040/2040523.png", color: "#8b5cf6" }
};

export default function App() {
  const [mode, setMode] = useState("teacher");
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<{ role: string, text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- THE NEW CHAT FIX ---
  // When the user clicks a different mode, clear the chat history
  useEffect(() => {
    setChat([]); 
    setInput("");
  }, [mode]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault(); 
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    setChat(prev => [...prev, { role: "user", text: currentInput }]);
    setInput(""); 
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/chat", { message: currentInput, mode });
      setChat(prev => [...prev, { role: "ai", text: res.data.reply }]);
    } catch (err) {
      setChat(prev => [...prev, { role: "ai", text: "Error: Connection failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      height: '100vh', width: '100vw', backgroundColor: '#0f172a' 
    }}>
      <div style={{ 
        width: '90%', maxWidth: '900px', height: '90%', display: 'flex', 
        flexDirection: 'column', backgroundColor: '#1e293b', borderRadius: '20px', overflow: 'hidden' 
      }}>
        
        {/* Header with Avatars */}
        <div style={{ padding: '20px', borderBottom: '1px solid #334155' }}>
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '15px' }}>
            Chatting with: <span style={{ color: modeConfig[mode].color }}>{modeConfig[mode].label}</span>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {Object.keys(modeConfig).map(m => (
              <div key={m} onClick={() => setMode(m)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                <img src={modeConfig[m].img} style={{ 
                    width: '50px', height: '50px', borderRadius: '50%', 
                    border: mode === m ? `3px solid ${modeConfig[m].color}` : '3px solid transparent',
                    transition: '0.3s'
                }} />
                <p style={{ color: 'white', fontSize: '12px' }}>{modeConfig[m].label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Window */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#0f172a', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {chat.length === 0 && (
             <p style={{ color: '#475569', textAlign: 'center', marginTop: '20px' }}>
                Start a new conversation with the {modeConfig[mode].label}...
             </p>
          )}
          {chat.map((c, i) => (
            <div key={i} style={{ alignSelf: c.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
              <div style={{ 
                padding: '12px 18px', borderRadius: '15px', color: 'white', 
                background: c.role === 'user' ? '#3b82f6' : '#334155'
              }}>
                {c.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} style={{ padding: '20px', display: 'flex', gap: '10px', background: '#1e293b' }}>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder={`Type to ${mode}...`}
            style={{ flex: 1, padding: '15px', borderRadius: '10px', border: 'none', background: '#334155', color: 'white' }}
          />
          <button type="submit" disabled={isLoading} style={{ 
            padding: '0 30px', borderRadius: '10px', border: 'none', color: 'white', 
            background: modeConfig[mode].color, fontWeight: 'bold' 
          }}>
            {isLoading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}