"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import {
  ArrowUpRight,
  Bath,
  CheckCircle2,
  Hammer,
  Home,
  Lamp,
  MessageSquareText,
  PanelTop,
  Phone,
  Send,
  Sparkles,
  Tv,
} from "lucide-react";
import { FormEvent, useEffect, useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const assets = (name: string) => `${basePath}/assets/${name}`;

const businessName = "SS Kitchen and Bathroom";
const facebookUrl = "https://www.facebook.com/profile.php?id=61562137071148";
const location = "Hamilton, Waikato";
const serviceArea = "Hamilton and nearby Waikato homes";
const phoneDisplay = "021 506 700";
const phoneDigits = "021506700";
const phoneHref = `tel:${phoneDigits}`;

const services = [
  {
    icon: Home,
    title: "Kitchen renovations",
    body: "Cabinetry, benchtop planning, splashbacks, lighting and practical layouts for kitchens that need a proper upgrade.",
  },
  {
    icon: Bath,
    title: "Bathroom upgrades",
    body: "Vanities, showers, tiling, storage and fixture planning for cleaner, more usable bathroom spaces.",
  },
  {
    icon: PanelTop,
    title: "Laundry cabinetry",
    body: "Smarter storage, benches, sinks and appliance zones for laundries that need to work harder every day.",
  },
  {
    icon: Tv,
    title: "TV units and wall panels",
    body: "Custom media walls, feature panels, lighting details and built-in storage that make living areas feel finished.",
  },
];

const gallery = [
  {
    src: "kitchen-hero.png",
    title: "Kitchen planning",
    body: "Practical layouts, cabinetry, benchtops and finishing details for Hamilton home upgrades.",
  },
  {
    src: "bathroom-renovation.png",
    title: "Bathroom finishes",
    body: "Modern vanities, showers, tile work and lighting planned around daily use.",
  },
  {
    src: "laundry-cabinetry.png",
    title: "Laundry storage",
    body: "Cabinetry and bench space that make compact utility rooms easier to live with.",
  },
  {
    src: "media-wall.png",
    title: "TV and feature walls",
    body: "Built-in media units, wall panels and integrated lighting for cleaner living spaces.",
  },
  {
    src: "cabinetry-detail.png",
    title: "Cabinetry details",
    body: "A focused request helps the team understand the room, finish level, timing and next step.",
  },
];

const proof = [
  "Public business profile resolves to SS Kitchen and Bathroom in Hamilton, Waikato.",
  "Verified phone contact found publicly: 021 506 700.",
  "Services shown publicly include kitchens, bathrooms, laundry, TV units, wall panelling and lighting.",
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Page() {
  const main = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.32], [0, -54]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".gsap-rise", {
        y: 40,
        opacity: 0,
        duration: 0.78,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 72%" },
      });

      const stage = document.querySelector<HTMLElement>(".gallery-stage");
      const track = document.querySelector<HTMLElement>(".gallery-track");
      if (stage && track && window.matchMedia("(min-width: 768px)").matches) {
        const travel = () => Math.max(0, track.scrollWidth - stage.clientWidth);
        gsap.to(track, {
          x: () => -travel(),
          ease: "none",
          scrollTrigger: {
            trigger: ".gallery-pin",
            start: "top top",
            end: () => `+=${travel() + 620}`,
            scrub: 0.75,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, main);
    return () => ctx.revert();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      "SS Kitchen and Bathroom enquiry",
      "",
      `Name: ${data.get("name") || ""}`,
      `Best contact: ${data.get("contact") || ""}`,
      `Suburb / area: ${data.get("location") || ""}`,
      `Project type: ${data.get("service") || ""}`,
      `Timing: ${data.get("timing") || ""}`,
      `Details: ${data.get("details") || ""}`,
    ];
    const message = lines.join("\n");
    void navigator.clipboard?.writeText(message);
    window.location.href = `sms:${phoneDigits}?&body=${encodeURIComponent(message)}`;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: businessName,
    image: assets("kitchen-hero.png"),
    url: "https://deanooooooooo.github.io/ss-kitchen-bathroom-hamilton/",
    telephone: phoneDisplay,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hamilton",
      addressRegion: "Waikato",
      addressCountry: "NZ",
    },
    areaServed: ["Hamilton", "Waikato"],
    sameAs: [facebookUrl],
  };

  return (
    <main ref={main} className="min-h-screen overflow-hidden text-[#1b1a17]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/12 bg-[#181713]/92 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#d7b56d] text-[#181713] shadow-sm">
              <Hammer size={25} />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-base font-black uppercase">SS Kitchen &amp; Bathroom</span>
              <span className="text-sm font-bold text-white/68">Hamilton renovation work</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-base font-black text-white/86 md:flex">
            <a className="hover:text-white" href="#services">Services</a>
            <a className="hover:text-white" href="#gallery">Gallery</a>
            <a className="hover:text-white" href="#contact">Contact</a>
          </nav>
          <a href={phoneHref}>
            <Button className="min-h-11 rounded-lg bg-[#d7b56d] px-4 text-[#181713] hover:bg-white">
              <Phone size={17} /> <span className="hidden sm:inline">Call {phoneDisplay}</span><span className="sm:hidden">Call</span>
            </Button>
          </a>
        </div>
      </header>

      <section id="top" className="hero-clip relative min-h-[1060px] bg-[#181713] pt-24 text-white md:min-h-[880px]">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image src={assets("kitchen-hero.png")} alt="Modern kitchen renovation with custom cabinetry and stone benchtop" fill priority className="object-cover opacity-88" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#181713] via-[#181713]/86 to-[#181713]/34" />
        <div className="room-vignette absolute inset-0" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pb-28 pt-16 sm:px-6 md:grid-cols-[1.02fr_0.98fr] md:items-center md:pt-24">
          <div>
            <div className="max-w-4xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/18 bg-black/58 px-4 py-2 text-xs font-black uppercase tracking-normal text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] backdrop-blur">
                <Sparkles size={16} /> Kitchen, bathroom and cabinetry work in {location}
              </p>
              <h1 className="max-w-4xl text-[clamp(2.75rem,5.45vw,5.55rem)] font-black leading-[0.97]">
                Renovation details that make the room feel properly finished.
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-white/80">
                SS Kitchen and Bathroom helps Hamilton homeowners plan kitchens, bathrooms, laundries, wall panels, media units and lighting details with one clear enquiry.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={phoneHref}>
                  <Button className="rounded-lg bg-[#d7b56d] text-[#181713] hover:bg-white">
                    <Phone size={18} /> Call {phoneDisplay}
                  </Button>
                </a>
                <a href="#contact">
                  <Button variant="secondary" className="rounded-lg border-white/18 bg-white/10 text-white hover:bg-white/18">
                    <MessageSquareText size={18} /> Start an enquiry
                  </Button>
                </a>
                <a href="#gallery">
                  <Button variant="secondary" className="rounded-lg border-white/18 bg-white/10 text-white hover:bg-white/18">
                    View services <ArrowUpRight size={18} />
                  </Button>
                </a>
              </div>
              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {["Kitchens", "Bathrooms", "Wall panels"].map((item) => (
                  <span key={item} className="rounded-lg border border-white/14 bg-black/34 px-4 py-3 text-sm font-black text-white/84 backdrop-blur">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <aside className="rounded-2xl border border-white/14 bg-[#181713]/90 p-5 shadow-[0_32px_110px_rgba(0,0,0,0.48)] backdrop-blur-2xl">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase text-[#d7b56d]">Project enquiry</p>
                  <h2 className="mt-1 text-3xl font-black leading-tight">Send the room details before you call.</h2>
                </div>
                <MessageSquareText className="text-[#d7b56d]" size={30} />
              </div>
              <form onSubmit={handleSubmit} className="grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-black text-white/78">Name<input className="min-h-12 rounded-lg border border-white/12 bg-white px-3 text-base font-bold text-[#1b1a17] outline-none ring-[#d7b56d]/45 transition placeholder:text-[#1b1a17]/42 focus:ring-4" name="name" placeholder="Your name" required /></label>
                  <label className="grid gap-1.5 text-sm font-black text-white/78">Best contact<input className="min-h-12 rounded-lg border border-white/12 bg-white px-3 text-base font-bold text-[#1b1a17] outline-none ring-[#d7b56d]/45 transition placeholder:text-[#1b1a17]/42 focus:ring-4" name="contact" placeholder="Phone or email" required /></label>
                </div>
                <label className="grid gap-1.5 text-sm font-black text-white/78">Suburb / area<input className="min-h-12 rounded-lg border border-white/12 bg-white px-3 text-base font-bold text-[#1b1a17] outline-none ring-[#d7b56d]/45 transition placeholder:text-[#1b1a17]/42 focus:ring-4" name="location" placeholder="Hamilton suburb or Waikato area" /></label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-black text-white/78">Project type<select className="min-h-12 rounded-lg border border-white/12 bg-white px-3 text-base font-bold text-[#1b1a17] outline-none ring-[#d7b56d]/45 transition focus:ring-4" name="service" defaultValue="Kitchen renovation"><option>Kitchen renovation</option><option>Bathroom renovation</option><option>Laundry cabinetry</option><option>TV unit or media wall</option><option>Wall panels</option><option>Lighting details</option><option>Multiple rooms</option></select></label>
                  <label className="grid gap-1.5 text-sm font-black text-white/78">Timing<input className="min-h-12 rounded-lg border border-white/12 bg-white px-3 text-base font-bold text-[#1b1a17] outline-none ring-[#d7b56d]/45 transition placeholder:text-[#1b1a17]/42 focus:ring-4" name="timing" placeholder="Planning, soon, urgent..." /></label>
                </div>
                <label className="grid gap-1.5 text-sm font-black text-white/78">Details<textarea className="min-h-28 rounded-lg border border-white/12 bg-white px-3 py-3 text-base font-bold text-[#1b1a17] outline-none ring-[#d7b56d]/45 transition placeholder:text-[#1b1a17]/42 focus:ring-4" name="details" placeholder="Tell them the room, rough scope, finish ideas and anything already measured." required /></label>
                <Button className="min-h-13 rounded-lg bg-[#d7b56d] text-base font-black text-[#181713] hover:bg-white">
                  <Send size={18} /> Copy details and text SS
                </Button>
                <p className="text-sm font-semibold leading-6 text-white/62">This copies your enquiry and opens a text to {phoneDisplay}. No email is used because no public email was verified.</p>
              </form>
            </aside>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f4efe5] px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-black uppercase text-[#8a6726]">Interior renovation services</p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">The rooms where finish, storage and layout matter most.</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-[#1b1a17]/68">
              The site keeps the enquiry focused: what room needs work, what type of finish is wanted, where the home is and how soon the owner wants to talk.
            </p>
          </Reveal>
          <div className="services-grid mt-12 grid gap-5 md:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title} className="gsap-rise rounded-lg border-0 bg-white shadow-premium">
                <CardContent className="p-6">
                  <service.icon className="mb-7 text-[#8a6726]" size={34} />
                  <h3 className="text-2xl font-black">{service.title}</h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-[#1b1a17]/64">{service.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-pin bg-[#181713] px-4 py-24 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase text-[#d7b56d]">Service visuals</p>
              <h2 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">A polished route into the job types SS publicly offers.</h2>
            </div>
            <a href="#contact">
              <Button variant="secondary" className="rounded-lg bg-white text-[#181713] hover:bg-[#d7b56d]">
                Request a call <ArrowUpRight size={18} />
              </Button>
            </a>
          </Reveal>
          <div className="gallery-stage mt-12 overflow-hidden">
            <div className="gallery-track flex flex-col gap-5 md:w-max md:flex-row md:gap-6">
              {gallery.map((item) => (
                <article key={item.src} className="group relative min-h-[420px] overflow-hidden rounded-lg bg-white text-white shadow-[0_26px_80px_rgba(0,0,0,0.32)] md:h-[590px] md:w-[430px]">
                  <Image src={assets(item.src)} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181713]/92 via-[#181713]/20 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-3xl font-black">{item.title}</h3>
                    <p className="mt-3 max-w-sm text-base font-semibold leading-7 text-white/78">{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="proof" className="bg-white px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.92fr_1.08fr] md:items-center">
          <Reveal>
            <div className="relative min-h-[560px] overflow-hidden rounded-lg bg-[#181713] shadow-premium">
              <Image src={assets("cabinetry-detail.png")} alt="Cabinetry and benchtop detail in a finished renovation" fill className="object-cover opacity-92" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181713]/82 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-sm font-black uppercase text-[#d7b56d]">Hamilton renovation enquiries</p>
                <h2 className="mt-2 text-4xl font-black">A focused enquiry gives the team the room, scope and timing up front.</h2>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase text-[#8a6726]">Verified details</p>
              <h2 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">Built around what could be verified publicly.</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-[#1b1a17]/68">
                No invented testimonials, awards, email address or street address. The site uses the public phone route and keeps service claims to the visible business profile.
              </p>
              <div className="mt-8 grid gap-4">
                {proof.map((item) => (
                  <div key={item} className="flex gap-3 rounded-lg border border-[#1b1a17]/10 bg-[#f4efe5] p-4">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#8a6726]" size={22} />
                    <p className="font-bold leading-7 text-[#1b1a17]/72">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="bg-[#ede3d1] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
              <div>
                <p className="text-sm font-black uppercase text-[#8a6726]">Contact</p>
                <h2 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">Ask SS Kitchen and Bathroom about a Hamilton home project.</h2>
              </div>
              <div className="grid gap-3">
                <a className="flex items-center justify-between gap-4 rounded-lg bg-white p-5 font-black shadow-premium" href={phoneHref}>
                  <span className="flex items-center gap-3"><Phone className="text-[#8a6726]" size={24} /> Call {phoneDisplay}</span>
                  <ArrowUpRight size={22} />
                </a>
                <a className="flex items-center justify-between gap-4 rounded-lg bg-white p-5 font-black shadow-premium" href={`sms:${phoneDigits}`}>
                  <span className="flex items-center gap-3"><MessageSquareText className="text-[#8a6726]" size={24} /> Text a project enquiry</span>
                  <ArrowUpRight size={22} />
                </a>
                <a className="flex items-center justify-between gap-4 rounded-lg bg-white p-5 font-black shadow-premium" href={facebookUrl}>
                  <span className="flex items-center gap-3"><Lamp className="text-[#8a6726]" size={24} /> View Facebook profile</span>
                  <ArrowUpRight size={22} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#181713] px-4 py-10 text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-[#d7b56d] text-[#181713]">
              <Hammer size={24} />
            </span>
            <div>
              <p className="text-lg font-black">{businessName}</p>
              <p className="text-sm font-semibold text-white/58">{location} · Kitchens, bathrooms, cabinetry and panels</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a aria-label="Call SS Kitchen and Bathroom" className="grid h-11 w-11 place-items-center rounded-lg bg-white/10 text-white hover:bg-[#d7b56d] hover:text-[#181713]" href={phoneHref}>
              <Phone size={20} />
            </a>
            <a aria-label="Back to enquiry form" className="grid h-11 w-11 place-items-center rounded-lg bg-white/10 text-white hover:bg-[#d7b56d] hover:text-[#181713]" href="#contact">
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
