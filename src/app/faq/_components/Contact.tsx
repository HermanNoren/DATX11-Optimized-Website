import Image from "next/image";

export default function Contact() {
  return (
    <section className="w-full py-[10em] flex justify-center gradient-bg relative z-10">
      <div className="grid grid-cols-14 relative">
        {/* Left Section: Text */}
        <div className="flex flex-col col-span-6 justify-center text-center ">
          <h2 className=" translate-x-[30%] text-7xl font-light uppercase z-10">
            Any other
            <br />
            questions?
          </h2>
          <div className="mt-[2em] space-y-2 text-sm text-right uppercase font-light m-[1em] ">
            <p>+46 123 456 789</p>
            <p>contact@decube.com</p>
            <p>deCube Street, Gothenburg, Sweden</p>
          </div>
        </div>

        {/* Right Section: Image */}
        <div
          className="w-full max-w-md col-span-8 relative 
        "
        >
          <Image
            src="/ChairContact.png"
            alt="Contact Chair"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
