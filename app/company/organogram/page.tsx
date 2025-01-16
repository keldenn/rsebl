
const teamMembers = [
    {
      name: "Dorji Phuntsho",
      designation: "Chief Executive Officer",
      image: "https://rsebl.org.bt/agm/storage/profiles/caztfpNNgId0ZHcpUoElNyO8FEPpm4k90s6WUKFe.jpg"
    },
    {
      name: "Promod Chhetri",
      designation: "General Manager",
      image: "https://rsebl.org.bt/agm/storage/profiles/3JcBN0aIIh53Tsw1pZ2eo3u12BIN6ULL3AS8ZEb3.jpg"
    },
    {
      name: "Dawa Dakpa",
      designation: "Head, Policy",
      image: "https://rsebl.org.bt/agm/storage/profiles/VtVWiJcPzt6RkJf5ehqkdyrWKVVroyoaHx8yV7Qc.jpg"
    },
    {
      name: "Bijoy Chhetri",
      designation: "Head, ITD",
      image: "https://rsebl.org.bt/agm/storage/profiles/Fgmz0MvsIe0304uft6gBnMYm18kw75s9fNMqYaJw.jpg"
    },
    {
      name: "Ngawang Lhendup",
      designation: "Head, Operations",
      image: "https://rsebl.org.bt/agm/storage/profiles/9FW2OA3TNcBx7nLYoAcE08jx8Z8Txwd3xce8PeCx.jpg"
    },
    {
      name: "Tenzin Rabgay",
      designation: "Head, Finance",
      image: "https://rsebl.org.bt/agm/storage/profiles/At53frbhSc706m2IyICIcByXBDPOWsiAVW0afShx.jpg"
    },
    {
      name: "Khandu Wangmo",
      designation: "Head, Clearing & Settlement",
      image: "https://rsebl.org.bt/agm/storage/profiles/v7RgrEqs2G17nOtfPs56jUSLHC728YY4wGqxI5Wq.jpg"
    },
    {
      name: "Deepak Acharya",
      designation: "IT Officer",
      image: "https://rsebl.org.bt/agm/storage/profiles/02rOJtwCtmkx1vc5j6STcMRRsV1OvKsppwxk7Z90.jpg"
    },
    {
      name: "Tashi Dendup",
      designation: "IT Officer",
      image: "https://rsebl.org.bt/agm/storage/profiles/uZJCWHMtLN96QyDalRy5Q1ucoisdcrmPc87BpcV2.jpg"
    },
    {
      name: "Sonam Phuntsho Lhagyel",
      designation: "Analyst [on study Leave]",
      image: "https://rsebl.org.bt/agm/storage/profiles/Hya1Y0LgAtGkzMguBAIdeAiLBR9mrP0P5ySCiXVK.png"
    },
    {
      name: "Dechen Pelden",
      designation: "Analyst",
      image: "https://rsebl.org.bt/agm/storage/profiles/uVHvWcJuDvLaKXlNzDuPJC3HGcavoqFUOkjCBWT0.jpg"
    },
    {
      name: "Jangchuk Wangdi",
      designation: "Accountant",
      image: "https://rsebl.org.bt/agm/storage/profiles/MnacXvBhSzJKZ10lY9NSPag7hseCbOwnqdJAJiHx.jpg"
    },
    {
      name: "Dorji Zangmo",
      designation: "Central Depository",
      image: "https://rsebl.org.bt/agm/storage/profiles/ZY3ZQvfEPlgsfLLFFfDCWDHjM5XTQxZ3Gi3HEsWJ.jpg"
    },
    {
      name: "Kezang Dorji",
      designation: "Dispatch",
      image: "https://rsebl.org.bt/agm/storage/profiles/NdkZ6lpTsFD5ranEru9oW6NsOjwrg9r6HvAzlQ8j.jpg"
    },
    {
      name: "Dendup",
      designation: "Driver",
      image: "https://rsebl.org.bt/agm/storage/profiles/x8NlmXuuveypExbf706yEOY4MfoTscBHQo9ckciQ.jpg"
    },
    {
      name: "Sonam Choden",
      designation: "Helper",
      image: "https://rsebl.org.bt/agm/storage/profiles/KmoMhUPMzeB1lJDo0i3n1vpCVvmT3OJwOx2GxQw4.jpg"
    }
  ];
 
  export default function FrontendRadioCard() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="max-w-sm p-4 rounded-xl border bg-card text-card-foreground shadow">
            <div className="text-sm font-semibold uppercase text-gray-500 mb-2">{member.designation}</div>
            {/* <div className="mt-2 text-gray-600">RSEBL</div> */}
            <div className="text-xl font-bold mb-4">{member.name}</div>
            <div className="relative h-full w-full rounded-lg overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-92 object-fill"
            />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
