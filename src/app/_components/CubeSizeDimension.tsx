import { RefObject } from "react";

export default function CubeSizeDimension(props: {
  text: string;
  ref: RefObject<HTMLSpanElement | null>;
}) {
  const words = props.text.split(" ");
  return (
    <div className="absolute w-[36em]">
      <span ref={props.ref} className="flex flex-wrap h-4 leading-[1.25em]">
        {words.map((word, i) => {
          const chars = word.split("");
          const isLastWord = i === words.length - 1;

          return (
            <span key={i} className="relative flex overflow-hidden">
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
              {isLastWord ? null : <>&nbsp;</>}
            </span>
          );
        })}
      </span>
    </div>
  );
}
