import type { Metadata } from "next";
import { EtsyFeeSalePage } from "@/components/EtsyFeeSalePage";
import { buildEtsyFeeSaleMetadata } from "@/lib/etsyFeeSalePages";

export async function generateMetadata(): Promise<Metadata> {
  return buildEtsyFeeSaleMetadata(500);
}

export default function Page() {
  return <EtsyFeeSalePage amount={500} />;
}
