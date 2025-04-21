import { RefObject } from "react";

export default function CubeSizeInfo(props: {
  text: string;
  ref: RefObject<HTMLSpanElement | null>;
}) {
  const words = props.text.split(" ");
  return (
    <div className="absolute w-[36em]">
      <span ref={props.ref} className="flex flex-wrap h-4 leading-[1.25em]">
        {words.map((word, i) => {
          const chars = word.split("");

          return (
            <span key={i} className="relative flex mr-1 overflow-hidden">
              {chars.map((char, i) => {
                return (
                  <span
                    id="sizeDescText"
                    className="relative translate-y-[100%]"
                    key={i}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </div>
  );
}
