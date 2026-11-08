import { HomePage } from "@/components/HomePage";
import { getHomeMetadata } from "@/lib/homeVariants";

export const metadata = getHomeMetadata();

export default function Page() {
  return <HomePage />;
}
