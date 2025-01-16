'use client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Adjust the import path as needed

const CompanyProfile = () => {
  return (
    <>
      <main className="bg-gradient-to-b min-h-screen">
        {/* Board of Directors Section */}
        <section className="container mx-auto px-4 py-16">
        <h2 className="py-4 text-xl font-medium my-5">Board of Directors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-start items-center gap-4">
              <img src="https://rsebl.org.bt/agm/storage/board/nFgwttiwxvnc5WBbuKaVAMotvi5NKkpMJjGS3JrS.jpg" alt="Director 1" className="rounded-full border-4 border-custom-2 w-44 h-44" />
              <div>
                <h3 className="text-xl font-bold">Chairperson</h3>
                <h6 className="text-gray-700 font-medium">Mr. Tshering Gyaltshen Penjor</h6>
                <p className="text-xs text-gray-700">Secretary, National Land Commission</p>
              </div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <img src="https://rsebl.org.bt/agm/storage/board/oURCp1PqH2uPWNLVmbb9UsAPOr7RGpmnswgQVyug.png" alt="Director 2" className="rounded-full border-4 border-custom-2 w-44 h-44" />
              <div>
              <h3 className="text-xl font-bold">Director</h3>
                <h6 className="text-gray-700 font-medium">Mrs. Zangmo Dukpa</h6>
                <p className="text-xs text-gray-700">Founder, Samuh Mediatech</p>
              </div>
            </div>
            <div className="flex justify-start lg:justify-center items-center gap-4">
              <img src="https://rsebl.org.bt/agm/storage/board/2OSzSL4kVPokZ5cbJbZXcn2Fo2A8EPxLfrXO8TzN.jpg" alt="Director 3" className="rounded-full border-4 border-custom-2 w-44 h-44" />
              <div>
              <h3 className="text-xl font-bold">Director</h3>
                <h6 className="text-gray-700 font-medium">Mr. Jigdrel Singay</h6>
                <p className="text-xs text-gray-700">Innovation Analyst, Druk Holding & Investments</p>
              </div>
            </div>
            <div className="flex justify-start lg:justify-center items-center gap-4">
              <img src="https://rsebl.org.bt/agm/storage/board/7UTec5jhBhuFaoc5NHbStDongdRZ5EYrqbwguFhI.png" alt="Director 4" className="rounded-full border-4 border-custom-2 w-44 h-44" />
              <div>
              <h3 className="text-xl font-bold">Director</h3>
                <h6 className="text-gray-700 font-medium">Mr. Dorji Phuntsho</h6>
                <p className="text-xs text-gray-700">CEO, Royal Securities Exchange of Bhutan</p>
              </div>
            </div>
          </div>
        </section>
        <div className="min-h-screen py-4 px-4 ">
      <div className="max-w-7xl mx-auto">
      <h2 className="py-4 text-xl font-medium my-5">About</h2>

      

          {/* Mission & Vision Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  To develop and establish a fair, orderly, and transparent securities market with the objective to facilitate efficient mobilization and allocation of capital and ensure apt regulation to maintain market integrity and investor confidence.
                </CardDescription>
                <img
                  src="/illustrations/mission.svg" // Replace with your illustration
                  alt="Mission Illustration"
                  className="w-full h-auto mt-6"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  To become an integral part of the financial system and participate in nation-building.
                </CardDescription>
                <img
                  src="/illustrations/vision.svg" // Replace with your illustration
                  alt="Vision Illustration"
                  className="w-full h-auto mt-6"
                />
              </CardContent>
            </Card>
          </div>
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Membership</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row md:flex-row-reverse items-center">
              <div className="flex-1">
                <CardDescription>
                  The unique feature of RSEB is that its members, or brokerage firms, are its shareholders. The exchange is owned by four brokerage firms established under the Companies Act and licensed under the Financial Institutions Act (FIA).
                </CardDescription>
              </div>
              <div className="flex-1 mt-6 md:mt-0 md:ml-6">
                <img
                  src="/illustrations/membership.svg" // Replace with your illustration
                  alt="Membership Illustration"
                  className="w-full h-auto"
                />
              </div>
            </CardContent>
          </Card>
          {/* Clearing and Settlement Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Clearing and Settlement</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center">
              <div className="flex-1">
                <CardDescription>
                  The RSEB Clearing and Settlement House (CSH) was established in March 2012 to guarantee settlement for all members, act as a legal counterpart to all trades, and control risks associated with transaction settlement. All trades in equity securities are settled within two business days after the trade date (T+2).
                </CardDescription>
              </div>
              <div className="flex-1 mt-6 md:mt-0 md:ml-6">
                <img
                  src="/illustrations/clearing.svg" // Replace with your illustration
                  alt="Clearing and Settlement Illustration"
                  className="w-full h-auto"
                />
              </div>
            </CardContent>
          </Card>

          {/* Automated Trading System Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Automated Trading System (ATS)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row md:flex-row-reverse items-center">
              <div className="flex-1">
                <CardDescription>
                  RSEB's ATS allows individuals to trade online through the internet. It provides real-time order transmission, validation, and settlement, ensuring a seamless trading experience for investors worldwide.
                </CardDescription>
              </div>
              <div className="flex-1 mt-6 md:mt-0 md:ml-6">
                <img
                  src="/illustrations/ats.svg" // Replace with your illustration
                  alt="ATS Illustration"
                  className="w-full h-auto"
                />
              </div>
            </CardContent>
          </Card>

          {/* Trading Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Trading</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center">
              <div className="flex-1">
                <CardDescription>
                  Established in 1993, the Trading and IT Division provides a platform for buyers and sellers to transact securities. It ensures the smooth operation of the trading engine and other auxiliary components of the integrated system.
                </CardDescription>
              </div>
              <div className="flex-1 mt-6 md:mt-0 md:ml-6">
                <img
                  src="/illustrations/trading.svg" // Replace with your illustration
                  alt="Trading Illustration"
                  className="w-full h-auto"
                />
              </div>
            </CardContent>
          </Card>

          {/* Depository Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Depository</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row md:flex-row-reverse items-center">
              <div className="flex-1">
                <CardDescription>
                  The Central Depository (CD) maintains digital records of share ownership and handles off-market transactions. As of June 30, 2018, it manages 809,223,224 shares of 21 listed companies and 19 outstanding bonds worth Nu. 10.56 billion.
                </CardDescription>
              </div>
              <div className="flex-1 mt-6 md:mt-0 md:ml-6">
                <img
                  src="/illustrations/depository.svg" // Replace with your illustration
                  alt="Depository Illustration"
                  className="w-full h-auto"
                />
              </div>
            </CardContent>
          </Card>

          {/* Listing Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Listing</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center">
              <div className="flex-1">
                <CardDescription>
                  The Listing Division ensures compliance with listing norms and promotes transparency in the capital market by disseminating timely information to the public.
                </CardDescription>
              </div>
              <div className="flex-1 mt-6 md:mt-0 md:ml-6">
                <img
                  src="/illustrations/listing.svg" // Replace with your illustration
                  alt="Listing Illustration"
                  className="w-full h-auto"
                />
              </div>
            </CardContent>
          </Card>

          {/* History Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>History</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row md:flex-row-reverse items-center">
              <div className="flex-1">
                <CardDescription>
                  Established in 1993, RSEB has grown significantly over the years. From 1,828 shareholders in 1993 to over 62,610 in 2018, and from 4 listed companies to 21, RSEB continues to play a vital role in Bhutan's financial system.
                </CardDescription>
              </div>
              <div className="flex-1 mt-6 md:mt-0 md:ml-6">
                <img
                  src="/illustrations/history.svg" // Replace with your illustration
                  alt="History Illustration"
                  className="w-full h-auto"
                />
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
      </main>
    </>
  );
};

export default CompanyProfile;
