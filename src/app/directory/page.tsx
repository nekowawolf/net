import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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