import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import formidable from "formidable";
import fs from "fs";
import { prisma } from "@/app/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Error parsing file" });
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!file || !(file as formidable.File).filepath) {
        return res.status(400).json({ error: "Invalid file uploaded" });
      }
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // In a real app, upload to cloud storage (S3, Cloudinary, etc.)
      // Here we'll just move to the public folder for demonstration
      const fileName = `avatars/${session.user.id}-${Date.now()}.${file.originalFilename?.split('.').pop()}`;
      const filePath = `./public/${fileName}`;
      
      fs.renameSync(file.filepath, filePath);

      // Update user in database
      await prisma.user.update({
        where: { id: session.user.id },
        data: { image: `/${fileName}` },
      });

      return res.status(200).json({ url: `/${fileName}` });
    });
  } catch (error) {
    console.error("Avatar upload error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}