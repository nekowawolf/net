import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import { nwwNetMetadata } from "@/constants/metadataTemplates";

export const metadata = nwwNetMetadata("Home", "Welcome to Nww Net");

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-24">
        <Hero />
      </main>
      <Footer />
    </>
  );
}