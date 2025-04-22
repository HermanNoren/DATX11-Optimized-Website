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
          const isLastWord = i === words.length - 1;

          return (
            <span key={i} className="relative flex overflow-hidden">
              <span
                id="sizeDescText"
                className="relative translate-y-[100%]"
                key={i}
              >
                {word}
              </span>
              {isLastWord ? null : <>&nbsp;</>}
            </span>
          );
        })}
      </span>
    </div>
  );
}
