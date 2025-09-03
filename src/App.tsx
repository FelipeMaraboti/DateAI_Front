import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function App() {
  const [dark, setDark] = useState(false);
  const [ask, setAsk] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const body = document.body;

    if (dark) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [dark]);

  async function handleGenerateAsk(choice: number) {
    setLoading(true);
    setAsk('');
    try {
      const res = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice })
      });

      const data = await res.json()
      console.log(data)
      setAsk(data.answer);
    } catch (err) {
      setAsk("Erro ao gerar resposta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen w-screen px-36">
      {!ask ?
        (
          <>
            <header className="w-full flex justify-between items-center py-20">
              <h1 className="font-bold text-2xl" style={{ textShadow: '0.5px 0.5px 2px purple' }}>DateAI</h1>
              {
                !dark ? <Moon width={28} height={28} color="black" onClick={() => setDark(!dark)} className="cursor-pointer" /> : <Sun width={28} height={28} color="white" onClick={() => setDark(!dark)} className="cursor-pointer" />
              }
            </header>
            <main className="mb-36 flex-1 flex flex-col justify-center items-center">
              {loading ? (
                <p className={`text-3xl font-semibold mt-6 animate-pulse ${!dark ? "text-black" : "text-white"} `}>
                  Gerando sugestão...
                </p>
              ) : <div className="flex flex-col justify-center items-center gap-14">
                <h2 className="font-bold text-5xl text-center">Sem ideias para o date?<br />
                  A gente te ajuda!</h2>
                <p className="font-light text-2xl text-center">Escolha uma categoria e a IA vai sugerir algo<br /> incrível para vocês fazerem juntos.</p>
                <div className="flex justify-center items-center">
                  <div className="w-[550px] h-auto">
                    <ul className="flex gap-4 flex-wrap items-center justify-center">
                      <li>
                        <button onClick={() => handleGenerateAsk(1)} className={`flex gap-2 text-lg py-3 px-8 rounded-xl font-semibold ${!dark ? "bg-[#363636] text-white" : "bg-[#eaeaea] text-[#0f0c11]"} `}><span>🏝️</span>Tropical</button>
                      </li>
                      <li>
                        <button onClick={() => handleGenerateAsk(2)} className={`flex gap-2 text-lg py-3 px-8 rounded-xl font-semibold ${!dark ? "bg-[#363636] text-white" : "bg-[#eaeaea] text-[#0f0c11]"} `}><span>🍽️</span>Restaurante</button>
                      </li>
                      <li>
                        <button onClick={() => handleGenerateAsk(3)} className={`flex gap-2 text-lg py-3 px-8 rounded-xl font-semibold ${!dark ? "bg-[#363636] text-white" : "bg-[#eaeaea] text-[#0f0c11]"} `}><span>🏠</span>Caseiro</button>
                      </li>
                      <li>
                        <button onClick={() => handleGenerateAsk(4)} className={`flex gap-2 text-lg py-3 px-8 rounded-xl font-semibold ${!dark ? "bg-[#363636] text-white" : "bg-[#eaeaea] text-[#0f0c11]"} `}><span>🛫</span>Viajem</button>
                      </li>
                      <li>
                        <button onClick={() => handleGenerateAsk(5)} className={`flex gap-2 text-lg py-3 px-8 rounded-xl font-semibold ${!dark ? "bg-[#363636] text-white" : "bg-[#eaeaea] text-[#0f0c11]"} `}><span>🌳</span>Aventura</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>}

            </main>

          </>
        ) : (
          <>
            <div className="flex flex-col flex-1 justify-center items-center gap-10">
              <h1 className="font-bold text-5xl text-center w-6xl leading-[55px]" style={{ textShadow: '1px 1px 2px purple' }}>{ask}</h1>
              <button className={`flex gap-2 text-lg py-3 px-8 rounded-xl font-semibold ${!dark ? "bg-[#363636] text-white" : "bg-[#eaeaea] text-[#0f0c11]"} `} onClick={() => setAsk('')}>Gerar Outro</button>
            </div>
            {/*Voce deveria ir ao cinema com seu amor, seria um date legal tranquilo, após isso voces pode ir a um lugar ver a vista da cidade e aumentarem a conexão de voces!!*/}
          </>


        )
      }
    </div>
  )
}

export default App;


