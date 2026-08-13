import Script from "next/script";
import { Footer, Navigation } from "@/components/SiteChrome";
import {
  AchievementsSection,
  ContactSection,
  FeaturedSection,
  GallerySection,
  HeroSection,
  PoldersPromoSection,
  PublicationsSection,
  SimpleListSection,
  SkillsSection,
} from "@/components/HomeSections";
import { getProfileJsonLd, homeVariantData, resolveFromVariant, type HomePath, type HomeVariant } from "@/lib/homeVariants";

type HomeSectionKey =
  | "poldersDataset"
  | "education"
  | "publications"
  | "experience"
  | "volunteers"
  | "certifications"
  | "achievements"
  | "securityDisclosures"
  | "pressCoverage"
  | "featured"
  | "skills"
  | "gallery"
  | "contact";

const sectionOrder: Record<HomeVariant, HomeSectionKey[]> = {
  dev: [
    "poldersDataset",
    "experience",
    "securityDisclosures",
    "pressCoverage",
    "skills",
    "certifications",
    "achievements",
    "volunteers",
    "education",
    "gallery",
    "contact",
  ],
  academic: [
    "poldersDataset",
    "education",
    "publications",
    "securityDisclosures",
    "pressCoverage",
    "skills",
    "certifications",
    "achievements",
    "volunteers",
    "gallery",
    "contact",
  ],
};

export function HomePage({ variant, homePath }: { variant: HomeVariant; homePath: HomePath }) {
  const jsonLd = getProfileJsonLd(variant, homePath);
  const homeData = homeVariantData[variant];
  const fromVariant = resolveFromVariant(homePath);

  const renderSection = (section: HomeSectionKey) => {
    switch (section) {
      case "poldersDataset":
        return <PoldersPromoSection key={section} />;
      case "education":
        return homeData.education.length ? (
          <SimpleListSection key={section} id="education" title="Education" items={homeData.education} />
        ) : null;
      case "publications":
        return homeData.publications.length ? (
          <PublicationsSection key={section} variant={variant} items={homeData.publications} />
        ) : null;
      case "experience":
        return homeData.experience.length ? (
          <SimpleListSection key={section} id="experience" title="Work Experience" items={homeData.experience} />
        ) : null;
      case "volunteers":
        return homeData.volunteers.length ? (
          <SimpleListSection
            key={section}
            id="volunteer-experience"
            title="Volunteer Experience"
            items={homeData.volunteers}
          />
        ) : null;
      case "certifications":
        return homeData.certifications.length ? (
          <SimpleListSection
            key={section}
            id="certifications"
            title="Certifications"
            items={homeData.certifications}
          />
        ) : null;
      case "achievements":
        return homeData.achievements.length ? <AchievementsSection key={section} items={homeData.achievements} /> : null;
      case "securityDisclosures":
        return homeData.securityDisclosures.length ? (
          <FeaturedSection
            key={section}
            id="security-disclosures"
            title="Security Advisories & Disclosures"
            description="Responsible vulnerability disclosures, CVE advisories, and official vendor changelog credits."
            items={homeData.securityDisclosures}
          />
        ) : null;
      case "pressCoverage":
        return homeData.pressCoverage.length ? (
          <FeaturedSection
            key={section}
            id="featured"
            title="Featured In"
            description="Press coverage and external mentions of work I've contributed to."
            items={homeData.pressCoverage}
          />
        ) : null;
      case "featured":
        return homeData.featured.length ? <FeaturedSection key={section} items={homeData.featured} /> : null;
      case "skills":
        return homeData.skills.length ? <SkillsSection key={section} variant={variant} items={homeData.skills} /> : null;
      case "gallery":
        return homeData.gallery.length ? <GallerySection key={section} items={homeData.gallery} /> : null;
      case "contact":
        return <ContactSection key={section} variant={variant} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Script
        id={`profile-json-ld-${variant}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation homePath={homePath} fromVariant={fromVariant} />
      <main id="main-content" className="mx-auto w-full max-w-2xl flex-grow px-4 pb-20 lg:max-w-[60vw]">
        <HeroSection variant={variant} />
        {sectionOrder[variant].map(renderSection)}
      </main>
      <Footer homePath={homePath} />
    </div>
  );
}
