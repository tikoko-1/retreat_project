import {
  Star
} from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function DynamicIcon({
  iconName,
  className,
}: {
  iconName: string;
  className?: string;
}) {
  const pascalCaseName = iconName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  const IconComponent = (LucideIcons as any)[pascalCaseName];
  if (!IconComponent) {
    return <Star className={className} />;
  }
  return <IconComponent className={className} />;
}