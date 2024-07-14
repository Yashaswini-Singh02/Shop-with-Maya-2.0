"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";

interface LikedOutfitProps {
  _id: string;
  image: string;
  title: string;
}

interface UserProfileProps {
  email: string;
  liked_outfits: LikedOutfitProps[];
}

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
      }
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };

  return (
    <section className="flex py-10 gap-x-8 px-10 bg-gradient-to-r">
      <span className="absolute w-full h-full transition-all duration-700 bg-orange/40 rounded-full blur-3xl"></span>
      <span className="absolute w-full h-full mt-56 bg-red/40 rounded-full blur-3xl"></span>
      <span className="absolute w-full h-20 ml-72 mb-72 bg-pink/60 rounded-full blur-3xl"></span>

      <div className="relative w-full sm:w-2/3 px-4 py-4 backdrop-filter rounded-xl backdrop-blur-xl bg-white/80">
        <h1 className="py-2 border border-pink rounded-md text-center font-medium bg-white/50 backdrop-filter backdrop-blur-lg">
          USER PROFILE
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="bg-white p-4 rounded-xl">
              <Loader2Icon size={48} className="animate-spin text-blue-500" />
            </div>
          </div>
        ) : (
          userProfile && (
            <div className="flex flex-col items-center py-10 gap-y-8">
              <div className="flex flex-col items-center gap-y-2">
                <h2 className="font-medium tracking-wide border w-max px-10 py-1 border-violet-500 rounded-lg bg-white/50 backdrop-filter backdrop-blur-lg">
                  Email
                </h2>
                <p className="text-lg font-medium">{userProfile.email}</p>
              </div>

              <div className="flex flex-col items-center gap-y-2">
                <h2 className="font-medium tracking-wide border w-max px-10 py-1 border-violet-500 rounded-lg bg-white/50 backdrop-filter backdrop-blur-lg">
                  Liked Outfits
                </h2>
                <div className="grid grid-cols-2 gap-4 py-4 px-8 rounded-xl bg-white/50 backdrop-filter backdrop-blur-lg">
                  {userProfile.liked_outfits.map((outfit) => (
                    <div
                      key={outfit.title}
                      className="cursor-pointer border rounded-lg flex flex-col justify-between overflow-hidden bg-white border-gray-300"
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
                          onClick={() => {
                            handleRemoveLike(outfit._id);
                            setUserProfile({
                              ...userProfile,
                              liked_outfits: userProfile.liked_outfits.filter(
                                (likedOutfit) => likedOutfit._id !== outfit._id
                              ),
                            });
                          }}
                        >
                          Unlike
                        </button>
                      </div>
                    </div>
                  ))}
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
