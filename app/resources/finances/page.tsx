"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FinancePage() {

    const [chapters, setChapters] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the chapters for the "Bonds" tab
        const fetchChapters = async () => {
            try {
                const response = await axios.get(
                    "https://rsebl.org.bt/agm/api/fetch-chapters/12"
                );
                setChapters(response.data); // Store the chapters in state
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch chapters.");
                setLoading(false);
            }
        };

        fetchChapters();
    }, []);
    return (
        <div className="w-full p-4 max-w-full mx-auto space-y-4">
            {chapters.map((chapter) => (
                <Card key={chapter.id} className="mb-5">
                    <CardHeader>
                        <CardTitle>{chapter.title}</CardTitle>
                    </CardHeader>
                    <CardContent
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: chapter.content }}
                    />
                </Card>
            ))}
        </div>
    );
}
