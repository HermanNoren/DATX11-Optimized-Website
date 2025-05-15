"use client";

import React, { useRef, useState } from "react";
import MaskText from "@/components/MaskText";
import Button from "@/components/Button";
import { useCart } from "@/app/cart/_components/cartlogic";
import { Plus } from "lucide-react";
import gsap from "gsap";
import ParallaxScroll from "@/components/ParallaxScroll";
import Image from "next/image";

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
  const iconRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  function onClick() {
    AddingToCart();
    gsap.fromTo(
      iconRef.current,
      { rotate: "0deg" },
      {
        rotate: "+=180deg",
        duration: 0.5,
        ease: "power4.out",
      }
    );

    const tl = gsap.timeline({ paused: true });

    tl.clear()
      .to(lineRef.current, {
        backgroundColor: "oklch(72.3% 0.219 149.579)",
        duration: 0.3,
        ease: "power4.out",
      })
      .to(lineRef.current, {
        backgroundColor: "oklch(0.147 0.004 49.25)",
        duration: 0.7,
        ease: "power4.in",
      })
      .play();
  }

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
    <div className="relative flex justify-between container is-sm gap-8">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-4xl text-[#404040] mb-1">
          <MaskText stagger={0.005} phrase={name} />
        </h2>
        <p className=" text-[#404040]">
          <MaskText stagger={0.005} phrase={`Dimensions: ${dimensions}`} />
        </p>
        <p className="mt-2 text-[#404040]">
          <MaskText stagger={0.005} phrase={`Value: ${value} sek`} />
        </p>

        {/* Add to Cart Button - replaced with custom Button component */}
        <div className="mt-6 max-w-xs">
          <Button
            onClick={onClick}
            disabled={isMaxReached}
            icon={<Plus className="size-7" strokeWidth={0.75} />}
            iconRef={iconRef}
            lineRef={lineRef}
          >
            ADD TO CART
          </Button>
        </div>

        {/* Remove */}
        {currentQuantity > 0 && (
          <div className="absolute bottom-8 flex items-center gap-2 my-2 text-[#404040]">
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
        <ParallaxScroll factor={0.1}>
          <Image
            src={`/${name}.gif`}
            alt="Product"
            width={400}
            height={400}
            className="w-full aspect-square"
          />
        </ParallaxScroll>
      </div>

      {/* Right Description */}
      <div className="flex-1 text-[#404040] flex items-center justify-end">
        <p className="text-right w-3/5">
          <MaskText stagger={0.01} phrase={description} />
        </p>
      </div>
    </div>
  );
};

export default ProductSection;
