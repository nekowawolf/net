import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { nwwNetMetadata } from '@/constants/metadataTemplates';
import AddNetClient from './AddNetClient';

export const metadata = nwwNetMetadata('Add Net', 'Submit a useful website or web resource to the directory.');

export default function AddNetPage() {
    return (
        <>
            <Header />
            <AddNetClient />
            <Footer />
        </>
    );
}