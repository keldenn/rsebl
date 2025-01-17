"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FinancePage() {
  return (
    <div className="w-full p-4 max-w-full mx-auto space-y-4">
     <Card className="mb-5">
    <CardHeader>
        <CardTitle>Introduction</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Index can be defined as a method to track the performance of a group of assets in a standardized way. It is often used as benchmarks to evaluate an investment's performance against.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Calculation Methodology</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            The Index is a composite market capitalization-weighted price index which compares the current market value (CMV) of all listed common stocks with its market value on the base date of Jan 4, 2011, which was when the Index was established. The Exchange Index was set at 1000 points on the Base date as Base Index.
        </p>
        <p>
            The index is calculated based on all common stocks traded on the Exchange. Any stock subject to a trading halt is included at the last price before such a halt.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Base Adjustment Methodology</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            In the event of any increase or decrease in the current market value due to fluctuations in the stock market such as public offering or changes in the number of component stocks, the Exchange will make necessary adjustments to the Divisor in order to eliminate all effects other than price movements from the index.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Events Triggering Changes in the BSI</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>The BSI will change whenever there are changes in the following:</p>
        <ul className="list-disc ml-6">
            <li>Change in the market price of the listed company</li>
            <li>New listing in the exchange</li>
            <li>Delisting of a company</li>
            <li>Increase in the share capital by Bonus issue or Rights issue</li>
            <li>Cash dividend issue</li>
        </ul>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Why are Indexes Useful?</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Indexes are useful for providing valid benchmarks against which to measure investment performance for a given strategy or portfolio. By understanding how a strategy does relative to a benchmark, one can understand its true performance.
        </p>
        <p>
            Indexes also provide investors with a simplified snapshot of a large market sector, without having to examine every single asset in that index.
        </p>
    </CardContent>
</Card>

    </div>
);
}
