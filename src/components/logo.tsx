import Image from "next/image";
import { cn } from "@/lib/utils";
import LogoImage from "@/assets/Logo.png";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src={LogoImage}
        alt="KODEGAS Logo"
        width={40}
        height={40}
        className="w-10 h-10 object-contain"
        priority
      />
      <span className="font-headline text-2xl font-bold tracking-tighter">
        KODEGAS
      </span>
    </div>
  );
}
