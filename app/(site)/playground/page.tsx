import { redirect } from "next/navigation";
import { PLAYGROUND_EXAMPLES } from "@/site/playground";

export default function PlaygroundIndex() {
  redirect(`/playground/${PLAYGROUND_EXAMPLES[0].slug}`);
}
