// pages/privacy-policy.tsx

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Adjust the path to your UI components
import { Button } from '@/components/ui/button'; // Use any components for buttons or links

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-center justify-center py-5">
      <Card className="w-full ">

        <CardContent>
          <section title="Information m-CaMS Collects">
          <h2 className="py-4 text-lg font-bold">Information m-CaMS Collects</h2>
            <ul className="list-disc pl-5">
              <li><strong>Personal Details:</strong>
                <ul className="list-inside">
                  <li>Name</li>
                  <li>TPN (Tax Payer Number)</li>
                  <li>Phone Number</li>
                  <li>Bank account number</li>
                  <li>E-mail</li>
                  <li>Address</li>
                </ul>
              </li>
              <li><strong>Transaction Details:</strong>
                <ul className="list-inside">
                  <li>Number of shares/bonds the client sells</li>
                  <li>Number of shares/bonds the client buys</li>
                </ul>
              </li>
            </ul>
          </section>

          <section title="Sharing of Information">
          <h2 className="py-4 text-lg font-bold">Sharing of Information</h2>
            <p>An individual’s information is strictly kept private and:</p>
            <ul className="list-disc pl-5">
              <li>Made accessible only to the authenticated account holder</li>
              <li>Made accessible to the person (he/she) if there is legal documentation from the judiciary body (court)</li>
            </ul>
          </section>

          <section title="Keeping the Data Secure">
          <h2 className="py-4 text-lg font-bold">Keeping the Data Secure</h2>
            <ul className="list-disc pl-5">
              <li>RSEB has strong in-built security features on all security levels.</li>
              <li>We use the latest encryption methods to safeguard sensitive data.</li>
              <li>Access to information is restricted to authorized employees only.</li>
              <li>Physical access to storage is restricted to authorized personnel under lock and key.</li>
              <li>We have a surveillance team that monitors data movement.</li>
            </ul>
          </section>

          <section title="Why We Collect Information">
          <h2 className="py-4 text-lg font-bold">Why We Collect Information</h2>
            <p>
              Royal Securities Exchange of Bhutan (RSEB) is the only stock exchange in the country, established in 1993. RSEB functions as the stock exchange, clearing house, and central depository. The Financial Services Act of Bhutan, 2011, mandates RSEB to be equipped with infrastructure capable of facilitating business operations in accordance with the Act.
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
