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
            Stocks or securities are defined as instruments of ownership of particular assets which are issued publicly, namely the shares and debentures/bonds. It represents the smallest unit of ownership. If a company has issued 2,000,000 shares, and a person owns 2000 of them, he owns 0.001% of the company.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Ordinary Share</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <strong>What is an ordinary share?</strong>
        <p>
            An ordinary share represents the form of fractional ownership in which a shareholder (one who holds the shares), as a fractional owner, undertakes the maximum entrepreneurial risk associated with the business venture.
        </p>
        <p>
            The ordinary share capital is also commonly referred to as equity capital or share capital. A company cannot raise equity capital in excess of the limit authorized in its Memorandum of Association (a document detailing the terms and conditions under which a company is incorporated under the company law) at any time, without undergoing certain legal formalities. This is known as authorized capital.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Preferential Share</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Preference shares, more commonly referred to as preferred stock, are shares of a company’s stock with dividends that are paid out to shareholders before common stock dividends are issued. If the company enters bankruptcy, preferred stockholders are entitled to be paid from company assets before common stockholders.
        </p>
        <strong>What risks are associated with Preference Shares?</strong>
        <p>
            In terms of risk, these are less risky than equities, but more risky than secured debentures, which precede them in the distribution of the company's funds, and in the event of liquidation, which are paid off before preference shares. Preference shares are entitled to a fixed dividend, and cumulative preference shares retain their retrospective claim on dividends when the company is not in a position to declare any dividend. Sometimes these shares are convertible into equity shares after a stated number of years, thus enjoying assured earnings when the company is getting established, and high earnings when it has established itself. When preference shares are redeemable, the company pays off the shareholder on a certain date, or issues equity shares of the value, but when they are irredeemable, the shareholder gets the fixed dividend in perpetuity or as long as the company lasts. The preference shareholders may or may not be given voting rights, they can usually only vote if their dividends are in arrears.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Equity Shareholders</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <strong>What do you mean by Equity Shareholders?</strong>
        <p>
            They are the owners of the company, sharing its risks, profits, and losses. They have residual claim on the earnings and assets of a company. They are paid their share of the company’s profits after all other claims are met, and in the event of the liquidation of the company they share whatever is left of the company after all its creditors have been paid. They enjoy limited liability, i.e., liability only to the extent of their shareholding. Only equity shareholders are entitled to vote at the company's meetings, thus controlling the management. If the company prospers, it is the equity shareholder who is the greater gainer.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Shareholder</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <strong>What do you mean by Shareholder?</strong>
        <p>
            A person or a legal entity that owns an equity or preference share of a company is called a shareholder. The proof of his ownership is the share certificate, which he may hold in multiple numbers, each certificate may comprise of a certain quantity of shares.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Shareholders' Equity</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <strong>What do you mean by Shareholders' Equity?</strong>
        <p>
            It is a term used in a company's financial statement to identify its net worth, which is its residual value after all its liabilities are subtracted from its assets. The net worth comprises the face value of all the shares, equity and preference, plus capital surplus earned by way of issuing shares at a premium, and undistributed, retained earnings after dividends have been paid.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>At Par & Above Par</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <strong>What do you mean by 'At Par'?</strong>
        <p>
            A price equal to the face value of a share, i.e., if the face value of a share is Nu. 10 or Nu. 100 it is being issued or selling at Nu. 10 or Nu. 100 respectively.
        </p>
        <strong>What do you mean by 'Above Par'?</strong>
        <p>
            The par value of a share is its face value. When the share price is above its face value, it is above par.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Capitalization of Reserves</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <strong>What do you mean by Capitalization of Reserves?</strong>
        <p>
            The accumulated undistributed profits of a company, which are put aside as reserves (except capital revaluation reserve and asset revaluation reserve) can be converted into share capital by issuing bonus shares. Capitalization of reserves is done according to certain government guidelines, but remains the discretion of the company.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>What is Financial Ratio?</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            A financial ratio or accounting ratio is a relative magnitude of two selected numerical values taken from an enterprise's financial statement.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Earnings per Share (EPS)</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Earnings per share (EPS) is a measure of the profitability of a company. It indicates how much money a company makes for each share of its stock and is a widely used metric for corporate profits.
        </p>
        <p>
            A higher EPS indicates more value because investors will pay more for a company with higher profits.
        </p>
        <p>
            <strong>Formula:</strong> EPS = (PROFIT - DIVIDEND) / TOTAL OUTSTANDING SHARES
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>PE (Price-Earning) Ratio</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            The price-to-earnings ratio (P/E ratio) is the ratio for valuing a company that measures its current share price relative to its per-share earnings.
        </p>
        <p>
            <strong>Formula:</strong> P/E Ratio = Market Value Per Share / Earnings per Share
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Debt-To-Equity Ratio</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            It is a measure of the degree to which a company is financing its operations through debt versus wholly-owned funds. More specifically, it reflects the ability of shareholder equity to cover all outstanding debts in the event of a business downturn.
        </p>
        <p>
            It is used to evaluate a company’s financial leverage.
        </p>
        <p>
            <strong>Formula:</strong> Debt/Equity = Total Liabilities / Total Shareholder’s Equity
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Working Capital Ratio</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Working capital ratio, also known as net working capital, is the difference between a firm's current assets and current liabilities. It represents a company's ability to pay its current liabilities with its current assets.
        </p>
        <p>
            <strong>Formula:</strong> Working capital = Current Assets – Current Liabilities
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Quick Ratio</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Quick Ratio, also known as acid test, compares a company's most short-term assets to its most short-term liabilities to see if a company has enough cash to pay its immediate liabilities, such as short-term debt.
        </p>
        <p>
            This ratio subtracts inventories from current assets, before dividing that figure into liabilities.
        </p>
        <p>
            The acid-test ratio may not give a reliable picture of a firm's financial condition if the company has accounts receivable that take longer than usual to collect or current liabilities that are due but have no immediate payment needed.
        </p>
        <p>
            <strong>Formula:</strong> Acid Test = (Cash + Marketable Securities + AR) / Current Liabilities
            <br />Where AR = Accounts Receivables
        </p>
    </CardContent>
</Card>

    </div>
);
}
