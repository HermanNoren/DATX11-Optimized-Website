"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "./_components/cartlogic";
import "./cartpage.css";
import ProductCard from "./_components/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  dimensions: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: "petite",
    name: "PETITE",
    price: 4999,
    dimensions: "10x10x10 cm",
    image: "/PETITE.gif",
  },
  {
    id: "regal",
    name: "REGAL",
    price: 7999,
    dimensions: "20x20x20cm",
    image: "/REGAL.gif",
  },
  {
    id: "imperial",
    name: "IMPERIAL",
    price: 9999,
    dimensions: "30x30x30cm",
    image: "/IMPERIAL.gif",
  },
];

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const CheckoutPage: React.FC = () => {
  const {
    cartItems,
    addItem: addToCart,
    removeItem: removeFromCart,
    updateQuantity,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="checkout-page border">
      <div className="shopping-cart">
        <div className="checkout-header">
          <h2 className="checkout-bag">
            Bag total: {formatPrice(totalPrice)} SEK
          </h2>
        </div>
        <p className="checkout-text">Worldwide shipping and no returns</p>

        <div className="add-buttons">
          {PRODUCTS.map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              disabled={cartItems.some((item) => item.id === product.id)}
            >
              ADD {product.name}
            </button>
          ))}
        </div>
        <div className="checkout-line"></div>
        <div className="checkout-product-grid">
          {cartItems.map((item) => (
            <ProductCard
              key={item.id}
              name={item.name}
              price={item.price * item.quantity}
              dimensions={item.dimensions}
              image={item.image}
              quantity={item.quantity}
              onRemove={() => removeFromCart(item.id)}
              onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
            />
          ))}
        </div>
        <div className="margin"></div>
        <div className="checkout-footer">
          <Link href="/lastpage">
            <button className="checkout-button">CHECKOUT</button>
          </Link>
          <p className="bottom-text">
            DISCLAIMER: this isn't a real checkout. pressing the
            <br />
            button brings you to the end of the site
          </p>
        </div>
      </div>
      <div className="margin">.</div>
    </div>
  );
};

export default CheckoutPage;
