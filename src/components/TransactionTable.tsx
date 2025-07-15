import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function TransactionsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mb-2">
          <div>Hash</div>
          <div>Type</div>
          <div>Age</div>
        </div>
        {/* Map actual transactions here */}
      </CardContent>
    </Card>
  );
}
