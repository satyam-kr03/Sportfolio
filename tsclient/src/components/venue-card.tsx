import { Card } from "@/components/ui/card";

export function VenueCard({ name, address }) {
  return (
    <Card className="w-full max-w-sm p-6 bg-card text-card-foreground shadow-sm rounded-lg">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{address}</p>
      </div>
    </Card>
  );
}
