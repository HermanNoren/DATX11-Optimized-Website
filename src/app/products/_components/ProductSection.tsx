"use client";

import React, { useState } from "react";
import MaskText from "@/components/MaskText";
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

    if (currentQuantity >= 10) {
      return;
    }

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
        <button
          onClick={AddingToCart}
          disabled={isMaxReached}
          className={`
            text-[#95614E] 
            font-normal 
            relative 
            inline-block 
            cursor-pointer 
            pb-0.5 
            after:content-[''] 
            after:absolute 
            after:left-0 
            after:bottom-0 
            after:w-[225%] 
            after:h-[1px] 
            after:bg-[#95614E]
            before:content-[''] 
            before:absolute 
            before:right-[-125%] 
            before:bottom-0 
            before:w-[1px] 
            before:h-[1.2em] 
            before:bg-[#95614E]
            hover:text-[#404040] 
            hover:after:bg-[#404040] 
            hover:before:bg-[#404040] 
            transition-all duration-300
            ${isAdded ? "scale-110 -translate-y-1 bg-opacity-75" : ""}
            ${isMaxReached ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <MaskText
            stagger={0.005}
            phrase={
              isMaxReached ? "Max Quantity" : isAdded ? "Added!" : "Add to Cart"
            }
          />
        </button>
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
      <div className="flex-1 flex justify-center">
        <img src={`/${name}.gif`} alt="Product" className="w-4/5 h-auto" />
      </div>
      <div className="flex-1 text-[#404040] flex justify-end">
        <p className="text-right w-3/5">
          <MaskText stagger={0.005} phrase={description} />
        </p>
      </div>
    </div>
  );
};

export default ProductSection;
