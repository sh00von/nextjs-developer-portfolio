import { permanentRedirect } from "next/navigation";

/**
 * The academic home was merged into the single home at `/`.
 * Old `/academic` links land here and are sent home, like `/dev`.
 */
export default function AcademicPage() {
  permanentRedirect("/");
}
