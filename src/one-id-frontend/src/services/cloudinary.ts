import { Cloudinary } from "@cloudinary/url-gen";

export class CloudinaryService {
  private static instance: CloudinaryService;
  private cloudinary: Cloudinary;

  private constructor() {
    this.cloudinary = new Cloudinary({
      cloud: {
        cloudName: "dbuaprzc0",
      },
    });
  }

  public static getInstance = (): CloudinaryService => {
    if (!CloudinaryService.instance) {
      CloudinaryService.instance = new CloudinaryService();
    }
    return CloudinaryService.instance;
  };

  public uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dbuaprzc0/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url;
  };
}
