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
            grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
            gap: 2.5rem 0rem;
            margin: 1rem 0;
            grid-auto-rows: dense;
            width: 100%;
            padding: 0;

            // first card full width
            & > :first-child {
                grid-column: 1 / -1;
                
                & [data-name="card"] {
                    width: 100%;
                    &:hover {
                        transform: none;
                        background-color: transparent;
                    }
                }

                & [data-name="card-header"] {
                    height: 50vh;
                    border-radius: 0;
                    &:after {
                        background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%);
                    }
                }

                & [data-name="title"] {
                    font-size: 2.5rem;
                }

                & [data-name="popup"] {
                    display: none;
                }
                
                & [data-name="description"] {
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