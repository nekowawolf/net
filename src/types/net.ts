export interface Net {
    _id: string;
    name: string;
    description: string;
    categories: string[];
    image_url: string;
    website?: string;
    media: {
        video_url?: string;
        screenshot_urls?: string[];
    };
    socials: {
        twitter?: string;
        instagram?: string;
        discord?: string;
        youtube?: string;
    };
    created_at?: string;
}