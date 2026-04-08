import { Suspense } from "react";
import OrderConfirmationTesting from "./ordertesting";

export const dynamic = "force-dynamic";

export default function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { order_id?: string };
}) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
        <p className="text-gray-600">Loading...</p>
      </div>
    }>
      <OrderConfirmationClient orderId={searchParams.order_id || ""} />
    </Suspense>
  );
}