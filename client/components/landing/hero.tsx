import { Navbar } from "../shared/navbar";

export const Hero: React.FC = () => {
  return (
    <section className="">
      <div className="flex">
        <div className="bg-white flex flex-col justify-center items-center h-full text-center w-full gap-y-8 py-40 px-20">
          <h1 className="text-5xl font-bold font-playfair-display">
            Revolutionizing Your Online Fashion Experience
          </h1>
          <p className="text-3xl max-w-6xl text-center font-light">
            Say goodbye to fashion uncertainty and hello to confidence with Maya
            2.0, ensuring every piece suits your body type and keeps you ahead
            of fashion trends.
          </p>
          <button className="relative items-center justify-center inline-block px-8 py-6 mt-10 rounded-full overflow-hidden bg-red font-medium text-black shadow-2xl group">
            <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-orange rounded-full blur-md ease"></span>
            <span className="absolute inset-0 w-full h-full transition duration-700 bg-pink group-hover:rotate-180 ease-out">
              <span className="absolute bottom-0 left-0 w-36 h-24 -ml-10 bg-red rounded-full blur-md"></span>
              <span className="absolute bottom-0 right-0 w-36 h-24 -mr-10 bg-orange rounded-full blur-md"></span>
            </span>
            <span className="relative text-2xl text-white">
              Try our Virtual trial room
            </span>
          </button>
        </div>
        <div className="relative h-screen w-2/3 bg-orange">
          <div className="w-40 h-40 bg-white rounded-lg absolute top-10 left-20"></div>
          <div className="w-40 h-40 bg-white rounded-lg absolute top-40 left-80"></div>
          <div className="w-40 h-40 bg-white rounded-lg absolute top-80 left-20"></div>
          <div className="w-40 h-40 bg-white rounded-lg absolute bottom-28 left-80"></div>
        </div>
      </div>
    </section>
  );
};
