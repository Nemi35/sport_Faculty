"use client";
import { useState } from "react";
import CoachForm from "./CoachForm";
import CoachList from "./CoachList";

export default function CoachAdmin() {
  const [coaches, setCoaches] = useState([
    { id: "1", name: "John Doe", title: "Head Coach", image: "/default.jpg" },
    { id: "2", name: "Jane Smith", title: "Assistant Coach", image: "/default.jpg" },
    { id: "3", name: "Jane Smith", title: "Assistant Coach", image: "/default.jpg" },
    { id: "4", name: "Jane Smith", title: "Assistant Coach", image: "/default.jpg" },
    { id: "5", name: "Jane Smith", title: "Assistant Coach", image: "/default.jpg" },
    { id: "6", name: "Jane Smith", title: "Assistant Coach", image: "/default.jpg" }
  ]);
  const [editingCoach, setEditingCoach] = useState<{ id?: string; name: string; title: string; image: string } | null>(null);

  const handleAddOrUpdateCoach = (coach: { id?: string; name: string; title: string; image: string }) => {
    if (coach.id) {
      // Edit existing coach
      setCoaches((prev) => prev.map((c) => (c.id === coach.id ? coach : c)));
    } else {
      // Add new coach
      setCoaches((prev) => [...prev, { ...coach, id: uuidv4() }]);
    }
    setEditingCoach(null);
  };

  const handleEdit = (coach: { id: string; name: string; title: string; image: string }) => {
    setEditingCoach(coach);
  };

  const handleDelete = (id: string) => {
    setCoaches((prev) => prev.filter((coach) => coach.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h2 className="text-2xl font-bold mb-4">Manage Coaches</h2>

      {/* Form */}
      <CoachForm initialData={editingCoach} onSubmit={handleAddOrUpdateCoach} />

      {/* List of Coaches */}
      <CoachList coaches={coaches} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
