import { Button } from "./ui/button";
import HostPortalCTA from "./HostPortalCTA";

interface CallToActionSectionProps {
  onNavigateToHostPortal?: () => void;
}

export default function CallToActionSection({ onNavigateToHostPortal }: CallToActionSectionProps) {
  return (
    <>
      <HostPortalCTA onNavigateToHostPortal={onNavigateToHostPortal} />
    </>
  );
}