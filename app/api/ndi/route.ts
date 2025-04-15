import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { connect, StringCodec, nkeyAuthenticator } from "nats";


const NDI_NATS_SEED = process.env.NDI_NATS_SEED!;
const NDI_AUTH_URL = process.env.NDI_AUTH_URL!;
const NDI_PROOF_REQUEST_URL = process.env.NDI_PROOF_REQUEST_URL!;
const NDI_NATS_URL = process.env.NDI_NATS_URL!;
const NDI_CLIENT_ID = process.env.NDI_CLIENT_ID!;
const NDI_CLIENT_SECRET = process.env.NDI_CLIENT_SECRET!;
const NDI_SCHEMA_NAME = process.env.NDI_SCHEMA_NAME!;



// Function to get Access Token
async function getAccessToken(): Promise<string> {
  const response = await axios.post(
    NDI_AUTH_URL,
    {
      client_id: NDI_CLIENT_ID,
      client_secret: NDI_CLIENT_SECRET,
      grant_type: "client_credentials",
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data.access_token;
}

// Function to Create Proof Request
async function createProofRequest(token: string) {
  const response = await axios.post(
    NDI_PROOF_REQUEST_URL,
    {
      proofName: "Verify Foundational ID",
      proofAttributes: [
        {
          name: "ID Number",
          restrictions: [{ schema_name: NDI_SCHEMA_NAME }],
        },
        {
          name: "Full Name",
          restrictions: [{ schema_name: NDI_SCHEMA_NAME }],
        },
      ],
    },
    {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    }
  );

  return response.data.data;
}
const proofResults: Record<string, { ndiSuccess: boolean; proofData: any }> = {};
// Function to Subscribe to NATS
async function subscribeToNATS(threadId: string) {
    const nc = await connect({
      servers: [NDI_NATS_URL],
      authenticator: nkeyAuthenticator(new TextEncoder().encode(NDI_NATS_SEED)),
    });
  
    const sc = StringCodec();
    const sub = nc.subscribe(threadId);
  
    for await (const msg of sub) {
      const data = JSON.parse(sc.decode(msg.data));
  
      if (data.data.type === "present-proof/presentation-result") {
        const idNumber = data.data.requested_presentation.revealed_attrs["ID Number"][0].value;
        const fullName = data.data.requested_presentation.revealed_attrs["Full Name"][0].value;
  

        proofResults[threadId] = { ndiSuccess: true, proofData: { idNumber, fullName } };
  
        await nc.close();
      }
    }
  }


// API Route Handler
export async function POST(req: NextRequest) {
    try {
      const token = await getAccessToken();
      const proofRequest = await createProofRequest(token);
  
      // Start listening for proof verification, but do NOT wait for it.
      subscribeToNATS(proofRequest.proofRequestThreadId);
  
      return NextResponse.json({ message: "Proof request sent", proofRequest });
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
  }


  export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const threadId = searchParams.get("threadId");
  
    if (!threadId) {
      return NextResponse.json({ error: "Missing threadId" }, { status: 400 });
    }
  
    if (proofResults[threadId]) {
      return NextResponse.json(proofResults[threadId]);
    } else {
      return NextResponse.json({ ndiSuccess: false });
    }
  }