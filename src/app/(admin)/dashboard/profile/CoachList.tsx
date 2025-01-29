"use client";
import { Pencil, Trash } from "lucide-react";

interface Coach {
  id: string;
  name: string;
  title: string;
  image: string;
}

interface CoachListProps {
  coaches: Coach[];
  onEdit: (coach: Coach) => void;
  onDelete: (id: string) => void;
}

export default function CoachList({ coaches, onEdit, onDelete }: CoachListProps) {
  return (
    <div className="mt-4 flex flex-nowrap overflow-auto scrollbar-hide">
      {coaches.map((coach) => (
        <div key={coach.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <img src={coach.image} className="w-32 h-32 object-cover rounded-full mb-3" />
          <h3 className="text-lg font-semibold">{coach.name}</h3>
          <p className="text-gray-600">{coach.title}</p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onEdit(coach)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
            >
              <Pencil size={16} /> Edit
            </button>
            <button
              onClick={() => onDelete(coach.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
            >
              <Trash size={16} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
