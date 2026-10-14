import { HomePage } from "@/components/HomePage";
import { getHomeMetadata } from "@/lib/homeVariants";

export const metadata = getHomeMetadata("dev", "/");

export default function Page() {
  return <HomePage variant="dev" homePath="/" />;
}
