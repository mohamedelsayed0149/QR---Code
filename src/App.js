import axios from "axios";
import { createContext, useState } from "react";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import InputForm from "./components/InputForm";
import QrCode from "./components/QrCode";

// Create context
export const InputContext = createContext();

function App() {
  const [inputValue, setInputValue] = useState({
    url: "",
    color: "",
  });
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: { Authorization: "Bearer 29af7a80-bc59-11ec-90f8-37f3c9e2f652" },
  };
  const bodyParameters = {
    colorDark: inputValue.color,
    qrCategory: "url",
    text: inputValue.url,
  };
  const getQrCode = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://qrtiger.com/api/qr/static",
        bodyParameters,
        config
      );
      setResponse(res.data.url);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    inputValue,
    setInputValue,
    getQrCode,
    response,
    loading,
    error,
  };

  return (
    <>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen pt-24 md:pt-80 px-2">
        <Hero />
        <div className="container mx-auto max-w-4xl bg-white rounded-md shadow">
          <div className="md:grid md:grid-cols-3">
            <InputContext.Provider value={value}>
              <InputForm />
              <QrCode />
            </InputContext.Provider>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
