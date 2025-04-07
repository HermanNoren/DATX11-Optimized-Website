"use client";

import React, { createContext, useState, useContext } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  dimensions: string;
  image: string;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContext {
  cartItems: CartItem[];
  cartCount: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartConditions = createContext<CartContext | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addItem = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartConditions.Provider
      value={{ cartItems, cartCount, addItem, removeItem, updateQuantity }}
    >
      {children}
    </CartConditions.Provider>
  );
}

export function useCart() {
  const context = useContext(CartConditions);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
