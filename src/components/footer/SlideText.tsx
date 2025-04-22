import VelocityScroll from "@/components/VelocityScroll";

export default function SlideText() {
  const text = "CUBE/KUB/CUBO/KUUTIO/立方体/CUBE/KUB/CUBO/KUUTIO/立方体/";
  return (
    <>
      <div className="w-screen bg-accent py-container-padding relative z-20 select-none overflow-x-hidden">
        <VelocityScroll baseVelocity={1} className={"text-background text-2xl"}>
          {text}
        </VelocityScroll>
      </div>
    </>
  );
}
