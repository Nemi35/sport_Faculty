"use client";
import { useState, useEffect } from "react";
import CoachForm from "./CoachForm";
import CoachList from "./CoachList";

interface Coach {
  id: string;
  name: string;
  title: string;
  image: string;
}

export default function CoachAdmin() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);

  // Fetch coaches from API
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) throw new Error("Failed to fetch coaches");
        const data = await response.json();
        setCoaches(data);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };
    fetchCoaches();
  }, []);

  const handleAddOrUpdateCoach = async (coach: {
    id?: string;
    name: string;
    title: string;
    image: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append("name", coach.name);
      formData.append("title", coach.title);

      if (typeof coach.image === "string") {
        formData.append("image", coach.image);
      } else {
        formData.append("image", coach.image as Blob);
      }

      const response = await fetch("/api/profile", {
        method: coach.id ? "PUT" : "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save coach");

      const updatedCoach = await response.json();
      if (coach.id) {
        setCoaches((prev) =>
          prev.map((c) => (c.id === updatedCoach.id ? updatedCoach : c))
        );
      } else {
        setCoaches((prev) => [...prev, updatedCoach]);
      }
      setEditingCoach(null);
    } catch (error) {
      console.error("Error saving coach:", error);
    }
  };

  const handleEdit = (coach: Coach) => {
    setEditingCoach(coach);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/profile/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete coach");
      setCoaches((prev) => prev.filter((coach) => coach.id !== id));
    } catch (error) {
      console.error("Error deleting coach:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Coaches</h2>

      {/* Form */}
      <CoachForm initialData={editingCoach} onSubmit={handleAddOrUpdateCoach} />

      {/* List of Coaches */}
      <CoachList
        coaches={coaches}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
