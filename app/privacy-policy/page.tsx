import { Card, CardContent } from '@/components/ui/card';

// Fetch data from the API
async function getPrivacyPolicies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-privacy-policies`);
  if (!res.ok) {
    throw new Error('Failed to fetch privacy policies');
  }
  return res.json();
}

export default async function PrivacyPolicy() {
  // Fetch data
  const policies = await getPrivacyPolicies();

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <Card className="w-full">
        <CardContent>
          {policies.map((policy) => (
            <section key={policy.id} title={policy.title}>
              <h2 className="py-4 text-lg font-bold">{policy.title}</h2>
              {/* Render HTML content directly */}
              <div dangerouslySetInnerHTML={{ __html: policy.content }} />
            </section>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
