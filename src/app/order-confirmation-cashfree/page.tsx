import { Suspense } from "react";
import OrderConfirmationClient from "./OrderConfirmationClient";
import { Loader2 } from "lucide-react";

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
          <p className="text-gray-600">Loading...</p>
        </div>
      }
    >
      <OrderConfirmationClient />
    </Suspense>
  );
}