import Card from "./Card"

export const CardsGrid = () => {

    return (
        <div className='tools-card-container grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4'>
            <Card />
        </div>
    )
}

export default CardsGrid