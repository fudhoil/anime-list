
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