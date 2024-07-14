import { UsersService } from "./users.service";
import { Router } from "express";

const usersRouter = Router();

const usersService = new UsersService();

usersRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.createUser(email, password);
    const user_data = {
      email: user.email,
      liked_outfits: user.liked_outfits,
    };
    res.json(user_data);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

usersRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.loginUser(email, password);
    const user_data = {
      email: user.email,
      liked_outfits: user.liked_outfits,
    };
    res.json(user_data);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

usersRouter.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await usersService.findUserByEmail(email);
    res.json(user);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

usersRouter.put("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const update = req.body;
    const user = await usersService.updateUserByEmail(email, update);
    res.json(user);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

usersRouter.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await usersService.deleteUserByEmail(email);
    res.json(user);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

usersRouter.put("/:email/liked_outfits/:outfitId", async (req, res) => {
  try {
    const { email, outfitId } = req.params;
    const user = await usersService.addOutfitToUser(email, outfitId);
    res.json(user);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

usersRouter.delete("/:email/liked_outfits/:outfitId", async (req, res) => {
  try {
    const { email, outfitId } = req.params;
    const user = await usersService.removeOutfitFromUser(email, outfitId);
    res.json(user);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

export { usersRouter };
