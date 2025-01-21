"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const ServicesIdPage = () => {
  const params = useParams();
  const servicesId = params?.servicesId;
  const [brokerageFirms, setBrokerageFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cid, setCid] = useState("");
  const [selectedBroker, setSelectedBroker] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    cd_code: "",
    user_name: "",
  });
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const { toast } = useToast()
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  useEffect(() => {
    // Fetch brokerage firms list from the API
    const fetchBrokerageFirms = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getBrokerList`);
        if (!response.ok) throw new Error("Failed to fetch brokerage firms");
        const data = await response.json();
        setBrokerageFirms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrokerageFirms();
  }, []);

  const handleFetchDetails = async () => {
    if (!cid || !selectedBroker) {
      setDetailsError("Please enter CID and select a brokerage firm.");
      return;
    }
    setDetailsError(null);
    setDetailsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getUserDetails?cidNo=${cid}&broker=${selectedBroker}`
      );
      const data = await response.json();

      if (data.status === "400" && data.message === "Please open a CD account with the selected Brokerage Firm.") {
        toast({
          description: "Please open a CD account with the selected Brokerage Firm.",
          variant: "destructive",
        });
      } else if (data.status === "200" && data.data.length > 0) {
        const user = data.data[0]; // Extract user details from the first item in the array

        setUserDetails({
          name: `${user.f_name} ${user.l_name}`,
          phone: user.phone || "Not Available",
          email: user.email || "Not Available",
          address: user.address || "Not Available",
          cd_code: user.cd_code || "Not Available",
          user_name: user.user_name || "Not Avaliable"
        });
      } else {
        setDetailsError("No user details found for the provided CID and Brokerage firm.");
      }
    } catch (err) {
      setDetailsError("Failed to fetch user details. Please try again.");
    } finally {
      setDetailsLoading(false);
    }
  };
  

  const handleFinalSubmit = async () => {
    if (!isCheckboxChecked) {
      toast({
        description: "Please agree to the terms and conditions before submitting.",
        variant: "destructive",
      });
      return;
    }
  
    const payload = {
      cidNo: cid, // CID number entered by the user
      address: userDetails.address, // User's address from fetched details
      broker: selectedBroker, // Selected brokerage firm
      cd_code: userDetails.cd_code, // Hardcoded CD code (replace with dynamic value if needed)
      declaration: true, // Declaration checkbox is checked
      email: userDetails.email, // User's email from fetched details
      fee: 500, // Hardcoded fee amount
      name: userDetails.name, // User's name from fetched details
      phoneNo: userDetails.phone, // User's phone number from fetched details
      status: "SUB", // Hardcoded status
      userName: userDetails.user_name, // Username derived from broker (e.g., MEMRICB001)
    };
    //console.log(payload);
  
    try {
      // Call the submit API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submitUserDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Show success message if submission is successful
        toast({
          description: "Application submitted successfully!",
          variant: "success",
        });
  
        // Reset the form (optional)
        setCid("");
        setSelectedBroker("");
        setUserDetails({
          name: "",
          phone: "",
          email: "",
          address: "",
          cd_code: "",
          user_name: "",
        });
        setIsCheckboxChecked(false);
      } else {
        // Handle errors from the API
        toast({
          description: data.message || "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      // Handle network or other errors
      toast({
        description: "An error occurred while submitting the application. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  


  // Define UI for each service ID
  const renderContent = () => {
    switch (servicesId) {
      case "mCaMs":
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8 rounded-xl border bg-card text-card-foreground shadow">
              {/* Mobile App Mockup */}
              <div className="flex justify-center items-center">
                <Image
                  src="/images/mcams-removebg-preview.png"
                  alt="Mobile App Mockup"
                  width={350}
                  height={700}
                  className="rounded-lg transform rotate-3"
                />
              </div>

              {/* Text and Details Section */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Logo and Title */}
                <div className="flex items-center justify-center lg:justify-start mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={113}
                  height={40}
                  viewBox="0 0 153 138"
                  fill="none"
                  className="mr-4"
                >
                <path
                  d="M87.4225 91.3752L65.3705 70.9525C64.0985 69.7752 64.0985 67.8659 65.3705 66.6885L126.916 9.6912C128.187 8.51387 130.248 8.51387 131.518 9.6912L193.064 66.6885C194.336 67.8659 194.336 69.7752 193.064 70.9525L131.518 127.95C130.248 129.127 128.187 129.127 126.916 127.95L111.918 114.062"
                  stroke="#205A8A"
                  strokeWidth="16.6253"
                  strokeMiterlimit={10}
                />
                <mask
                  id="mask0_2363_2582"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={1}
                  width={147}
                  height={137}
                >
                  <path d="M0 0.999996H146.227V137.652H0V0.999996Z" fill="white" />
                </mask>
                <g mask="url(#mask0_2363_2582)">
                  <path
                    d="M114.908 46.7712L136.96 67.1939C138.232 68.3712 138.232 70.2805 136.96 71.4579L75.4147 128.455C74.1441 129.633 72.0827 129.633 70.8121 128.455L9.26674 71.4579C7.99474 70.2805 7.99474 68.3712 9.26674 67.1939L70.8121 10.1965C72.0827 9.01921 74.1441 9.01921 75.4147 10.1965L90.4121 24.0845"
                    stroke="#382E7A"
                    strokeWidth="16.6253"
                    strokeMiterlimit={10}
                  />
                </g>
              </svg>
                  <h1 className="text-4xl font-bold text-[#3B3A73]">{servicesId}</h1>
                </div>

                {/* Tagline */}
                <h2 className="text-2xl font-bold mb-6">Trading on your fingertips</h2>

                {/* Features List */}
                <ul className="text-lg space-y-3 mb-6">
                  <li>✔ Order Manager</li>
                  <li>✔ Executed Orders</li>
                  <li>✔ Market</li>
                  <li>✔ Listed Companies</li>
                  <li>✔ And many more...</li>
                </ul>

                {/* App Store and Play Store Buttons */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <a
                    href="https://play.google.com/store/apps/details?id=mcmsrseb.rsebl.org.mcms_rseb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform transform hover:scale-105"
                  >
                    <Image
                      src="/images/apl.png"
                      alt="App Store Badge"
                      width={150}
                      height={50}
                    />
                  </a>
                  <a
                    href="https://apps.apple.com/us/app/mcams/id1457797916"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform transform hover:scale-105"
                  >
                    
                    <Image
                      src="/images/gpl.png"
                      alt="Google Play Badge"
                      width={150}
                      height={50}
                    />
                  </a>
                </div>
                <p className="text-base font-bold mb-4 mt-6">Scan the QR to download the app</p>
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAIAAAAABMCaAAABq0lEQVR42u3aWw7CMAwEwN7/0nACJIK9IY/JJ6pKM5Vqd93nZZXXgwAixCMRn8CqnP/jRX9x/qn7gggR4vGIpQdt4TyjoBXcrn1BhAjxLsRKAUkXhy7cyr4gQoQIsYo4CtTV5EOECBHirojpZhsiRIgQVwkgKhuW4kCECHE2YnpQ9a/fj5r2QYQIMYoY//CnMKRPNPlt+4IIEeKRiJVwtKsxTgytlmi2IUKEuB1iAutfgUWlWA3fJIgQIR6JmB4wJZrtdBGLJ9sQIUJcFjH98p8ICBI3oy2UhQgR4taI6Rf+rg+X0oFFpDpDhAhxa8TKAzu9+fT/Dh8DESLEqxDTDW26mKSvGSJEiOcjpoPYRKgx82UBIkSI9yK2PYADgejM6ywN7yFChLgdYnp1FZOuQVgkgIAIEeIxiOkhd1eTPNwMp5twiBAhHo+YCEoTIWsl6O06HiJEiHchJh7wiWPSxTCe4kCECBFiY/OcHk4tXVggQoS4HWLXUD89yB/eL0SIEK9CTIQIiUFVuuGHCBHivYiJl/lEUUo050tP+yBChDgN0fqxiCGACPGU9QbTOOknjQzo1AAAAABJRU5ErkJggg=="
                  alt="Mobile App Mockup"
                  width={150}
                  height={150}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Register Section */}
              <div className="rounded-xl h-auto border bg-card text-card-foreground shadow p-4">
                  <h2 className="py-4 text-xl font-medium text-center">Register For mCaMs</h2>
                  <label className="text-sm font-medium">CID</label>
                  <input
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-4"
                    placeholder="Enter your CID number"
                    value={cid}
                    type="number"
                    onChange={(e) => setCid(e.target.value)}
                    required
                  />
                  <label className="text-sm font-medium">Brokerage Firm</label>
                  {loading ? (
                    <p className="mt-2">Loading brokerage firms...</p>
                  ) : error ? (
                    <p className="mt-2 text-red-500">Error: {error}</p>
                  ) : (
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-muted-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2"
                      aria-describedby="firms-description"
                      aria-invalid="false"
                      name="firms"
                      value={selectedBroker}
                      onChange={(e) => setSelectedBroker(e.target.value)}
                      required
                    >
                      <option value="">Select Brokerage Firm</option>
                      {brokerageFirms.map((firm) => (
                        <option key={firm.participant_id} value={firm.participant_code}>
                          {firm.name || firm.participant_code}
                        </option>
                      ))}
                    </select>
                  )}
                    {/* Fetch Details Button */}
                    <div className="flex justify-center">
                      <Button variant="outline" size="lg" className="mt-4" onClick={handleFetchDetails}>
                        Fetch Details
                      </Button>
                    </div>
                    {detailsError && <p className="mt-2 text-red-500">{detailsError}</p>}
                    {detailsLoading && <p className="mt-2">Fetching user details...</p>}

                    {userDetails.name && (
                      <>
                    <label className="text-sm font-medium mt-2">Name</label>
                    <input
                      className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-4"
                      value={userDetails.name || ""}
                      disabled
                    />
                    <label className="text-sm font-medium">Phone Number</label>
                    <input
                      className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-4"
                      value={userDetails.phone || ""}
                      disabled
                    />
                    <label className="text-sm font-medium">Email</label>
                    <input
                      className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-4"
                      value={userDetails.email || ""}
                      // disabled
                    />
                    <label className="text-sm font-medium">Address</label>
                    <input
                      className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-4"
                      value={userDetails.address || ""}
                      disabled
                    />
                    <label className="text-sm font-medium">Fee(Nu.)</label>
                    <input
                      className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-4"
                      // placeholder="500"
                      value={500}
                      disabled
                    />
                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mr-3"
                        checked={isCheckboxChecked}
                        onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                      />
                      <label htmlFor="terms" className="text-sm font-medium">
                        I declare that the information stated above is true to the best of my knowledge & belief and I agree to the{" "}
                        <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          terms and conditions
                        </a>{" "}
                        of RSEB for processing Online Terminal.
                      </label>
                    </div>
                    <div className="flex justify-center">
                      <Button variant="outline" size="lg" className="my-5" onClick={handleFinalSubmit}>
                        Submit
                      </Button>
                    </div>

                  </>
                  )}
                </div>

              {/* Renew Section */}
              <div className="rounded-xl h-auto border bg-card text-card-foreground shadow p-4">
                <h2 className="py-4 text-xl font-medium text-center">Renew my mCaMs account</h2>
                <label className="text-sm font-medium">Username</label>
                <input
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-4"
                  placeholder="Enter your username"
                  type="text"
                />
                <div className="flex justify-center">
                  <Button variant="outline"
                      size="lg"
                      className="my-5"
                      >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </>
        );

      case "OnlineShareStmt":
        const [accountType, setAccountType] = useState(""); // State to track dropdown selection

        const handleAccountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          setAccountType(e.target.value); // Update state based on dropdown selection
        };
        return (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
            {/* Register Section */}
            <div className="rounded-xl h-auto border bg-card text-card-foreground shadow p-4">
              <h2 className="py-4 text-xl font-medium text-center">Online Share Statement</h2>
              <label className="text-sm font-medium">Account Type</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-muted-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2 mb-2"
                aria-describedby="firms-description"
                aria-invalid="false"
                name="firms"
                required
                value={accountType}
                onChange={handleAccountTypeChange}
              >
                <option value="">Select Account Type</option>
                <option value="individual">Individual</option>
                <option value="corporate">Corporate/Association</option>
              </select>
      
              {accountType === "individual" && (
                <>
                  <label className="text-sm font-medium">CID</label>
                  <input
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-2"
                    placeholder="Enter your CID number"
                    type="number"
                    required
                  />
                </>
              )}
      
              {accountType === "corporate" && (
                <>
                  <label className="text-sm font-medium">DISN No</label>
                  <input
                    className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-2"
                    placeholder="Enter DISN number provided by RSEB"
                    type="text"
                    required
                  />
                </>
              )}
      
              <div className="flex justify-center">
                <Button variant="outline" size="lg" className="my-5">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
              <div className="rounded-xl h-auto border bg-card text-card-foreground shadow p-4">
                <h2 className="py-4 text-xl font-medium text-center">Online Registration for Bhutanese Living Aboard</h2>
                <label className="text-sm font-medium">CID</label>
                <input
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 mt-2 mb-4"
                  placeholder="Enter your CID number"
                  type="text"
                />
                <div className="flex justify-center">
                  <Button variant="outline"
                      size="lg"
                      className="my-5"
                      >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return renderContent();
};

export default ServicesIdPage;
