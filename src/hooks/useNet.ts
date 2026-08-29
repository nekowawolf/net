import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Net } from '@/types/net';
import { fetchNetData } from '@/services/netService';

let isInitialLoad = true;

export const useNet = (itemsPerPage: number = 8) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [resourcesData, setResourcesData] = useState<Net[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const [localSearchQuery, setLocalSearchQuery] = useState(searchParams.get('q') || '');
    const [localCategory, setLocalCategory] = useState(searchParams.get('category') || 'All');
    const [localPage, setLocalPage] = useState(Number(searchParams.get('page')) || 1);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                
                let forceShuffle = false;
                if (isInitialLoad) {
                    isInitialLoad = false;
                    const urlParams = new URLSearchParams(window.location.search);
                    const page = Number(urlParams.get('page')) || 1;
                    if (page === 1) {
                        forceShuffle = true;
                    }
                }
                
                const data = await fetchNetData(forceShuffle);
                setResourcesData(data);
            } catch (err) {
                setError('Failed to fetch net data');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            const currentQ = searchParams.get('q') || '';
            if (localSearchQuery !== currentQ) {
                const params = new URLSearchParams(window.location.search);
                if (localSearchQuery) params.set('q', localSearchQuery);
                else params.delete('q');
                params.set('page', '1');
                
                const queryString = params.toString();
                const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
                window.history.pushState(null, '', newUrl);
            }
        }, 300);
        return () => clearTimeout(handler);
    }, [localSearchQuery, pathname, searchParams]);

    const updateURL = (newCategory: string, newQuery: string, newPage: number) => {
        const params = new URLSearchParams();
        if (newCategory !== 'All') params.set('category', newCategory);
        if (newQuery) params.set('q', newQuery);
        if (newPage > 1) params.set('page', newPage.toString());
        
        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
        window.history.pushState(null, '', newUrl);
    };

    const handleCategoryChange = (category: string) => {
        setLocalCategory(category);
        setLocalPage(1);
        updateURL(category, localSearchQuery, 1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchQuery(e.target.value);
        setLocalPage(1);
    };

    const handlePageChange = (page: number) => {
        setLocalPage(page);
        updateURL(localCategory, localSearchQuery, page);
    };

    const filteredResources = useMemo(() => {
        return resourcesData.filter(resource => {
            const matchesSearch = resource.name.toLowerCase().includes(localSearchQuery.toLowerCase());
            const matchesCategory = localCategory === 'All' || (resource.categories && resource.categories.includes(localCategory));
            return matchesSearch && matchesCategory;
        });
    }, [resourcesData, localSearchQuery, localCategory]);

    useEffect(() => {
        const currentQ = searchParams.get('q') || '';
        const currentCat = searchParams.get('category') || 'All';
        const currentPg = Number(searchParams.get('page')) || 1;
        
        setLocalSearchQuery(currentQ);
        setLocalCategory(currentCat);
        setLocalPage(currentPg);
    }, [searchParams.get('q'), searchParams.get('category'), searchParams.get('page')]);

    const totalItems = filteredResources.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const validCurrentPage = Math.min(Math.max(1, localPage), totalPages);

    const displayedResources = useMemo(() => {
        const startIndex = (validCurrentPage - 1) * itemsPerPage;
        return filteredResources.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredResources, validCurrentPage, itemsPerPage]);

    const handleClearSearch = () => {
        setLocalSearchQuery('');
        setLocalPage(1);
    };

    return {
        displayedResources,
        loading,
        error,
        localSearchQuery,
        handleSearchChange,
        handleClearSearch,
        activeCategory: localCategory,
        handleCategoryChange,
        currentPage: validCurrentPage,
        handlePageChange,
        totalPages,
        totalItems
    };
}