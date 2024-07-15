"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { HeartOff, Loader2Icon } from "lucide-react";
import { DonutChart, Legend } from "@tremor/react";

interface LikedOutfitProps {
  _id: string;
  image: string;
  title: string;
  garment_zone: string;
}

interface UserProfileProps {
  email: string;
  liked_outfits: LikedOutfitProps[];
}

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showChart, setShowChart] = useState<boolean>(false);
  const [garmentAnalysis, setGarmentAnalysis] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let user = localStorage.getItem("user");
        const response = await axios.get(
          `http://localhost:8080/api/users/${user}`
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleRemoveLike = async (outfitId: string) => {
    try {
      if (outfitId) {
        let user = localStorage.getItem("user");
        await axios.delete(
          `http://localhost:8080/api/users/${user}/liked_outfits/${outfitId}`
        );
        // @ts-ignore
        setUserProfile((prev) => ({
          ...prev,
          liked_outfits: prev?.liked_outfits.filter(
            (likedOutfit) => likedOutfit._id !== outfitId
          ),
        }));
      }
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };

  const generateGarmentAnalysis = () => {
    if (userProfile) {
      const analysis = userProfile.liked_outfits.reduce((acc, outfit) => {
        acc[outfit.garment_zone] = (acc[outfit.garment_zone] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const data = Object.entries(analysis).map(([name, count]) => ({
        name,
        count,
      }));

      setGarmentAnalysis(data);
      setShowChart(true);
    }
  };

  useEffect(() => {
    generateGarmentAnalysis();
  }, [userProfile]);

  return (
    <section className="py-10 gap-x-8 px-10 bg-gradient-to-r">
      <span className="absolute w-full h-full transition-all duration-700 bg-orange/40 rounded-full blur-3xl"></span>
      <span className="absolute w-full h-full mt-56 bg-red/40 rounded-full blur-3xl"></span>
      <span className="absolute w-full h-20 ml-72 mb-72 bg-pink/60 rounded-full blur-3xl"></span>

      <div className="">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="bg-white p-4 rounded-xl">
              <Loader2Icon size={48} className="animate-spin text-blue-500" />
            </div>
          </div>
        ) : (
          userProfile && (
            <div className="flex justify-around">
              <div className="flex flex-col items-center relative h-40 px-10 justify-center backdrop-filter rounded-xl backdrop-blur-xl bg-white/80">
                <div className="bg-white px-4 py-4 border-pink border rounded-lg">
                  <span> USER PROFILE DETAILS</span>
                  <h2 className="mt-4">Email: {userProfile.email}</h2>
                </div>
              </div>

              <div className="backdrop-filter gap-y-8 rounded-lg backdrop-blur-xl bg-white/80 h-full w-2/3 flex flex-col items-center justify-around px-10 py-10">
                <h2 className="bg-white px-4 py-4 border-pink border rounded-lg w-full text-center font-medium tracking-widest">
                  LIKED OUTFITS
                </h2>
                <div className="flex justify-between items-center w-full">
                  <div className="grid grid-cols-2 gap-4 py-4 px-8 rounded-xl bg-white/50 backdrop-filter backdrop-blur-lg w-full">
                    {userProfile.liked_outfits.map((outfit) => (
                      <div
                        key={outfit.title}
                        className="cursor-pointer border rounded-lg flex flex-col justify-between bg-white border-gray-300"
                      >
                        <div className="relative">
                          <Image
                            src={outfit.image}
                            alt={outfit.title}
                            layout="responsive"
                            width={50}
                            height={100}
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-center font-medium">
                            {outfit.title}
                          </p>
                          <button
                            className="text-amber-800 flex gap-x-4 items-center justify-center text-md  px-4 py-4 w-full mt-4"
                            onClick={() => {
                              handleRemoveLike(outfit._id);
                              setUserProfile({
                                ...userProfile,
                                liked_outfits: userProfile.liked_outfits.filter(
                                  (likedOutfit) =>
                                    likedOutfit._id !== outfit._id
                                ),
                              });
                            }}
                          >
                            UNLIKE
                            <HeartOff />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="">
                    {showChart && (
                      <div className="flex flex-col space-y-6">
                        <DonutChart
                          data={garmentAnalysis}
                          category="count"
                          index="name"
                          colors={[
                            "blue-500",
                            "cyan",
                            "indigo",
                            "violet",
                            "fuchsia",
                          ]}
                          className="w-40"
                        />
                        <Legend
                          categories={garmentAnalysis.map((item) => item.name)}
                          colors={[
                            "blue",
                            "cyan",
                            "indigo",
                            "violet",
                            "fuchsia",
                          ]}
                          className="max-w-xs"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default UserProfile;
