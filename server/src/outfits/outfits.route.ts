import { OutfitsService } from "./outfits.service";
import { Router } from "express";

const outfitsRouter = Router();

const outfitsService = new OutfitsService();

outfitsRouter.post("/", async (req, res) => {
  const { title, image, garment_zone } = req.body;
  const outfit = await outfitsService.createOutfit(title, image, garment_zone);
  res.json(outfit);
});

outfitsRouter.get("/", async (req, res) => {
  const outfits = await outfitsService.getAllOutfits();
  res.json(outfits);
});

outfitsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const outfit = await outfitsService.findOutfitById(id);
  res.json(outfit);
});

outfitsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const outfit = await outfitsService.findOutfitByIdAndUpdate(id, update);
  res.json(outfit);
});

outfitsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const outfit = await outfitsService.deleteOutfitById(id);
  res.json(outfit);
});

outfitsRouter.put("/:id/liked_by/:userId", async (req, res) => {
  const { id, userId } = req.params;
  const outfit = await outfitsService.findOutfitByIdAndAddUser(id, userId);
  res.json(outfit);
});

outfitsRouter.delete("/:id/liked_by/:userId", async (req, res) => {
  const { id, userId } = req.params;
  const outfit = await outfitsService.findOutfitByIdAndRemoveUser(id, userId);
  res.json(outfit);
});

export { outfitsRouter };
