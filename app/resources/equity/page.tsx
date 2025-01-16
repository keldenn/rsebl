"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EquityPage() {
  return (
    <div className="w-full p-4 max-w-full mx-auto space-y-4">
      <Tabs defaultValue="CorporateAction" className="space-y-4">
        <TabsList>
          <TabsTrigger value="CorporateAction">Corporate Action</TabsTrigger>
          <TabsTrigger value="IPOListing">IPO & Listing</TabsTrigger>
          <TabsTrigger value="PrimaryMarket">Primary Market</TabsTrigger>
          <TabsTrigger value="SecondaryMarket">Secondary Market and Trading</TabsTrigger>
          <TabsTrigger value="StockFundamentals">Stock Fundamentals</TabsTrigger>
        </TabsList>

        <TabsContent value="CorporateAction">
        <Card className="mb-5">
    <CardHeader>
      <CardTitle>Introduction</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        A corporate action is an event initiated by a public company that brings or could bring an actual change to the securities—equity or debt—issued by the company.
      </p>
      <p>It can be broadly classified into:</p>
      <ul className="list-disc list-inside">
        <li>Mandatory corporate action</li>
        <li>Voluntary corporate action</li>
      </ul>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Mandatory Corporate Action</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        Mandatory corporate actions are those actions that affect all of the company's shareholders. It is performed by the governing body of the company. Shareholders need to do nothing aside from collecting the cash dividend on their shares.
      </p>
      <p>Following are the examples of mandatory corporate action:</p>
      <ul className="list-disc list-inside">
        <li>Bonus Issue</li>
        <li>Buy Back</li>
        <li>Dividend</li>
      </ul>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Bonus Issue</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        When a company’s free reserves are high, it may choose to capitalize part of it by issuing bonus shares to existing shareholders in proportion to their holdings, converting the reserves into equity. 
      </p>
      <p>
        Bonus shares are issued free of cost, but since the number of shareholders remain the same and their proportionate holdings do not change, the price of the company’s shares drops, more or less in proportion to the issue. 
      </p>
      <p>
        <strong>Adjusted price after bonus:</strong> [Market Price / (1 + Bonus Issue %)]
      </p>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Buy Back</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        Repurchase of convertible or non-convertible debentures or the non-convertible part of partly convertible debentures before the stipulated period, at par or at a discount, by companies or banks.
      </p>
      <p><strong>Benefits of buyback:</strong></p>
      <ul className="list-disc list-inside">
        <li>The earnings per share (EPS) increases due to a reduction in outstanding shares.</li>
        <li>The share price tends to increase due to reduced supply, subject to market behavior.</li>
      </ul>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Dividend</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        Payment made to shareholders, usually once or twice a year out of a company’s profit after tax. Dividend payments do not distribute the entire net profit of a company; a part or substantial part is held back as a reserve for the company's expansion.
      </p>
      <p><strong>Important dividend dates:</strong></p>
      <ol className="list-decimal list-inside">
        <li><strong>Declaration date:</strong> The date on which the board of directors announces and approves the payment of a dividend.</li>
        <li><strong>Ex-dividend date:</strong> The first day that a stock trades without a dividend.</li>
        <li><strong>Record date:</strong> The date on which the investor must be on the company’s books to receive a dividend.</li>
        <li><strong>Payment date:</strong> The date on which the dividend is paid to shareholders.</li>
      </ol>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Voluntary Corporate Action</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        Voluntary corporate actions are those actions where shareholders are given the choice to either participate or refrain from participating.
      </p>
      <p>Example of voluntary corporate action:</p>
      <ul className="list-disc list-inside">
        <li>Rights Issue</li>
      </ul>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Rights Issue</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        Whenever an existing company makes a fresh issue of equity capital or debentures, the existing shareholders or convertible debenture holders have the first right to subscribe to the issue in proportion to their existing holdings.
      </p>
      <p>
        <strong>Adjusted price after rights:</strong> [Market Price + Issue Price * Right Issue (%) / (1 + Right Issue (%))]
      </p>
    </CardContent>
  </Card>
        </TabsContent>

        <TabsContent value="IPOListing">
        
  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Introduction</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        IPO represents the Initial Public Offering of shares by a company in the
        Primary Market to raise funds/capital from the institutional
        players/investors. The IPO can be through Book Building Route or fixed
        price route.
      </p>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Prospectus</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        A formal public offer to sell ordinary shares, preference shares or
        debentures, highlighting the details investors need to know to make an
        investment decision. A prospectus will have the following heads of
        information: business of company; promoters and business collaboration;
        management; the board of directors; cost of the project and the means
        of finance, status of the project; business prospects and
        profitability; the size of the issue; listing, tax benefits if any; and
        the names of the underwriters and managers to the issue.
      </p>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Allotment of Shares</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        After a company has issued prospectus and application forms of shares,
        it receives applications from the investing public for varying numbers
        of shares. If the total number of shares applied for equals, or is less
        than the number offered, full allotment is made. If, however, more
        shares are applied for than were offered, a basis of allotment is
        finalized in consultation with the stock exchange where the company is
        primarily listed.
      </p>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Fixed Price Offering vs Book Building</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        <strong>Fixed price offering</strong>
      </p>
      <p>
        Under fixed price offering, the company going public determines a fixed
        price at which its shares are offered to the investors. The price is
        known/disclosed to the public before the company goes public. To partake
        in this IPO, the investor must pay the full share price when making the
        application.
      </p>
      <p>
        <strong>Book Building offering</strong>
      </p>
      <p>
        Under book building, the company going public offers a 20% price band
        on shares to investors. Investors then bid on the shares before the
        final price is settled once the bidding has closed. Investors must
        specify the number of shares they want to buy and how much they are
        willing to pay. Unlike a fixed price offering, there is no fixed price
        per share. The lowest share price is known as the floor price, while
        the highest share price is known as the cap price. The final share price
        is determined using investor bids.
      </p>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Flipping</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        Flipping means buying security or an asset to sell after holding it for
        only a short period. The main aim of the activity is to enjoy quick
        short-term gains and not wait for the asset to appreciate further in the
        future.
      </p>
    </CardContent>
  </Card>
        </TabsContent>


        <TabsContent value="PrimaryMarket">
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
            <p>
            Primary market is where securities are created so they can be sold to investors for the first time. Securities issued through a primary market can include stocks, corporate bonds, goverment bonds, notes and t-bills.

In a typical primary market transaction, there are three players. First, there’s the company issuing the new securities. Secondly, there are investors who purchase them. Finally, there’s bank or underwriting firm that oversees and facilitates the offering. The bank or underwriting firm determines the accurate value and sale price of the new security.
            </p>
           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>How Primary Market Securities are Sold</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
            <p>
            Once a company or government issues a security and the underwriting team determines its value, it can be sold. There are four ways investors can buy securities through the primary market:
            </p>
            <ul className="list-disc list-inside">
                <li>Initial public offerring</li>
                <li>Rights Issue</li>
                <li>Private placement</li>
                <li>Preferential allotment</li>
            </ul>
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Capital Structure & Financial Structure</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
            <strong>What do you mean by Capital Structure & Financial Structure?</strong>
            <p>
            Capital Structure of a company includes only long-term debt and equity while the financial structure of a company is the liability side of a company’s balance sheet, which includes all the items, which finance the assets namely current liabilities, long-term liabilities, and shareholders’ equity.
            </p>
           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Capital</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
            <p>
            The money used by a company to run its business is known as capital, obtained in two ways: by issuing shares, and by borrowing. The maximum amount of capital that a company is allowed to raise is its authorized capital stated in the memorandum and articles of association of the company, out of which the maximum it can raise by selling shares is its share capital. The company may choose to sell its issued capital, all or part of which may be subscribed by shareholders. It then becomes subscribed capital, which is also called paid-up capital.
            </p>
           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Issued, Called-up & Paid up capital</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
            <strong>What do you mean by Issued capital?</strong>
            <p>
            The amount of authorized capital issued by a company. A part of the authorized capital may be withheld for subsequent issue, at par or at a premium.</p>
            <strong>What do you mean by Called-up-Capital?</strong>
            <p>
            When shares are issued by a company, it may not require the shareholders to pay the full value of the shares, but reserve a certain portion for the future needs which may be called up later. Called-up capital is that portion of the shares’ full value, which the company has collected. </p>
            <strong>What do you mean by Paid up Capital?</strong>
            <p>
            Capital acquired by selling shares to investors, as distinguished from capital accumulated from earnings or from secured or unsecured loans.</p>
           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Amortization</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
            <p>
            Writing of the assets of a company over a number of years, not necessarily depending on the life of the assets, for the purpose of the replacement or renewal is termed as amortization. It is different from depreciation, which is a periodic writing off of the value of the asset based on its normal life expectancy. Amortization is usually accompanied by putting aside money in a SINKING FUND, so that the considerably increased cost of replacement or modernization can be met, when it is needed.</p>
           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Asset Stripping</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
            <p>
            Selling of the assets of the company for quick profit, rather than running the company for steady gain. The asset stripper is usually left with a shell company, which he keeps for life, not for regular business, but for other, usually dishonest purposes, such as tax evasion.
            </p>
           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Book Closure</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
            <p>
            Before a company declares dividend or issues bonus or right shares, it closes its register of members for a certain period, from one week to a month, during which no transfer of shares is registered. Only those shareholders whose names appear on the register of the book closure are eligible to receive dividends and bonus shares and entitlement to right share. After the book closure shares are quoted ex-dividend, ex-bonus (if bonus has been announced) or ex-rights (if announced) prices, which carry xd, xb and xr after figures.

Dates of book closure are announced in financial newspapers and journals. When buying shares, it is prudent to ask the broker what the book closure dates are. Delay in lodging share transfers forms with the company may sometimes result in the loss or dividends, right, or bonuses.</p>
           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Depreciation
            </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
            <p>
            The loss of value over time of a tangible asset from you or obsolescence that accountants deduct from the book value of the asset, whether or not the asset actually depreciates. Depreciation accounting does not necessarily provide for additional cost of replacement or renewal. In straight-line depreciation the asset’s notional life divides the asset value equal parts i.e., for a 10-year life the annual depreciation is 10%.

In accelerated depreciation larger amounts are written off in the earlier years of the asset’s life, to enable the company to qualify for large tax deductions at the initial stage, and invest in expansion and growth. The net block or the net fixed assets of a company is GROSS BLOCK less depreciation. The diminishing balance method of charging depreciation applies a fixed percentage of depreciation to the written down value, the percentage depending on the life expectancy of the asset.</p>
           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Liquidity
            </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
            <p>
            It is the state of having cash, or possessing assets which can be quickly converted into cash. However, at throwaway prices almost any asset can be turned into cash. To be properly liquid, to have high liquidity, an asset must be convertible into cash at its fair market price.

</p>
           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Net Asset Value
            </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
            <p>
            It is calculated by dividing the total market price of all the shares held by a mutual fund, less any liabilities, by the total number of shares, on a particular date. With every change in the share prices the NAV of mutual funds shares changes. The net asset value of a mutual fund share indicates h
</p>           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Working Capital
            </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
            <p>
            In accounting terms, it is the difference between CURRENT ASSETS and CURRENT LIABILITIES. Sometimes called circulating capital, as current assets and current liabilities are continually turned over in the course of a business year. Working capital reflects the liquidity position of a company
            </p>           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Amalgamation
            </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
                <strong>What do you mean by Amalgamation?</strong>
            <p>
            When two or more separate companies join together to form one company so that their pooled resources generate greater common prosperity that if they remain separate, there is an amalgamation.
</p>           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Acquisition
            </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
                <strong>What do you mean by Acquisition?</strong>
            <p>
            Big fish eating little fish; one company takes over controlling interest in another company. Since high prices are often paid to acquire shares of the Target Company, clever investors often make a tidy profit by exploiting the situation.
            </p>           
            </CardContent>
        </Card>
        <Card className="mb-5">
            <CardHeader>
            <CardTitle>Accumulated Depreciation
            </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
                <strong>What do you mean by Accumulated Depreciation?</strong>
            <p>
            Depreciation up to date, not just one particular year's is referred to as accumulated depreciation.

</p>           
            </CardContent>
        </Card>
        </TabsContent>

        <TabsContent value="SecondaryMarket">
          <Card>
            <CardContent className="text-sm">
              <p>Content for Secondary Market and Trading will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="StockFundamentals">
          <Card>
            <CardContent className="text-sm">
              <p>Content for Stock Fundamentals will go here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
