import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message, stream } = await req.json();

        // Forward request to FastAPI server
        const fastApiResponse = await fetch('http://127.0.0.1:8000/chat/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, stream }),
        });

        // Handle streaming response
        if (stream) {
            const { readable, writable } = new TransformStream();
            fastApiResponse.body?.pipeTo(writable);
            return new Response(readable, { headers: { 'Content-Type': 'text/event-stream' } });
        }

        // Handle regular JSON response
        const data = await fastApiResponse.json();
        return NextResponse.json({ response: data.response });

    } catch (error) {
        console.error('Error forwarding request:', error);
        return NextResponse.json({ error: 'Failed to fetch response from server' }, { status: 500 });
    }
}
