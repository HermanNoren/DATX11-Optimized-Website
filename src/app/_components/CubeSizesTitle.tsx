import { RefObject } from "react";

export default function CubeSizesTitle(props: {
  text: string;
  ref: RefObject<HTMLHeadingElement | null>;
}) {
  const words = props.text.split(" ");
  return (
    <h2
      ref={props.ref}
      className="flex flex-wrap text-6xl h-4 leading-[1.25em]"
    >
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;

        return (
          <span key={i} className="relative flex mr-1 overflow-hidden">
            <span
              id="sizeTitleText"
              className="relative translate-y-[100%]"
              key={i}
            >
              {word}
            </span>
            {isLastWord ? null : <>&nbsp;</>}
          </span>
        );
      })}
    </h2>
  );
}
