import { Client, handle_file, FileData } from "@gradio/client";

const convertBase64ToBlob = (base64String: string) => {
  const byteString = Buffer.from(base64String.split(",")[1], "base64");
  const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
  const blob = new Blob([byteString], { type: mimeString });
  return blob;
};

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    const userImage = convertBase64ToBlob(data.userImage);
    const garmentImage = await (await fetch(data.garmentImage)).blob();

    const app = await Client.connect("alf0nso/IDM-VTON-demo2", {
      status_callback: (msg) => {
        console.log(msg);
      },
    });

    const result = await app.predict("/tryon", [
      userImage, // blob in 'User' Image component
      garmentImage, // blob in 'Garment' Image component
      "Hello!!", // string  in 'parameter_16' Textbox component
      true, // boolean  in 'Yes' Checkbox component
      true, // boolean  in 'Yes' Checkbox component
      30, // number  in 'Denoising Steps' Number component
      42, // number  in 'Seed' Number component
      data.garment_zone, // string  in 'Interpolation' Dropdown component
    ]);

    console.log(result.data);
    // @ts-ignore
    return Response.json({ image: result.data[0].url });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error });
  }
}
