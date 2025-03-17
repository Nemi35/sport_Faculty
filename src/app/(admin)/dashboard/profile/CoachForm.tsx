"use client";
import { useState } from "react";
import Image from "next/image";
import upload from "@/assets/upload.png";


export default function CoachForm({ initialData, onSubmit }) {
  const [name, setName] = useState(initialData?.name || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [image, setImage] = useState<File | string>(initialData?.image || "");
  const [preview, setPreview] = useState<string>(initialData?.image || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: initialData?.id, name, title, image });
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-between gap-2">
      <div className="flex flex-col items-center border-2 border-dashed border-gray-500 rounded-lg p-4 w-[35%] h-60 gap-3 relative hover:border-sky-400">
        {!preview ? "" : name}
        {preview ? (
          <Image
            width={100}
            height={100}
            src={preview}
            className="w-32 h-32 object-cover rounded-full mb-2"
            alt={""}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 pt-10">
            <Image
              src={upload}
              width={50}
              height={50}
              alt="Upload Icon"
              layout="intrinsic"
              priority
              quality={80}
            />
            <p className="text-center">
              Upload <span className="font-semibold">Coach Image</span>
            </p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="border rounded-lg border-gray-300 p-4 w-[65%]">
        <input
          type="text"
          placeholder="Coach Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-6 outline-none"
        />
        {/* <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-6 outline-none"
        /> */}
        <textarea
          name=""
          id=""
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4 outline-none resize-none"
        ></textarea>
        <button
          type="submit"
          className="w-32 bg-sky-400 text-white py-2 rounded"
        >
          Add Coach
        </button>
      </div>
    </form>
  );
}
