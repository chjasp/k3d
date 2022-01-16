import React, { useState, useEffect } from "react";
import Card from "./Card";
import Bottom from "./Bottom";
import { Data } from "../../Data";
import { ImCross } from "react-icons/im";
import "./Recommender.css";

const Recommender = ({ setHighlight, setOpenModal }) => {
  const [products, setProducts] = useState(Data);
  const [likedProducts, setLikedProducts] = useState([]);
  const [superlikedProducts, setSuperlikedProducts] = useState([]);
  const [dislikedProducts, setDislikedProducts] = useState([]);
  const [displayedProduct, setDisplayedProduct] = useState(0);

  useEffect(() => {
    const stored_products = localStorage.getItem("products");
    const stored_likes = localStorage.getItem("likedProducts");
    const stored_superlikes = localStorage.getItem("superlikedProducts");
    const stored_dislikes = localStorage.getItem("dislikedProducts");
    const stored_displayed = localStorage.getItem("displayedProducts");

    if (stored_products) {
      try {
        setProducts(JSON.parse(stored_products));
      } catch {
        return;
      }
    }

    if (stored_likes) {
      try {
        setLikedProducts(JSON.parse(stored_likes));
      } catch {
        return;
      }
    }

    if (stored_superlikes) {
      try {
        setSuperlikedProducts(JSON.parse(stored_superlikes));
      } catch {
        return;
      }
    }

    if (stored_dislikes) {
      try {
        setDislikedProducts(JSON.parse(stored_dislikes));
      } catch {
        return;
      }
    }

    if (stored_displayed) {
      try {
        setDisplayedProduct(JSON.parse(stored_displayed));
      } catch {
        return;
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    localStorage.setItem("superlikedProducts", JSON.stringify(superlikedProducts));
    localStorage.setItem("dislikedProducts", JSON.stringify(dislikedProducts));
    localStorage.setItem("displayedProducts", JSON.stringify(displayedProduct));
  });

  const handleChoice = async (id, action) => {
    switch (action) {
      case "ADD_TO_LIKED_PRODUCTS":
        let tmp_likes = likedProducts;
        tmp_likes.push(id);
        setLikedProducts(tmp_likes);

        let cleanProductsL = products.filter((product, idx) => idx != id);
        setProducts(cleanProductsL);

        let modelL = {
          superlikes: superlikedProducts,
          likes: likedProducts,
          dislikes: dislikedProducts,
        };

        let respL = await fetch("http://localhost:8000/getnext/", {
          method: "POST",
          body: JSON.stringify(modelL),
        });
        let respJSONL = await respL.json();
        setDisplayedProduct(respJSONL["best_match"]);
        break;

      case "ADD_TO_SUPERLIKED_PRODUCTS":
        let tmp_superlikes = superlikedProducts;
        tmp_superlikes.push(id);
        setSuperlikedProducts(tmp_superlikes);

        let cleanProductsSL = products.filter((product, idx) => idx != id);
        setProducts(cleanProductsSL);

        let modelSL = {
          superlikes: tmp_superlikes,
          likes: likedProducts,
          dislikes: dislikedProducts,
        };

        let respSL = await fetch("http://localhost:8000/getnext/", {
          method: "POST",
          body: JSON.stringify(modelSL),
        });
        let respJSONSL = await respSL.json();
        setDisplayedProduct(respJSONSL["best_match"]);
        break;

      case "ADD_TO_DISLIKED_PRODUCTS":
        let tmp_dislikes = dislikedProducts;
        tmp_dislikes.push(id);
        setDislikedProducts(tmp_dislikes);

        let cleanProductsDL = products.filter((product, idx) => idx != id);
        setProducts(cleanProductsDL);

        let modelDL = {
          superlikes: superlikedProducts,
          likes: likedProducts,
          dislikes: tmp_dislikes,
        };

        let respDL = await fetch("http://localhost:8000/getnext/", {
          method: "POST",
          body: JSON.stringify(modelDL),
        });
        let respJSONDL = await respDL.json();
        setDisplayedProduct(respJSONDL["best_match"]);
        break;

      default:
        return null;
    }
  };

  return (
    <div className={`outer-wrap ${false ? "hidden" : undefined}`}>
      <div className="recomm-wrapper">
        <button
          className="close-modal-btn"
          type="button"
          onClick={() => setOpenModal(false)}
        >
          <ImCross className="close-modal-logo" />
        </button>
        <Card id={displayedProduct} handleChoice={handleChoice} />
        <Bottom
          currentId={displayedProduct}
          currentLikes={likedProducts}
          currentDislikes={dislikedProducts}
          currentSuperlikes={superlikedProducts}
          setHighlight={setHighlight}
          setOpenModal={setOpenModal}
        />
      </div>
    </div>
  );
};

export default Recommender;
