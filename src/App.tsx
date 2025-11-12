import './App.scss'
import {Header} from "./components/Header.tsx";
import {Home} from "./pages/Home.tsx";
import {Footer} from "./pages/Footer.tsx";

function App() {

  return (
    <>
      <Header />
        <Home />
        <Footer />
    </>
  )
}

export default App
