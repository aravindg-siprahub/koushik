import { BlessingSection } from "@/components/wedding/BlessingSection";
import { CountdownSection } from "@/components/wedding/CountdownSection";
import { CoupleSection } from "@/components/wedding/CoupleSection";
import { EventTimeline } from "@/components/wedding/EventTimeline";
import { FloatingNav } from "@/components/wedding/FloatingNav";
import { FooterSection } from "@/components/wedding/FooterSection";
import { GallerySection } from "@/components/wedding/GallerySection";
import { HeroSection } from "@/components/wedding/HeroSection";
import { InvitationMessage } from "@/components/wedding/InvitationMessage";
import { VenueSection } from "@/components/wedding/VenueSection";
import { WeddingExperience } from "@/components/wedding/WeddingExperience";
import { getTracks } from "@/lib/tracks";

export default function Home() {
  return (
    <WeddingExperience tracks={getTracks()}>
      <FloatingNav />
      <main>
        <HeroSection />
        <BlessingSection />
        <InvitationMessage />
        <CoupleSection />
        <EventTimeline />
        <CountdownSection />
        <GallerySection />
        <VenueSection />
      </main>
      <FooterSection />
    </WeddingExperience>
  );
}
