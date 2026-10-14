import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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