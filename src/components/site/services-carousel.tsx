"use client";

import { Carousel, Card } from "@/components/ui/specials-linear-carousel";
import { SITE_IMAGE_DEFAULTS, type SiteImages } from "@/lib/site-images";

const services = [
  {
    imageKey: "service_pengajian",
    category: "Lectures",
    title: "Pengajian",
    text: "Regular Islamic lectures in Bahasa Indonesia and English, with speakers from our own community and visiting scholars.",
  },
  {
    imageKey: "service_tpq",
    category: "Kids education",
    title: "Quran classes (TPQ)",
    text: "Weekend Quran and Islamic studies classes for children, taught by volunteers who know our kids by name.",
  },
  {
    imageKey: "service_nikah",
    category: "Nikah services",
    title: "Marriage celebrant",
    text: "A registered Muslim celebrant for nikah ceremonies, recognised under New Zealand law.",
  },
  {
    imageKey: "service_charity",
    category: "Charity",
    title: "Dompet Dhuafa",
    text: "Collecting and distributing sadaqah and zakat to families in need, here in Aotearoa and back home in Indonesia.",
  },
];

export function ServicesCarousel({ images }: { images?: SiteImages }) {
  const src = (key: string) => images?.[key] ?? SITE_IMAGE_DEFAULTS[key];

  return (
    <Carousel
      autoplay
      autoplaySpeed={0.4}
      items={services.map((service, index) => (
        <Card
          key={service.title}
          index={index}
          card={{
            src: src(service.imageKey),
            category: service.category,
            title: service.title,
            content: <p>{service.text}</p>,
          }}
        />
      ))}
    />
  );
}
