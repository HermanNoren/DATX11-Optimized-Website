"use client";

import React, { useState } from "react";
import MaskText from "@/components/MaskText";
import Button from "@/components/Button";
import { useCart } from "@/app/cart/_components/cartlogic";

interface ProductSectionProps {
  id: string;
  name: string;
  dimensions: string;
  value: string;
  description: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  id,
  name,
  dimensions,
  value,
  description,
}) => {
  const { addItem, cartItems, removeItem, updateQuantity } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const CurrentQuantity = () => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const AddingToCart = () => {
    const currentQuantity = CurrentQuantity();

    if (currentQuantity >= 10) return;

    addItem({
      id,
      name,
      price: parseInt(value),
      dimensions,
      image: `/${name}.gif`,
      description: description,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  const RemoveOneItem = () => {
    const currentItem = cartItems.find((item) => item.id === id);
    if (currentItem && currentItem.quantity > 1) {
      updateQuantity(id, currentItem.quantity - 1);
    } else {
      removeItem(id);
    }
  };

  const currentQuantity = CurrentQuantity();
  const isMaxReached = currentQuantity >= 10;

  return (
    <div className="flex justify-between items-start px-8 py-10 mt-16 gap-8 pb-40">
      {/* Left Section */}
      <div className="flex-1 p-8">
        <h2 className="text-4xl text-[#404040] mb-1">
          <MaskText stagger={0.005} phrase={name} />
        </h2>
        <p className="my-2 text-[#404040]">
          <MaskText stagger={0.005} phrase={`Dimensions: ${dimensions}`} />
        </p>
        <p className="my-2 text-[#404040]">
          <MaskText stagger={0.005} phrase={`Value: ${value} sek`} />
        </p>

        {/* Add to Cart Button with + icon */}
        <div className="mt-6 max-w-xs">
          <Button
            onClick={AddingToCart}
            disabled={isMaxReached}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block align-middle ml-2  mt-20 pt-20 absolut top-[4px]"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            }
            
            className={`w-fit ${
              isAdded ? "scale-110 -translate-y-1 bg-opacity-75" : ""
            } ${isMaxReached ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <MaskText
              stagger={0.005}
              phrase={
                isMaxReached ? "Max Quantity" : isAdded ? "Added!" : "Add to Cart"
              }
            />
          </Button>
        </div>

        {/* Remove from cart */}
        {currentQuantity > 0 && (
          <div className="flex items-center gap-2 my-2 text-[#404040]">
            <p>
              {currentQuantity} {name} in cart
            </p>
            <button
              onClick={RemoveOneItem}
              className="ml-2 text-[#95614E] hover:text-[#404040] transition-colors"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Center Image */}
      <div className="flex-1 flex justify-center">
        <img src={`/${name}.gif`} alt="Product" className="w-4/5 h-auto" />
      </div>

      {/* Right Description */}
      <div className="flex-1 text-[#404040] flex justify-end">
        <p className="text-right w-3/5">
          <MaskText stagger={0.005} phrase={description} />
        </p>
      </div>
    </div>
  );
};

export default ProductSection;
