import './card.item.css'

type CardItemProps = {
    other?: string
    background__img: string
    title: string
    date: string
}

export const CardItem = (props: CardItemProps) => {
    return (
        <div className={`cards__item`} style={{ backgroundImage: props.background__img }}>
            <div className="cards__item__content">
                <div className="cards__item__content__title">{props.title}</div>
                <div className="cards__item__content__date">{props.date}</div>
            </div>
        </div>
    );
}
