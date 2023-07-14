import type { PaginationElementProps } from "@/types/elements";
import { css } from "@emotion/css";

const PaginationElement = ({ page, setPage, lastPage, setQuery, list, perPage }: PaginationElementProps) => {
  return (
    <div className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 0 auto;
        padding: 1rem 1rem;
        color: #fafafa;
      `}>
      <button className={css`
          padding: 0.5rem 1rem;
          background-color: #333;
          border: none;
          border-radius: 5px;
          color: #fafafa;
          cursor: pointer;
          margin-right: 1rem;

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `} onClick={() => {
          setPage(page - 1)
          setQuery(list({ page: page - 1, perPage }))
        }}
        disabled={page === 1}>
        Prev
      </button>
      <span className={css`
          font-size: 1rem;
          font-weight: 400;
          color: #999;
        `}>
        Page <span className={css`
            font-weight: 600;
            color: #fafafa;
          `}>{page}</span> of {lastPage}
      </span>
      <button className={css`
          padding: 0.5rem 1rem;
          background-color: #333;
          border: none;
          border-radius: 5px;
          color: #fafafa;
          cursor: pointer;
          margin-left: 1rem;

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `} onClick={() => {
          setPage(page + 1)
          setQuery(list({ page: page + 1, perPage }))
        }}
        disabled={page === lastPage}>
        Next
      </button>
    </div>
  )
}

export default PaginationElement