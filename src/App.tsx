import './App.scss'
import {Header} from "./components/Header.tsx";
import {Home} from "./pages/Home.tsx";
import {Footer} from "./pages/Footer.tsx";
import {Route, Routes} from "react-router-dom";
import {CategoryPage} from "./components/CategoryPage.tsx";
import {WatchPage} from "./pages/WatchPage.tsx";

function App() {

  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phim-le" element={<CategoryPage />} />
            <Route path="/phim-bo" element={<CategoryPage />} />

            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/country/:slugCountry" element={<CategoryPage />} />
            <Route path="/chu-de/:slugChuDe" element={<CategoryPage />} />

            <Route path="/xem-phim/:slug" element={<WatchPage />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App
