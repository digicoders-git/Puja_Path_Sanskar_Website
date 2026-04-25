import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useRef } from "react"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Home from "./pages/Home/Home"
import Pandits from "./pages/Pandits/Pandits"
import Pujas from "./pages/Pujas/Pujas"
import Contact from "./pages/Contact/Contact"
import Register from "./pages/Register/Register"
import NotFound from "./pages/NotFound/NotFound"

function App() {
  const navRef = useRef(null)

  useEffect(() => {
    const updatePadding = () => {
      const nav = navRef.current
      const main = document.getElementById("main-content")
      if (nav && main) {
        main.style.paddingTop = nav.offsetHeight + "px"
      }
    }

    updatePadding()
    setTimeout(updatePadding, 100)
    window.addEventListener("resize", updatePadding)
    return () => window.removeEventListener("resize", updatePadding)
  }, [])

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <Navbar navRef={navRef} />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pandits" element={<Pandits />} />
            <Route path="/pujas" element={<Pujas />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
