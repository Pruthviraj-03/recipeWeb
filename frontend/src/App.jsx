import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import NextCard from "./Home/NextCard";
import Download from './Header/Download';
import History from "./Header/History"
import Category from "./Category/Category"
import Breakfast from "./Category/Breakfast"
import Lunch from "./Category/Lunch"
import Supper from "./Category/Supper"
import Dinner from "./Category/Dinner"
import Free from './Free/Free';
import Scripts from './Scripts/Main/Scripts';
import Chicken from "./Scripts/Category/Chicken";
import Dessert from "./Scripts/Category/Dessert"
import Seafood from "./Scripts/Category/Seafood";
// import Breakfast from "./Scripts/Category/Breakfast";
import Vegetarian from "./Scripts/Category/Vegetarian";
import Italian from "./Scripts/Area/Italian";
import Japanese from "./Scripts/Area/Japanese";
import Mexican from "./Scripts/Area/Mexican";
import French from "./Scripts/Area/French";
import Indian from "./Scripts/Area/Indian";
import ScriptOpen from './Scripts/Main/ScriptOpen';
import Reviews from './Reviews/Reviews';
import NotFound from './NotFound/NotFound';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nextCard" element={<NextCard />} />
          <Route path="/downloads" element={<Download />} />
          <Route path="/history" element={<History />} />

          <Route path="/category" element={<Category />} />
          <Route path="/category/breakfast" element={<Breakfast />} />
          <Route path="/category/lunch" element={<Lunch />} />
          <Route path="/category/supper" element={<Supper />} />
          <Route path="/category/dinner" element={<Dinner />} />

          <Route path="/free" element={<Free />} />

          <Route path="/scripts" element={<Scripts />} />
          <Route path="/scripts/chicken" element={<Chicken />} />
          <Route path="/scripts/dessert" element={<Dessert />} />
          <Route path="/scripts/seafood" element={<Seafood />} />
          {/* <Route path="/scripts/breakfast" element={<Breakfast />} /> */}
          <Route path="/scripts/vegetarian" element={<Vegetarian />} />
          <Route path="/scripts/italian" element={<Italian />} />
          <Route path="/scripts/japanese" element={<Japanese />} />
          <Route path="/scripts/mexican" element={<Mexican />} />
          <Route path="/scripts/french" element={<French />} />
          <Route path="/scripts/indian" element={<Indian />} />

          <Route path="/scriptOpen" element={<ScriptOpen />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/not-found" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
