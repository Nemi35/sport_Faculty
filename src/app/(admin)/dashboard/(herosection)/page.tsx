"use client";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { XCircle } from "lucide-react";
import Image from "next/image";
import upload from "@/assets/upload.png";

export default function DefaultLayout() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/images");
        setUploadedImages(response.data);
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };
    fetchImages();
  }, []);

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        if (file.size > 5 * 1024 * 1024) {
          throw new Error(
            `File ${file.name} is too large. Maximum size is 5MB`
          );
        }
        try {
          const response = await axios.post("/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total ?? 0)
              );
              console.log(`Upload progress: ${percentCompleted}%`);
            },
          });
          return response.data.url;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(
              `Failed to upload ${file.name}: ${
                error.response?.data?.error || error.message
              }`
            );
          }
          throw error;
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setUploadedImages((prevImages) => [...prevImages, ...uploadedUrls]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".webp"] },
  });

  return (
    <>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <h2 className="text-4xl font-bold mb-4">Manage Hero Section</h2>
        <div className=" mx-auto p-6 border rounded-lg bg-white shadow-md">
          <div
            {...getRootProps()}
            className="flex flex-col justify-center items-center gap-3 border-dashed border-2 border-gray-300 p-6 cursor-pointer text-center rounded-lg hover:border-blue-500 transition duration-200 py-32 mx-4"
          >
            <span>
              <Image
                src={upload}
                width={50}
                height={50}
                alt="Upload Icon"
                layout="intrinsic"
                priority
                quality={80}
              />
            </span>
            <input {...getInputProps()} />
            <p className="text-gray-600 ">
              Drag & drop images here, or{" "}
              <span className="text-blue-500 font-semibold">
                click to select
              </span>
            </p>
          </div>
          <div className="mt-4 grid grid-cols-5 gap-3">
            {uploadedImages.map((url, index) => (
              <div key={index} className="relative group w-56 h-56 border p-2">
                <img
                  src={url}
                  className="object-cover rounded-md shadow-sm w-full h-full"
                  alt="Uploaded Preview"
                />
                {/* Remove button */}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-5 right-5 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition duration-200"
                >
                  <XCircle size={18} />
                </button>
              </div>
            ))}
            {loading && (
              <div className="w-full h-24 bg-gray-200 animate-pulse rounded-md"></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
