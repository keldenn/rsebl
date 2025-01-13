'use client'
import Head from 'next/head';
import Image from 'next/image';

const CompanyProfile = () => {
  return (
    <>
      <main className="bg-gradient-to-b min-h-screen">
        {/* Board of Directors Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold text-center mb-6">Board of Directors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex  items-center gap-4">
              <img src="https://rsebl.org.bt/agm/storage/board/nFgwttiwxvnc5WBbuKaVAMotvi5NKkpMJjGS3JrS.jpg" alt="Director 1" className="rounded-full border-4 border-custom-2 w-44 h-44" />
              <div>
                <h3 className="text-xl font-bold">Chairperson</h3>
                <h6 className="text-gray-700 font-medium">Mr. Tshering Gyaltshen Penjor</h6>
                <p className="text-xs text-gray-700">Secretary, National Land Commission</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img src="https://rsebl.org.bt/agm/storage/board/oURCp1PqH2uPWNLVmbb9UsAPOr7RGpmnswgQVyug.png" alt="Director 2" className="rounded-full border-4 border-custom-2 w-44 h-44" />
              <div>
              <h3 className="text-xl font-bold">Director</h3>
                <h6 className="text-gray-700 font-medium">Mrs. Zangmo Dukpa</h6>
                <p className="text-xs text-gray-700">Founder, Samuh Mediatech</p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <img src="https://rsebl.org.bt/agm/storage/board/2OSzSL4kVPokZ5cbJbZXcn2Fo2A8EPxLfrXO8TzN.jpg" alt="Director 3" className="rounded-full border-4 border-custom-2 w-44 h-44" />
              <div>
              <h3 className="text-xl font-bold">Director</h3>
                <h6 className="text-gray-700 font-medium">Mr. Jigdrel Singay</h6>
                <p className="text-xs text-gray-700">Innovation Analyst, Druk Holding & Investments</p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <img src="https://rsebl.org.bt/agm/storage/board/7UTec5jhBhuFaoc5NHbStDongdRZ5EYrqbwguFhI.png" alt="Director 4" className="rounded-full border-4 border-custom-2 w-44 h-44" />
              <div>
              <h3 className="text-xl font-bold">Director</h3>
                <h6 className="text-gray-700 font-medium">Mr. Dorji Phuntsho</h6>
                <p className="text-xs text-gray-700">CEO, Royal Securities Exchange of Bhutan</p>
              </div>
            </div>
          </div>
        </section>
        {/* Mission and Vision Section */}
        <section className="bg-blue-100 py-16 rounded-xl border bg-card text-card-foreground shadow">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold mb-6">Mission</h2>
              <p className="text-gray-700 leading-8">
                To develop and establish a fair, orderly, and transparent securities market with the objective to facilitate efficient mobilization and allocation of capital and ensure apt regulation to maintain market integrity and investor confidence.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold mb-6">Vision</h2>
              <p className="text-gray-700 leading-8">
                To become an integral part of the financial system and participate in nation-building.
              </p>
            </div>
          </div>
        </section>

        {/* Clearing and Settlement Section */}
        <section className="container mx-auto px-4 py-16 rounded-xl border bg-card text-card-foreground shadow">
          <h2 className="text-3xl font-semibold text-center mb-6">Clearing and Settlement</h2>
          <p className="text-gray-700 leading-8 max-w-4xl mx-auto">
            The RSEB Clearing and Settlement House (CSH) was established in March 2012 under the Financial Services Act, 2011. It guarantees settlement for all members, acts as a legal counterpart to all trades, and controls risks associated with transaction settlement. Trades in equity securities are settled within two business days after the trade date (T+2).
          </p>
        </section>

        {/* Automated Trading System Section */}
        <section className="bg-blue-100 py-16 rounded-xl border bg-card text-card-foreground shadow">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-6">Automated Trading System (ATS)</h2>
            <p className="text-gray-700 leading-8 max-w-4xl mx-auto text-center">
              The ATS enables trading online through the internet. It provides real-time order matching, market statistics, and integration with Brokers Back Office System and Electronic Depository System. The system enhances efficiency, reduces settlement risks, and ensures smooth trading operations.
            </p>
          </div>
        </section>

        {/* Trading Section */}
        <section className="container mx-auto px-4 py-16 rounded-xl border bg-card text-card-foreground shadow">
          <h2 className="text-3xl font-semibold text-center mb-6">Trading</h2>
          <p className="text-gray-700 leading-8 max-w-4xl mx-auto">
            The Trading and IT Division ensures smooth operation of the trading engine and other auxiliary systems. It links major players such as investment banks, stockbrokers, and hedge funds, offering a common platform for financial analysis and execution of trades.
          </p>
        </section>

        {/* Depository Section */}
        <section className="bg-blue-100 py-16 rounded-xl border bg-card text-card-foreground shadow">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-6">Depository</h2>
            <p className="text-gray-700 leading-8 max-w-4xl mx-auto text-center">
              The Central Depository (CD) manages digital records of share ownership, equity, and debt instruments. It completed dematerialization of physical share certificates in 2007, maintaining transparency and efficiency in securities management.
            </p>
          </div>
        </section>

        {/* Listing Section */}
        <section className="container mx-auto px-4 py-16 rounded-xl border bg-card text-card-foreground shadow">
          <h2 className="text-3xl font-semibold text-center mb-6">Listing</h2>
          <p className="text-gray-700 leading-8 max-w-4xl mx-auto">
            The Listing Division ensures compliance with listing norms and facilitates the listing of new companies. It promotes transparency, liquidity, and investor protection, enabling access to a regulated marketplace for securities.
          </p>
        </section>

        {/* History Section */}
        <section className="bg-blue-100 py-16 rounded-xl border bg-card text-card-foreground shadow">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-6">History</h2>
            <p className="text-gray-700 leading-8 max-w-4xl mx-auto text-center">
              Established in 1993 under the Royal Monetary Authority, RSEB transitioned to an autonomous body in 1996. It facilitates savings mobilization, equity capital raising, and liquidity provision for shareholders. Over the years, the number of shareholders and listed companies has grown significantly.
            </p>
          </div>
        </section>
        {/* Core Values Section */}
        <section className="py-16 rounded-xl border bg-card text-card-foreground shadow ">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Core Values</h2>
            <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
              At RSEB, our values guide every decision and action, ensuring we operate with fairness, transparency, and integrity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                  <Image src="/assets/iterate-icon.svg" alt="Iterate to Success" width={40} height={40} />
                </div>
                <h3 className="text-lg font-bold mb-2">We Iterate to Success</h3>
                <p className="text-gray-600">
                  Success isn’t a straight line. We acknowledge our mistakes and learn to move closer to where we want to go.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                  <Image src="/assets/growth-icon.svg" alt="Encourage Personal Growth" width={40} height={40} />
                </div>
                <h3 className="text-lg font-bold mb-2">We Encourage Growth</h3>
                <p className="text-gray-600">
                  We help individuals become the best version of themselves, both personally and professionally.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                  <Image src="/assets/extra-mile-icon.svg" alt="Go the Extra Mile" width={40} height={40} />
                </div>
                <h3 className="text-lg font-bold mb-2">We Go the Extra Mile</h3>
                <p className="text-gray-600">
                  We believe in going above and beyond, solving challenges, and delivering exceptional results.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                  <Image src="/assets/fun-icon.svg" alt="Having Fun" width={40} height={40} />
                </div>
                <h3 className="text-lg font-bold mb-2">We Have Fun</h3>
                <p className="text-gray-600">
                  Work doesn’t have to be a grind. We believe great outcomes come from enjoying what we do.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CompanyProfile;
