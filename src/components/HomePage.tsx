import Script from "next/script";
import { Footer, Navigation } from "@/components/SiteChrome";
import {
  CommunitySection,
  ContactSection,
  GallerySection,
  HeroSection,
  PressSection,
  PublicationsSection,
  RecognitionSection,
  SecuritySection,
  SelectedWorkSection,
  SkillsSection,
  SpotlightSection,
  TimelineSection,
} from "@/components/HomeSections";
import { getProfileJsonLd, homeData } from "@/lib/homeVariants";
import { PluginLogoMarquee } from "@/components/PluginLogoMarquee";

type HomeSectionKey =
  | "spotlight"
  | "work"
  | "publications"
  | "experience"
  | "security"
  | "skills"
  | "press"
  | "recognition"
  | "community"
  | "gallery"
  | "contact";

const sectionOrder: HomeSectionKey[] = [
  "spotlight",
  "work",
  "publications",
  "experience",
  "security",
  "skills",
  "community",
  "recognition",
  "press",
  "gallery",
  "contact",
];

export function HomePage() {
  const jsonLd = getProfileJsonLd();

  const renderSection = (section: HomeSectionKey) => {
    switch (section) {
      case "spotlight":
        return <SpotlightSection key={section} />;
      case "work":
        return <SelectedWorkSection key={section} />;
      case "experience":
        return homeData.experience.length ? (
          <TimelineSection key={section} id="experience" title="Experience" items={homeData.experience} />
        ) : null;
      case "publications":
        return homeData.publications.length ? (
          <PublicationsSection key={section} items={homeData.publications} />
        ) : null;
      case "security":
        return homeData.securityDisclosures.length ? (
          <SecuritySection key={section} items={homeData.securityDisclosures} />
        ) : null;
      case "press":
        return homeData.pressCoverage.length ? <PressSection key={section} items={homeData.pressCoverage} /> : null;
      case "skills":
        return homeData.skills.length ? <SkillsSection key={section} items={homeData.skills} /> : null;
      case "recognition":
        return (
          <RecognitionSection
            key={section}
            achievements={homeData.achievements}
            certifications={homeData.certifications}
          />
        );
      case "community":
        return <CommunitySection key={section} volunteers={homeData.volunteers} education={homeData.education} />;
      case "gallery":
        return homeData.gallery.length ? <GallerySection key={section} items={homeData.gallery} /> : null;
      case "contact":
        return <ContactSection key={section} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id="profile-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main id="main-content" className="container-wide flex-grow overflow-x-clip pb-16">
        <HeroSection />
        <PluginLogoMarquee />
        {sectionOrder.map(renderSection)}
      </main>
      <Footer />
    </div>
  );
}
