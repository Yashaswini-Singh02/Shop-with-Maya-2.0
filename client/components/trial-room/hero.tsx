"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import axios from "axios";
import { ImageUpIcon, Loader2Icon, Trash2Icon } from "lucide-react";

interface imgProps {
  image: string;
  name: string;
}
const garmentImgBottom = [
  {
    image:
      "https://ik.imagekit.io/w8i0qfppp/loose%20denim%20jeans.jpg?updatedAt=1720872465556",
    name: "LOOSE DENIM JEANS",
    garment_zone: "lower_body",
  },
  {
    image:
      "https://ik.imagekit.io/w8i0qfppp/Denim%20bootcut%20jeans.jpg?updatedAt=1720914348175",
    name: "BOOTCUT DENIM JEANS",
    garment_zone: "lower_body",
  },
];
const garmentImgTop = [
  {
    image:
      "https://ik.imagekit.io/w8i0qfppp/denim%20corset.jpg?updatedAt=1720872465556",
    name: "DENIM CORSET",
    garment_zone: "upper_body",
  },

  {
    image:
      "https://ik.imagekit.io/w8i0qfppp/V-shape%20blouse.jpg?updatedAt=1720914348198",
    name: "V-SHAPE BLOUSE",
    garment_zone: "upper_body",
  },
];

export const Hero: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<string | null>(null);
  const [garmentZone, setGarmentZone] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement> | DragEvent
  ) => {
    const file =
      event instanceof DragEvent
        ? event.dataTransfer?.files?.[0]
        : event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    setLoading(true);
    if (userImage && selectedGarment) {
      console.log(userImage);
      const response = await axios.post("/api/model", {
        userImage: userImage,
        garmentImage: selectedGarment,
        garment_zone: garmentZone,
      });
      console.log(response);
      setResultImage(response.data.image);
    } else {
      alert("Please upload a picture and select a garment.");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setUserImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFileChange(event as unknown as DragEvent);
  };

  const handleSelectClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className="flex py-10 gap-x-8 px-10 bg-gradient-to-r">
      <span className="absolute w-full h-full transition-all duration-700 bg-orange/40 rounded-full blur-3xl"></span>

      <span className="absolute  w-full h-full  mt-56 bg-red/40 rounded-full blur-3xl"></span>
      <span className="absolute w-full h-20 ml-72 mb-72 bg-pink/60 rounded-full blur-3xl"></span>
      <div className="relative px-4 w-1/4 flex flex-col gap-4 pt-4 py-20 h-screen rounded-xl backdrop-filter backdrop-blur-xl bg-white/80">
        <h1 className="py-2 border border-pink rounded-md text-center font-medium bg-white backdrop-filter backdrop-blur-lg">
          STEP 1: UPLOAD YOUR PICTURE
        </h1>
        <div
          className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded mx-4 py-6 mt-8 gap-2 cursor-pointer bg-white/50 backdrop-filter backdrop-blur-lg"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleSelectClick}
        >
          {!userImage && <ImageUpIcon size={48} className="text-gray-500" />}
          <Input
            id="picture"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          {userImage && (
            <div>
              <Image
                src={userImage}
                alt="Selected Image"
                className="py-4 px-6"
                content="Selected Image"
                width={400}
                height={300}
              />
            </div>
          )}
        </div>
        {userImage && (
          <button
            className="mt-2 p-2 bg-red rounded font-medium w-fit mx-auto flex text-white gap-x-2 items-center "
            onClick={handleCancel}
          >
            Discard The current selection
            <Trash2Icon size={24} className="text-white" />
          </button>
        )}
      </div>
      <div className="relative h-screen w-1/3 rounded-xl flex flex-col justify-between items-start py-10 px-6 backdrop-filter backdrop-blur-xl bg-white/80">
        {loading && (
          <div className="bg-gray-200 bg-opacity-50 fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl">
              <Loader2Icon size={48} className="animate-spin text-blue-500" />
            </div>
          </div>
        )}

        {resultImage && (
          <Image
            src={resultImage}
            alt="Tryon Result"
            height={350}
            width={350}
            className="mx-auto rounded-xl"
          />
        )}

        <button
          className="py-2 border border-pink rounded-md text-center font-medium w-full bg-white/50 backdrop-filter backdrop-blur-lg"
          onClick={() => {
            if (resultImage) {
              setResultImage(null);
            } else {
              handleTryOn();
            }
          }}
          disabled={(!userImage || !selectedGarment) && !resultImage}
        >
          {resultImage ? "TRY SOMETHING ELSE" : "SEE HOW IT LOOKS"}
        </button>
      </div>
      <div className="relative w-full sm:w-1/3 px-4 py-4 backdrop-filter rounded-xl backdrop-blur-xl bg-white/80">
        <h1 className="py-2 border border-pink rounded-md text-center font-medium bg-white/50 backdrop-filter backdrop-blur-lg">
          STEP 2: DISCOVER YOUR FITS
        </h1>
        <div className="flex flex-col py-10 gap-y-8">
          <div className="flex flex-col  justify-center items-center gap-y-2">
            <h2 className="font-medium tracking-wide border w-max px-10 py-1 border-violet-500 rounded-lg bg-white/50 backdrop-filter backdrop-blur-lg">
              TOPS
            </h2>

            <div className="grid grid-cols-2 gap-4 py-4 px-8 rounded-xl bg-white/50 backdrop-filter backdrop-blur-lg">
              {garmentImgTop.map((garment) => (
                <div
                  key={garment.name}
                  onClick={() => {
                    setSelectedGarment(garment.image);
                    setGarmentZone(garment.garment_zone);
                  }}
                  className={`
          cursor-pointer border rounded-lg flex flex-col justify-between overflow-hidden bg-white
          ${
            selectedGarment === garment.image
              ? " border-blue-500 shadow-md"
              : " border-gray-300"
          }
        `}
                >
                  <div className="relative">
                    <Image
                      src={garment.image}
                      alt={garment.name}
                      layout="responsive"
                      width={50}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-center font-medium">
                      {garment.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-2">
            <h2 className="font-medium tracking-wide border w-max px-10 py-1 border-violet-500 rounded-lg">
              BOTTOMS
            </h2>
            <div className="grid grid-cols-2 gap-4 py-4 px-8 rounded-xl ">
              {garmentImgBottom.map((garment) => (
                <div
                  key={garment.name}
                  onClick={() => {
                    setSelectedGarment(garment.image);
                    setGarmentZone(garment.garment_zone);
                  }}
                  className={`
          cursor-pointer border rounded-lg flex flex-col justify-between overflow-hidden bg-white
          ${
            selectedGarment === garment.image
              ? " border-blue-500 shadow-md"
              : " border-gray-300"
          }
        `}
                >
                  <div className="relative">
                    <Image
                      src={garment.image}
                      alt={garment.name}
                      layout="responsive"
                      width={50}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-center font-medium">
                      {garment.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
