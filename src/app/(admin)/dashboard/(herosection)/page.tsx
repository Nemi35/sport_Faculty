"use client";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { XCircle } from "lucide-react";

export default function DefaultLayout() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch images from S3 on initial load
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
      // Upload multiple files in parallel
      const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        // Add file size validation (example: 5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(
            `File ${file.name} is too large. Maximum size is 5MB`
          );
        }

        try {
          const response = await axios.post("/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            // Add upload progress tracking
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total ?? 0)
              );
              console.log(`Upload progress: ${percentCompleted}%`);
              // You could add a progress state if you want to show it in the UI
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

      // Wait for all uploads to complete
      const uploadedUrls = await Promise.all(uploadPromises);

      setUploadedImages((prevImages) => [...prevImages, ...uploadedUrls]);

      // Optional: Show success message
      // toast.success('Files uploaded successfully');
    } catch (error) {
      console.error("Upload failed:", error);
      // Optional: Show error message to user
      // toast.error(error instanceof Error ? error.message : 'Upload failed');
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
