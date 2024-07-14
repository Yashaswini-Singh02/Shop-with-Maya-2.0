"use client";

import { Hero } from "@/components/trial-room/hero";

const TryonPage: React.FC = () => {
  return (
    <section>
      {/* <h1>Tryon Page</h1>
      <Button
        onClick={() => {
          handleTryOn();
        }}
      >
        Try
      </Button>

      {resultImage && (
        <img src={resultImage} alt="Tryon Result" className="h-60 w-60" />
      )} */}
      <div className="bg">
        <Hero />
      </div>
    </section>
  );
};

export default TryonPage;
