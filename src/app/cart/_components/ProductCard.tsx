import Image from "next/image";
import Button from "@/components/Button";
import { Check, Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";

interface ProductCardProps {
  name: string;
  price: number;
  dimensions: string;
  image: string;
  quantity: number;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export default function ProductCard({
  name,
  price,
  dimensions,
  image,
  quantity,
  onRemove,
  onQuantityChange,
}: ProductCardProps) {
  const [isActive, setIsActive] = useState(false);
  function onItemChange(newValue: number) {
    if (newValue <= 0) {
      setIsActive(true);
      return;
    }

    onQuantityChange(newValue);
  }

  return (
    <div className="relative bg-white flex justify-between m-2 w-150 p-10 rounded-sm">
      <div className="flex w-full gap-8">
        <Image
          src={image}
          width={200}
          height={200}
          alt={`${name} Product`}
          className="size-58"
        />
        <div className="w-full h-full flex flex-col justify-center">
          <div className="flex justify-between items-center pb-2">
            <h2 className="text-4xl ">{name}</h2>
          </div>

          <p className="text-sm opacity-70">{dimensions}</p>
          <p className="text-sm opacity-70">{formatPrice(price)} SEK</p>
          <p className="mt-6 mb-2">
            Total: {formatPrice(price * quantity)} SEK
          </p>
          <div className="flex justify-between items-center p-2 border border-foreground w-fit">
            <div className="flex gap-4">
              <button onClick={() => onItemChange((quantity -= 1))}>
                <Minus strokeWidth={0.75} className="size-6" />
              </button>
              <span>{quantity}</span>
              <button onClick={() => onItemChange((quantity += 1))}>
                <Plus strokeWidth={0.75} className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="absolute top-4 right-4"
        onClick={() => setIsActive(true)}
      >
        <X strokeWidth={1} className="size-6" />
      </button>
      <Modal
        isActive={isActive}
        setIsActive={setIsActive}
        onRemove={onRemove}
      />
    </div>
  );
}

interface ModalProps {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  onRemove: () => void;
}

function Modal({ isActive, setIsActive, onRemove }: ModalProps) {
  function onYes() {
    onRemove();
    setIsActive(false);
  }
  return (
    <div
      className={cn(
        "inset-0 grid place-items-center relative z-100",
        isActive ? "fixed" : "hidden"
      )}
    >
      <div
        onClick={() => setIsActive(false)}
        className="absolute inset-0 bg-black/50 cursor-pointer"
      ></div>
      <div className="relative w-100 gradient-bg p-12 flex flex-col gap-12">
        <h2 className="text-4xl">Are you sure you want to remove?</h2>
        <div className="flex justify-between">
          <Button
            icon={<Check strokeWidth={1} className="size-6" />}
            onClick={onYes}
          >
            Yes
          </Button>
          <Button onClick={() => setIsActive(false)}>No</Button>
        </div>
      </div>
    </div>
  );
}

/*
const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  dimensions,
  image,
  quantity,
  onRemove,
  onQuantityChange,
}) => {
  return (
    <div className="productCard-card">
      <img src={image} alt={`${name} Product`} className="productCard-image" />
      <div className="productCard-text">
        <div className="productCard-text-top">
          <h1 className="productCard-title">{name}</h1>
          <div className="productCard-quantity-amount">
            <select
              value={quantity}
              onChange={(e) => onQuantityChange(Number(e.target.value))}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <p className="productCard-price" data-price={formatPrice(price)}>
            SEK
          </p>
        </div>
        <div className="productCard-text-bottom">
          <p className="productCard-dimensions">
            <strong>Dimensions:</strong> {dimensions}
          </p>
          <p className="productCard-remove" onClick={onRemove}>
            Remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

*/
