import React, { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Card from "../components/Card";

import SearchBar from "../components/searchBar";
const SplineComponent = lazy(() => import("@splinetool/react-spline"));

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Data received:", data); // Debug log
      setFoodItems(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div style={{ position: "relative" }}>
        <Suspense fallback={<div>Loading Spline...</div>} />
        <SplineComponent scene="https://prod.spline.design/2LffDOAc-8sDygWk/scene.splinecode" />
        <div><SearchBar search={search} setSearch={setSearch} /></div>
      </div>
      {/* <div><Carousal /></div> */}
      
      <div className="container mt-4">
        {foodCat.length !== 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="mb-4">
              <h2 className="fs-4 mb-3">{category.CategoryName}</h2>
              <hr />
              <div className="row">
                {foodItems.length !== 0 ? (
                  foodItems
                    .filter((item) =>  item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                    .map((item) => ( 
                      <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <Card
                          foodItem={item}
                          foodName={item.name}
                          foodDesc={item.description}
                          foodImg={item.img}
                          options={item.options}
                        />

                      </div>
                    ))
                ) : (
                  <div>No items found in this category</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>Loading categories...</div>
        )}
      </div>

      <div><Footer /></div>
    </div>
  );
}

