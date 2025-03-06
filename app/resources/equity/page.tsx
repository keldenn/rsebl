"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EquityPage() {
  const [tabs, setTabs] = useState([]);
  const [tabData, setTabData] = useState({});

  useEffect(() => {
    // Fetch all data concurrently
    Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fetch-book-lists/1`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fetch-chapters/21`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fetch-chapters/20`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fetch-chapters/22`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fetch-chapters/23`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fetch-chapters/28`),
    ])
      .then(([tabsRes, corRes, ipoRes, priRes, secRes, stockRes]) => {
        setTabs(tabsRes.data);

        // Store data with matching tab titles
        setTabData({
          [tabsRes.data[0]?.title]: corRes.data,
          [tabsRes.data[1]?.title]: ipoRes.data,
          [tabsRes.data[2]?.title]: priRes.data,
          [tabsRes.data[3]?.title]: secRes.data,
          [tabsRes.data[4]?.title]: stockRes.data,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="w-full p-4 max-w-full mx-auto space-y-4">
      {tabs.length > 0 && (
        <Tabs defaultValue={tabs[0]?.title} className="space-y-4">
          {/* Scrollable Tabs Container */}
          <div className="w-full overflow-x-auto scroll-smooth flex space-x-2 px-2">
            <TabsList className="flex space-x-2">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.title}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.title}>
              {tabData[tab.title]?.map((item) => (
                <Card key={item.id} className="mb-5">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
