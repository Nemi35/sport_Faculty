"use client";
import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";

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

export default function CoachList({
  coaches,
  onEdit,
  onDelete,
}: CoachListProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a fetch delay (remove this if using real API fetch)
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <div className="overflow-auto">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="animate-spin border-4 border-gray-300 border-t-blue-500 rounded-full w-10 h-10"></span>
          <p className="ml-3 text-gray-600">Fetching data...</p>
        </div>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Title</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach) => (
              <tr key={coach.id} className="border-b">
                <td className="p-3">
                  <img
                    src={coach.image}
                    className="w-20 h-20 object-cover rounded-full"
                    alt={coach.name}
                  />
                </td>
                <td className="p-3 text-lg font-semibold">{coach.name}</td>
                <td className="p-3 text-gray-600">{coach.title}</td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      toast.success("Implementation is under process...", {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                        closeButton: false,
                        style: {
                          width: "300px",
                          fontSize: "18px",
                          padding: "0 12px",
                          borderRadius: "6px",
                          height: "20px",
                          boxShadow: "0px 0px 10px 3px #9b9b9b",
                        },
                      });
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      toast.success("Implementation is under process...", {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                        closeButton: false,
                        style: {
                          width: "300px",
                          fontSize: "18px",
                          padding: "0 12px",
                          borderRadius: "6px",
                          height: "20px",
                          boxShadow: "0px 0px 10px 3px #9b9b9b",
                        },
                      });
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <Trash size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
