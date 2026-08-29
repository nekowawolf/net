import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NetContent from "./NetContent";
import { nwwNetMetadata } from "@/constants/metadataTemplates";

export const metadata = nwwNetMetadata("Directory", "Web Resources Directory");

export default function DirectoryPage() {
  return (
    <>
      <Header />
      <main className="flex-grow pt-24">
        <NetContent />
      </main>
      <Footer />
    </>
  );
}