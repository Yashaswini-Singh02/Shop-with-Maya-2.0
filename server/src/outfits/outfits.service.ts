import { Outfit } from "./outfits.schema";

export class OutfitsService {
  async createOutfit(title: string, image: string, garment_zone: string) {
    const outfit = new Outfit({ title, image, garment_zone });
    return outfit.save();
  }

  async getAllOutfits() {
    return Outfit.find();
  }

  async findOutfitById(id: string) {
    return Outfit.findById(id);
  }

  async deleteOutfitById(id: string) {
    return Outfit.findByIdAndDelete(id);
  }

  async findOutfitByIdAndUpdate(id: string, update: any) {
    return Outfit.findByIdAndUpdate(id, update, { new: true });
  }

  async findOutfitByIdAndAddUser(id: string, userId: string) {
    return Outfit.findByIdAndUpdate(
      id,
      { $push: { liked_by: userId } },
      { new: true }
    );
  }

  async findOutfitByIdAndRemoveUser(id: string, userId: string) {
    return Outfit.findByIdAndUpdate(
      id,
      { $pull: { liked_by: userId } },
      { new: true }
    );
  }
}
