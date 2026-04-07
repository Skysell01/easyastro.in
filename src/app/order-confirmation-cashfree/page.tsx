import { Suspense } from "react";
import OrderConfirmationClient from "./OrderConfirmationClient";

export const dynamic = "force-dynamic"; // ← ADD THIS

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationClient />
    </Suspense>
  );
}