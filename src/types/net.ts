export interface AddedByInfo {
    name: string;
    url?: string;
}

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
        github?: string;
        youtube?: string;
    };
    added_by?: AddedByInfo;
    created_at?: string;
}

export interface NetSubmissionPayload {
    website: string;
    name: string;
    link: string;
    turnstile_token: string;
}