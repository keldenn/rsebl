"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EquityPage() {
  return (
    <div className="w-full p-4 max-w-full mx-auto space-y-4">
      <Tabs defaultValue="CorporateAction" className="space-y-4">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 ">
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
        <Card className="mb-5">
    <CardHeader>
        <CardTitle>Introduction</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Secondary Market comprises of the buyers and the sellers of shares and debentures subsequent to the original issue. For example, having subscribed to the share or debenture of the company, if one wishes to sell the same, it will be done in the secondary market. Similarly, one can also buy the share or debenture of a company from the secondary market (if the company is listed on the stock exchange) without having to wait for that company to come out with a new public issue.
        </p>
        <p>
            A stock exchange is the single most important institution in the secondary market for securities. It is the place where already issued and outstanding shares are bought and sold. Distinguished from the primary market in which the issuer sells shares directly to the investors.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>What is Broker?</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Broker is a member of the stock exchange who is licensed to buy or sell shares on his own or on his client’s behalf. He charges a commission (brokerage) on the gross value of the deals. Full-service brokers offer best facilities such as safekeeping clients’ shares and bonds, offering investment advice, planning clients’ portfolios of the investment, managing clients’ portfolios and offering when a client is buying on MARGIN.
        </p>
        <p>You can find registered broker here.</p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Retained Earnings</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Retained Earnings is that part of a company’s earnings which is not distributed as dividends, but held back and accumulated for the company’s growth or contingency use. Also, it is called undistributed profit or earned surplus or reserves.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Bear & Bull</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <strong>What do you mean by Bear?</strong>
        <p>
            A stock market operator who expects share prices to fall and keeps selling (to pick the shares later at a lower price for actual delivery), causing selling pressure and lowering the prices further. Term derived from the attacking posture of the bear, pushing downwards.
        </p>
        <strong>What do you mean by Bear Market?</strong>
        <p>
            Prolonged period of falling share prices, dominated by selling pressure in the marketplace, brought by BEARS, or adverse economic or political factors such as a change in the industrial policy of the government, imposition of price control, drought or flood, free imports, etc., or a change in the government, Income Tax raids, etc.
        </p>
        <strong>What do you mean by Bull?</strong>
        <p>
            The bull refers to a stock market operator who believes that share prices are going to rise, and keeps buying to sell later at a profit. The bull’s action causes buying pressure in the marketplace and pushes up share prices.
        </p>
        <strong>What do you mean by Bull Market?</strong>
        <p>
            Bull market is symbolized by a prolonged rise in the price of shares, sustained by buying pressure of actual investors or BULLS. News of favorable economic growth, decontrol, political developments, lifting of price controls, budgetary concessions, etc., can trigger off a bull market.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Who are Stags?</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            The stags are those who, in general, do not invest in the secondary market. Instead, they prefer to make their investments in the primary market when new issues are made.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Capital Appreciation, Arbitrage & Capital Gains</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <strong>What do you mean by Capital Appreciation?</strong>
        <p>
            Increase in the price of a share; also, increase in the value of assets, is called capital appreciation.
        </p>
        <strong>What do you mean by Arbitrage?</strong>
        <p>
            Arbitrage refers to profiting from differences in price of the same share traded on two or more stock exchanges. An arbitrageur makes money by buying in the lower market and immediately thereafter or simultaneously selling in the higher market, thereby making a profit.
        </p>
        <strong>What do you mean by Capital Gains?</strong>
        <p>
            Capital gains represent profit on the sale of any assets, which have appreciated in value. Capital gains can either be short-term or long-term.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Contract Note</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Contract note is a document given by the stock broker to the buyer of the shares, embodying an agreement reached between them to buy or sell so many shares of such and such companies at the stated price, which usually includes the broker’s commission.
        </p>
        <p>
            The broker sends the note after executing the customer’s order as an agreement of delivery. The contract note must be carefully preserved, as it is documentary evidence to the income tax authorities in computations of short-term or long-term capital gains or losses.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Hedging</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Hedging is a mechanism used for offsetting investment risk. In the investment of one’s funds in the share market, it is done by buying different kinds of shares, so that if one falls in price another will rise, or investing in different kinds of assets e.g., shares, debentures, bonds, gold and silver, real estate, etc.
        </p>
        <p>
            Hedging against inflation is putting one’s money on assets, which will neutralize inflationary increases. A perfect hedge is a no-risk-no-gain precaution.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Speculation</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Buying or selling of shares of a particular company with an expectation that the prices will increase or decrease in a span of short duration with the objective to generate income on account of such change. Speculation is an activity in which a person assumes high risks, often without regard for the safety of his invested principal, to achieve large capital gains.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Historical Cost</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            An accounting term, meaning the original or acquisition cost of an asset. In historical cost accounting, all values, whether of assets or liabilities, incomes, or expenditure, are stated at the original value. This means that these sums are of historical relevance and do not reflect the current cost of production.
        </p>
        <p>
            In times of inflation, this may produce quite a wrong picture of the profitability of a company. Also, depreciation provisions made on historical cost may prove quite inadequate for replacement or renewals.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Market Maker</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            When a jobber maintains firm bid and offers prices in a particular share by his willingness to buy or sell market lots at publicly quoted prices, he makes in that share. He is also called a market maker. When he makes a market over a long period, he is said to maintain a market.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Split order</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Split order refers to a large order for shares, broken down into small quantities, to be bought or sold over a period of time, so as not to influence the market.
        </p>
    </CardContent>
</Card>

<Card className="mb-5">
    <CardHeader>
        <CardTitle>Spread</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
        <p>
            Spread refers to the difference between the bid and the offer price of a share on the floor of the stock exchange. If a share is bid at Nu. 64 and offered at Nu. 66, the jobber’s spread will be Nu. 2.
        </p>
        <p>
            The spread is large or small, depending upon the demand and supply of shares in the market. The more frequently and voluminously a share is traded in the exchange, the less will be the jobber’s spread.
        </p>
          </CardContent>
      </Card>

        </TabsContent>

        <TabsContent value="StockFundamentals">
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

        </TabsContent>
      </Tabs>
    </div>
  );
}
