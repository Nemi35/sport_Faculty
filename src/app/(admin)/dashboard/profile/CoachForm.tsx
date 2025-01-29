"use client";
import { useState } from "react";
import Image from "next/image";
import upload from '@/assets/upload.png'
import { Input } from "postcss";

interface CoachFormProps {
  initialData?: { id?: string; name: string; title: string; image: string };
  onSubmit: (coach: {
    id?: string;
    name: string;
    title: string;
    image: string;
  }) => void;
}

export default function CoachForm({ initialData, onSubmit }: CoachFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [preview, setPreview] = useState(initialData?.image || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImage(URL.createObjectURL(file)); // Store uploaded image URL
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: initialData?.id, name, title, image });
  };

  return (
    <form onSubmit={handleSubmit} className=" flex justify-between gap-2">
      <div className="flex flex-col items-center border-2 border-dashed border-gray-500 rounded-lg p-4 w-[40%] h-60 gap-3 relative hover:border-sky-400">
        {preview && (
          <div>
            <img
            src={preview}
            className="w-32 h-32 object-cover rounded-full mb-2 absolute top-14 left-24"
          />
          <span className="text-gray-500">{!name ? "Coach Name" : name}</span>
          </div>
        )}
        {!preview && (
          <div className="flex flex-col items-center mt-10 justify-center my-auto gap-5 h-full absolute bottom-0">
            <span className="h-9 w-9 rounded-full">
              <Image
                width={50}
                height={50}
                src={upload}
                style={{
                  width: "20",
                  height: "20",
                }}
                alt="User"
              />
            </span>
            <p className="text-center">Upload the <span className="font-semibold">Coach image</span></p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="text-sm cursor-pointer opacity-0 w-full h-full"
        />
      </div>

      <div className="border rounded-lg border-gray-300 p-4 w-[60%]">
        <input
          type="text"
          placeholder="Coach Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-6 outline-none"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-6 outline-none"
        />

        <button
          type="submit"
          className="w-32 bg-sky-400 text-white py-2 rounded"
        >
          {initialData ? "Update Coach" : "Add Coach"}
        </button>
      </div>
    </form>
  );
}
