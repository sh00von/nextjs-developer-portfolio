import Script from "next/script";
import { Fragment } from "react";
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
import { getProfileJsonLd, homeVariantData, resolveFromVariant, type HomePath, type HomeVariant } from "@/lib/homeVariants";
import { PluginLogoMarquee } from "@/components/PluginLogoMarquee";

type HomeSectionKey =
  | "spotlight"
  | "work"
  | "experience"
  | "publications"
  | "security"
  | "press"
  | "skills"
  | "recognition"
  | "community"
  | "gallery"
  | "contact";

const sectionOrder: Record<HomeVariant, HomeSectionKey[]> = {
  dev: ["spotlight", "work", "experience", "security", "skills", "press", "recognition", "community", "gallery", "contact"],
  academic: ["spotlight", "publications", "work", "security", "skills", "community", "recognition", "press", "gallery", "contact"],
};

export function HomePage({ variant, homePath }: { variant: HomeVariant; homePath: HomePath }) {
  const jsonLd = getProfileJsonLd(variant, homePath);
  const homeData = homeVariantData[variant];
  const fromVariant = resolveFromVariant(homePath);

  const renderSection = (section: HomeSectionKey) => {
    switch (section) {
      case "spotlight":
        return <SpotlightSection key={section} variant={variant} />;
      case "work":
        return <SelectedWorkSection key={section} variant={variant} />;
      case "experience":
        return homeData.experience.length ? (
          <TimelineSection key={section} id="experience" title="Experience" items={homeData.experience} />
        ) : null;
      case "publications":
        return homeData.publications.length ? (
          <PublicationsSection key={section} variant={variant} items={homeData.publications} />
        ) : null;
      case "security":
        return homeData.securityDisclosures.length ? (
          <Fragment key={section}>
            <SecuritySection items={homeData.securityDisclosures} />
            <PluginLogoMarquee />
          </Fragment>
        ) : null;
      case "press":
        return homeData.pressCoverage.length ? <PressSection key={section} items={homeData.pressCoverage} /> : null;
      case "skills":
        return homeData.skills.length ? <SkillsSection key={section} variant={variant} items={homeData.skills} /> : null;
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
        return <ContactSection key={section} variant={variant} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Script
        id={`profile-json-ld-${variant}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation homePath={homePath} fromVariant={fromVariant} />
      <main id="main-content" className="container-wide flex-grow overflow-x-clip pb-16">
        <HeroSection variant={variant} />
        {sectionOrder[variant].map(renderSection)}
      </main>
      <Footer homePath={homePath} />
    </div>
  );
}
