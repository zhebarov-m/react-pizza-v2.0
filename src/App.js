import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Card from "./pages/Cart";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";

import "./scss/app.scss";

function App() {

  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/card" element={<Card />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;

