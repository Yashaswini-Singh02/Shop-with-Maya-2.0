import { User } from "./users.schema";
import bcrypt from "bcrypt";

export class UsersService {
  async createUser(email: string, password: string) {
    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);
    const user = new User({ email, password: hashed_password });
    return user.save();
  }

  async loginUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error("User does not exist");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }
    return user;
  }

  async findUserByEmail(email: string) {
    return User.findOne({ email }).populate("liked_outfits");
  }

  async updateUserByEmail(email: string, update: any) {
    return User.findOneAndUpdate({ email }, update, { new: true });
  }

  async deleteUserByEmail(email: string) {
    return User.findOneAndDelete({ email });
  }

  async addOutfitToUser(email: string, outfitId: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exist");
    }

    return User.findOneAndUpdate(
      { email },
      { $push: { liked_outfits: outfitId } },
      { new: true }
    );
  }

  async removeOutfitFromUser(email: string, outfitId: string) {
    return User.findOneAndUpdate(
      { email },
      { $pull: { liked_outfits: outfitId } },
      { new: true }
    );
  }
}
