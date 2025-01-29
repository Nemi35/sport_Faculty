"use client";
import React, { useState, ReactNode } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { XCircle } from "lucide-react";

export default function DefaultLayout() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      const response = await axios.post("/api/upload", formData);
      setUploadedImages([...uploadedImages, response.data.url]);
    } catch (error) {
      console.error("Upload failed", error);
    }
    setLoading(false);
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".webp"] },
  });

  return (
    <>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="max-w-lg mx-auto p-6 border rounded-lg bg-white shadow-md">
            {/* Drag & Drop Box */}
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-300 p-6 cursor-pointer text-center rounded-lg hover:border-blue-500 transition duration-200"
            >
              <input {...getInputProps()} />
              <p className="text-gray-600">
                Drag & drop images here, or{" "}
                <span className="text-blue-500 font-semibold">
                  click to select
                </span>
              </p>
            </div>

            {/* Image Preview */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {uploadedImages.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    className="w-full h-24 object-cover rounded-md shadow-sm"
                    alt="Uploaded Preview"
                  />
                  {/* Remove Button */}
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition duration-200"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
              ))}

              {/* Loading Skeleton */}
              {loading && (
                <div className="w-full h-24 bg-gray-200 animate-pulse rounded-md"></div>
              )}
            </div>
          </div>
        </div>
    </>
  );
}
