import Card, { CardProps } from "./Card";
import { css } from '@emotion/css';

export type CardsProps = {
    cards: CardProps[];
};

const Cards = ({ data }: { data: CardProps[] }) => {
    console.log(data)
    return (
        <div className={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2.5rem 1rem;
            margin: 1rem 0;
            grid-auto-rows: dense;

            // first card full width
            & > :first-child {
                grid-column: 1 / -1;
                
                & > [data-name="card"] {
                    &:hover {
                        transform: none;
                        background-color: transparent;
                    }
                }

                & > div > [data-name="card-header"] {
                    max-height: 50vh;
                    border-radius: 0;
                    &:after {
                        background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%);
                    }
                }
                & > div > [data-name="title"] {
                    font-size: 2.5rem;
                }
                & > div > [data-name="description"] {
                    -webkit-line-clamp: 5;
                }
            }
        `}>
            {data?.map((card) => (
                <Card key={card.id} {...card} />
            ))}
        </div>
    );
}

export default Cards;