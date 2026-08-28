import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
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