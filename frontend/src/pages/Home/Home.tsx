import {useState} from "react";
import './style/index.css';
import {CardItem} from "./components/card/card.item";
import {Carousel} from "./components/carousel/carousel";
import { translate } from "../../utils/translate/translate";

export const Home = () => {
    const [logged, setLogged] = useState(false);
    // mock of card items and content with dnd titles and dnd images
    const cards = [
        {
            background__img: 'url(...)',
            title: 'Mysterious World Adventure',
            date: 'October 23, 2024',
        },
        {
            background__img: 'url(...)',
            title: 'Journey to the Unknown',
            date: 'April 15, 2023',
        },
        {
            background__img: 'url(...)',
            title: 'Quest for the Dragon Mountain',
            date: 'June 2, 2025',
        },
        {
            background__img: 'url(...)',
            title: 'Exploring the Silent Seas',
            date: 'March 17, 2026',
        },
        {
            background__img: 'url(...)',
            title: 'Conquering Fort Ironsides',
            date: 'November 19, 2025',
        },
        {
            background__img: 'url(...)',
            title: 'The Lost City Discovery',
            date: 'May 21, 2023',
        },
        {
            background__img: 'url(...)',
            title: 'Unearthing the Desert Ruins',
            date: 'January 4, 2024',
        },
        {
            background__img: 'url(...)',
            title: 'Pursuit in the Arctic Wilderness',
            date: 'December 7, 2025',
        },
        {
            background__img: 'url(...)',
            title: 'Climbing the Perilous Peak',
            date: 'June 9, 2023',
        },
        {
            background__img: 'url(...)',
            title: 'Journey to the Center of the Earth',
            date: 'July 14, 2026',
        },
    ];

    // @ts-ignore
    return (
        <div id="app">
            <header className="header">
                <div className="wrapper">
                    <div className="header__menu">menu</div>
                    <div className="header__logo">logo</div>
                    <div className="header__profile">profile</div>
                </div>
                <div className="header__count">
                    <span className="header__count__image"></span>
                    <span className="header__count__text">00</span>
                    <span className="header__count__image"></span>
                </div>
            </header>
            <main className="main">
                <div className="wrapper">
                    <div className="icons">
                        <div className="icons__item">
                            <div className="icons__item__circle"></div>
                            <div className="icons__item__text">{translate('game.session')}</div>
                        </div>
                        <div className="icons__item">
                            <div className="icons__item__circle"></div>
                            <div className="icons__item__text">{translate('game.settings')}</div>
                        </div>
                    </div>
                    <div className="icons">
                        <div className="icons__item">
                            <div className="icons__item__circle"></div>
                            <div className="icons__item__text">{translate('game.groupchat')}</div>
                        </div>
                        <div className="icons__item justify-end">
                            <div className="icons__item__text">{translate('game.startgame')}</div>
                        </div>
                        <div className="icons__item">
                            <div className="icons__item__circle"></div>
                            <div className="icons__item__text">{translate('game.news')}</div>
                        </div>
                    </div>
                    <Carousel children={cards.map((card, index) => (
                        <CardItem key={index} background__img={card.background__img} title={card.title}
                                  date={card.date}/>
                    ))} displayedNumbers={3}/>
                </div>
            </main>
            <footer className="footer"></footer>
        </div>
    );
}
