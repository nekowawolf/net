import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { nwwNetMetadata } from "@/constants/metadataTemplates";
import DetailClient from "./DetailClient";

export const metadata = nwwNetMetadata("Activity", "Latest additions, supporters, and project commits.");

export default function ActivityPage() {
  return (
    <>
      <Header />
      <DetailClient />
      <Footer />
    </>
  );
}