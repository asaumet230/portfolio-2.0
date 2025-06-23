import { Card } from ".";

import { cardsData } from "@/helpers"

export const CardsGrid = () => {

    return (
        <div className='grid grid-cols-1 w-9/12 mx-auto sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr'>
            {
                cardsData.map((card) => <Card key={card.alt} {...card} />)
            }
        </div>
    )
}

export default CardsGrid;