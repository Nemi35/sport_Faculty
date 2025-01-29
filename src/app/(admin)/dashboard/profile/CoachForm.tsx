"use client";
import { useState } from "react";

interface CoachFormProps {
  initialData?: { id?: string; name: string; title: string; image: string };
  onSubmit: (coach: { id?: string; name: string; title: string; image: string }) => void;
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
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
      <div className="flex flex-col items-center mb-4">
        {preview && <img src={preview} className="w-32 h-32 object-cover rounded-full mb-2" />}
        <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
      </div>
      
      <input
        type="text"
        placeholder="Coach Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
        {initialData ? "Update Coach" : "Add Coach"}
      </button>
    </form>
  );
}
