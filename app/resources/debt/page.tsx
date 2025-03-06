"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function FinancialTabsPage() {

  const [tabs, setTabs] = useState([]);

  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cpapers, setCpapers] = useState([]);
  const [subdebt, setSubDebt] = useState([]);

  useEffect(() => {
    // Fetch the chapters for the "Bonds" tab
    const fetchChapters = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/fetch-chapters/24`
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

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/fetch-chapters/25`)
      .then((response) => {
        setCpapers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load papers.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/fetch-book-lists/12`)
      .then((response) => {
        setTabs(response.data); // Store API response in state
      })
      .catch((error) => {
        console.error("Error fetching tabs:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/fetch-chapters/27`)
      .then((response) => {
        setSubDebt(response.data); // Store API response in state
      })
      .catch((error) => {
        console.error("Error fetching tabs:", error);
      });
  }, []);

  return (
    <div className="w-full p-4 max-w-full mx-auto space-y-4">
      <Tabs defaultValue="Bonds" className="space-y-4">
        <div className="w-full overflow-x-auto scroll-smooth flex space-x-2 px-2">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.title}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {chapters.map((chapter) => (
          <TabsContent value="Bonds">
            <Card key={chapter.id} className="mb-5">
              <CardHeader>
                <CardTitle>{chapter.title}</CardTitle>
              </CardHeader>
              <CardContent
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: chapter.content }}
              />
            </Card>
          </TabsContent>
        ))}

        {cpapers.map((cpaper) => (
          <TabsContent value="Commercial papers">
            <Card className="mb-5">
              <CardHeader>
                <CardTitle>{cpaper.title}</CardTitle>
              </CardHeader>
              <CardContent
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: cpaper.content }}
              />
            </Card>
          </TabsContent>
        ))}

        {subdebt.map((sdebt) => (
          <TabsContent value="Subordinated Debt">
            <Card >
              <CardHeader>
                <CardTitle>{sdebt.title}</CardTitle>
              </CardHeader>
              <CardContent
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: sdebt.content }}
              />
            </Card>
          </TabsContent>
        ))}

      </Tabs>
    </div>
  );
}