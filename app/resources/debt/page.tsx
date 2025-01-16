"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function FinancialTabsPage() {
  return (
    <div className="w-full p-4 max-w-full mx-auto space-y-4">
      <Tabs defaultValue="Bonds" className="space-y-4">
        <TabsList>
          <TabsTrigger value="Bonds">Bonds</TabsTrigger>
          <TabsTrigger value="CommercialPapers">Commercial Papers</TabsTrigger>
          <TabsTrigger value="SubordinatedDebt">Subordinated Debt</TabsTrigger>
        </TabsList>

        <TabsContent value="Bonds">
          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                A bond is a debt security, similar to an I.O.U. When you purchase a
                bond, you lend money to the issuer of the bond. That issuer could
                be a corporation, state, city, government, or other entity.
              </p>
              <p>
                In return, the issuer agrees to pay you a specified rate of
                interest over the life of the bond and to repay the face value of
                the bond (the principal) when it reaches maturity — that is, the
                date the bond comes due.
              </p>
              <p>You can find the list of listed bonds in RSEB here.</p>
            </CardContent>
          </Card>

          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Maturity & Coupon</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                <strong>What is maturity date?</strong>
              </p>
              <p>
                This is the date when the principal or par amount of the bond is
                paid to investors and the company's bond obligation ends.
              </p>
              <p>
                <strong>What is Coupon rate?</strong>
              </p>
              <p>
                It represents the interest paid to bondholders (annually or
                semi-annually).
              </p>
            </CardContent>
          </Card>

          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Risks of Bonds</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>Following are the common risks associated with bond investment:</p>
              <ol className="list-decimal list-inside">
                <li>Interest rate risk</li>
                <li>Credit risk</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Interest Rate Risk</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Interest rates share an inverse relationship with bonds, so when
                rates rise, bonds tend to fall and vice versa. Interest rate risk
                comes when rates change significantly from what the investor
                expected. If interest rates decline significantly, the investor
                faces the possibility of prepayment. If interest rates rise, the
                investor will be stuck with an instrument yielding below market
                rates. The greater the time to maturity, the greater the interest
                rate risk an investor bears, because it is harder to predict
                market developments farther out into the future.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-5">
            <CardHeader>
              <CardTitle>Credit Risk</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Credit or default risk is the risk that interest and principal
                payments due on the obligation will not be made as required. When
                an investor buys a bond, they expect that the issuer will make
                good on the interest and principal payments—just like any other
                creditor.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="CommercialPapers">
        <Card className="mb-5">
    <CardHeader>
      <CardTitle>Introduction</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        Commercial paper is an unsecured, short-term debt instrument issued by
        corporations. It's typically used to finance short-term liabilities such as
        payroll, accounts payable, and inventories. Commercial paper is usually
        issued at a discount rate from face value.
      </p>
      <p>You can find a list of commercial papers here.</p>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Issuer</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        The issuer of commercial paper is the entity that is creating the
        short-term debt to fund their short-term cash needs.
      </p>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Term</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        The maturity of commercial paper designates how long the debt is outstanding
        for the issuer. Commercial paper often has a term up to 270 days, though
        companies often issue commercial paper with a maturity of 30 days. At the
        end of the maturity period, the commercial paper is technically due, and
        the issuer is now liable to return investor capital (though they may choose
        to simply re-issue more commercial paper).
      </p>
    </CardContent>
  </Card>

  <Card className="mb-5">
    <CardHeader>
      <CardTitle>Discount/Face Value</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        Commercial paper is issued at face value, meaning a debt instrument has a
        value to it, often in denominations of Nu. 100,000. Instead of paying
        interest, commercial paper is instead often issued at a discount, or a
        price that is less than face value. When the commercial paper reaches
        maturity, the investor will receive the face value amount of the instrument
        even though they paid a lower discount amount.
      </p>
    </CardContent>
  </Card>
        </TabsContent>

        <TabsContent value="SubordinatedDebt">
        <Card >
    <CardHeader>
      <CardTitle>Introduction</CardTitle>
    </CardHeader>
    <CardContent className="text-sm">
      <p>
        Subordinated debt (AKA subordinated debenture) is an unsecured loan or bond
        that ranks below other, more senior loans or securities with respect to
        claims on assets or earnings. Subordinated debentures are thus also known
        as junior securities.
      </p>
      <p>
        In the case of borrower default, creditors who own subordinated debt will
        not be paid out until after senior bondholders are paid in full.
      </p>
    </CardContent>
  </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}