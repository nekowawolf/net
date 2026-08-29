import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { nwwNetMetadata } from "@/constants/metadataTemplates";
import { fetchNetData } from "@/services/netService";
import DetailClient from "./DetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const resourcesData = await fetchNetData();
  const resource = resourcesData.find((t) => t._id.toString() === resolvedParams.id);
  if (!resource) return nwwNetMetadata("Not Found", "Resource not found");
  return nwwNetMetadata(resource.name, resource.description);
}

export default function ResourceDetails() {
  return (
    <>
      <Header />
      <DetailClient />
      <Footer />
    </>
  );
}