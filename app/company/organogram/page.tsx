"use client"

import { useEffect, useState } from "react";

export default function FrontendRadioCard() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    // Fetch the staff list from the API
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-staff-lists`);
        const data = await response.json();

        // Filter only active members (status = 1)
        const activeMembers = data.filter((member) => member.status === 1);

        setTeamMembers(activeMembers);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {teamMembers.map((member) => (
        <div
          key={member.id}
          className="max-w-sm p-4 rounded-xl border bg-card text-card-foreground shadow"
        >
          <div className="text-sm font-semibold uppercase text-gray-500 mb-2">
            {member.designation}
          </div>
          <div className="text-xl font-bold mb-4">{member.name}</div>
          <div className="relative h-full w-full rounded-lg overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${member.image_path}`}
              alt={member.name}
              className="w-full h-92 object-fill"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
