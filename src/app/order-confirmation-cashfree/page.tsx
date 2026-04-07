import { Suspense } from "react";
import OrderConfirmationClient from "./OrderConfirmationClient";
import { Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { order_id?: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-amber-500" />
          <p className="text-gray-600">Loading...</p>
        </div>
      }
    >
      {/* ✅ Pass order_id as prop — no useSearchParams needed */}
      <OrderConfirmationClient orderId={searchParams.order_id || ""} />
    </Suspense>
  );
}