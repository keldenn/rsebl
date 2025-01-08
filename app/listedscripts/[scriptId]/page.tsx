'use client'

import { useParams } from 'next/navigation';

export default function ScriptPage() {
  const { scriptId } = useParams(); // This gets the dynamic route parameter

  return (
    <div>
      <h1>Script ID: {scriptId}</h1>
      <p>Details for script ID {scriptId} will go here.</p>
    </div>
  );
}
