import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
//import EnglishPage from "./pages/EnglishPage";
import ChinesePage from "./pages/ChinesePage";
import EnglishPageOfficial from "./pages/EnglishPageOfficial";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        {/* <Route path="/english_page" element={<EnglishPage />} />*/}
        <Route path="/english_page" element={<EnglishPageOfficial />} />

        <Route path="/chinese_page" element={<ChinesePage />} />
      </Routes>
    </div>
  );
}

export default App;
