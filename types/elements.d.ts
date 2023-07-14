
export type TitleElementProps = {
    text: string,
    f_size: number,
    f_weight: number,
}

export type PaginationElementProps = {
    page: number,
    setPage: (page: number) => void,
    lastPage: number,
    setQuery: (query: any) => void,
    list: ({ page, perPage }) => void,
    perPage: number,
}

export type CardProps = {
    id: number;
    title: {
        romaji: string;
        english: string;
        native: string;
    };
    description: string;
    coverImage: {
        large: string;
        extraLarge: string;
        medium: string;
        color: string;
    };
    startDate: {
        year: number;
        month: number;
        day: number;
    };
    endDate: {
        year: number;
        month: number;
        day: number;
    };
    episodes: number;
    duration: number;
    genres: string[];
    averageScore: number;
    meanScore: number;
    popularity: number;
    favourites: number;
    reviews: {
        nodes: {
            id: number;
            summary: string;
            body: string;
            rating: number;
            ratingAmount: number;
        }[];
    };
};