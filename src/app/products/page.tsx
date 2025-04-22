import Footer from "@/components/footer/Footer";
import React from "react";
import ProductSection from "./_components/ProductSection";
import ProductHero from "./_components/ProductHero";

const ProductPage: React.FC = () => {
  const products = [
    {
      id: "petite",
      name: "PETITE",
      dimensions: "10x10x10 cm",
      value: "4999",
      description:
        "The Petit, a refined choice for those who value rarity in a compact form. A favorite among collectors looking to own a rare piece of the future. Whether displayed on a desk or stored as a long-term asset, it carries the unmistakable presence of something beyond Earth.",
    },
    {
      id: "regal",
      name: "REGAL",
      dimensions: "20x20x20 cm",
      value: "7999",
      description:
        "The Regal, a perfect balance of rarity and prestige, the go-to choice for industry leaders and forward-thinkers. Coveted yet attainable, it's the cube that moves industries and closes deals. When a Regal is in your hands, you hold more than metal—you hold progress.",
    },
    {
      id: "imperial",
      name: "IMPERIAL",
      dimensions: "30x30x30 cm",
      value: "9999",
      description:
        "The Imperial, the largest and boldest, a monolith of Astrolite, commanding attention whether placed in a headquarters or private collection. Its sheer presence is a testament to those who operate on a grander scale. To own an Imperial is to stake a claim in the future itself.",
    },
  ];

  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="gradient-bg relative z-10 ">
        <ProductHero />
        {products.map((product) => (
          <ProductSection key={product.id} {...product} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
