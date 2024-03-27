import {useEffect, useState} from "react";
import './style/index.css';
import {CardItem} from "./components/card/card.item";
import {Carousel} from "./components/carousel/carousel";
import {useTranslate} from "../../utils/translate/translate";
import Modal from "../components/modal/modal";


// mockup static data
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
const notif_number = 0;


export const Home = () => {
    const [logged, setLogged] = useState(false);
    const translate = useTranslate();
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [mainContent, setMainContent] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [openTools, setOpenTools] = useState(false);
    const closeTools = () => setOpenTools(false);

    const handleMenuClick = (content: string) => {
        const existingContent = ['parties', 'contentCreators', 'community'];
        if (existingContent.includes(content)) {
            setIsOpen(false);
            setMainContent(content);
            return;
        }
        setIsOpen(false);
        setMainContent('');
    };

    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenSize(window.innerWidth);
        });
    }, [window.innerWidth]);

    // todo idea : icons drag and drop positions and or other buttons (launch specific party, etc)
    //  add save icon positions to parameters and save into db for user when logged in

    return (
        <div id="app">
            <header className="header">
                <div className="nav">
                    <div id="menu" className="menu" style={{marginLeft: '5rem'}}>
                        {screenSize >= 1200 ?
                            <>
                                <div className={`header__menu link ${mainContent === '' ? 'active' : ''}`}
                                     onClick={() => handleMenuClick('')}>{translate('nav.home')}</div>
                                <div className={`header__menu link ${mainContent === 'parties' ? 'active' : ''}`}
                                     onClick={() => handleMenuClick('parties')}>{translate('nav.party')}</div>
                                <div
                                    className={`header__menu link ${mainContent === 'contentCreators' ? 'active' : ''}`}
                                    onClick={() => handleMenuClick('contentCreators')}>{translate('nav.contentCreators')}</div>
                                <div className={`header__menu link ${mainContent === 'tools' ? 'active' : ''}`}
                                     onClick={() => handleMenuClick('tools')}>{translate('nav.tools')}</div>
                                <div className={`header__menu link ${mainContent === 'community' ? 'active' : ''}`}
                                     onClick={() => handleMenuClick('community')}>{translate('nav.community')}</div>
                            </>
                            :
                            <>
                                <div className="dropdown">
                                    <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
                                        <span className={`icon ${isOpen ? 'open' : ''}`}>{isOpen ? 'X' : '☰'}</span>
                                    </button>
                                    {isOpen && <div className="dropdown-content">
                                        <a href="#"
                                           className={mainContent === '' ? 'active' : ''}
                                           onClick={() => handleMenuClick('')}>{translate('nav.home')}</a>
                                        <a href="#"
                                           className={mainContent === 'parties' ? 'active' : ''}
                                           onClick={() => handleMenuClick('parties')}>{translate('nav.party')}</a>
                                        <a href="#"
                                           className={mainContent === 'contentCreators' ? 'active' : ''}
                                           onClick={() => handleMenuClick('contentCreators')}>{translate('nav.contentCreators')}</a>
                                        <a href="#"
                                           className={mainContent === 'tools' ? 'active' : ''}
                                           onClick={() => handleMenuClick('tools')}>{translate('nav.tools')}</a>
                                        <a href="#"
                                           className={mainContent === 'community' ? 'active' : ''}
                                           onClick={() => handleMenuClick('community')}>{translate('nav.community')}</a>
                                    </div>}
                                </div>
                            </>
                        }
                    </div>
                    <div className="header__logo">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             style={{width: '15rem', height: '10rem'}} viewBox="0 0 621.000000 402.000000"
                             preserveAspectRatio="xMidYMid meet">
                            <g transform="translate(0.000000,402.000000) scale(0.100000,-0.100000)" stroke="none">
                                <path d="M2960 3454 c-134 -17 -324 -65 -457 -114 -293 -109 -585 -366 -737
-648 -48 -90 -97 -206 -125 -302 -149 -503 9 -1077 396 -1440 149 -140 363
-268 539 -325 538 -171 1109 -33 1504 365 229 232 394 622 389 920 l-2 75 -7
-92 c-35 -415 -242 -784 -585 -1038 -165 -123 -389 -215 -572 -236 -62 -7
-107 -17 -100 -21 13 -8 -94 -12 -223 -9 -165 5 -400 66 -557 144 -321 162
-582 459 -700 797 -56 157 -68 244 -68 465 1 180 3 211 27 310 26 111 66 230
74 222 3 -2 -6 -42 -20 -89 -13 -46 -27 -106 -30 -133 -5 -44 -4 -43 9 15 57
249 191 503 350 662 410 413 1036 530 1585 296 25 -11 41 -15 35 -10 -20 20
-222 100 -302 120 -45 11 -137 26 -204 33 -148 16 -122 29 33 18 241 -17 515
-114 708 -250 101 -71 274 -241 344 -339 69 -95 157 -264 188 -362 12 -38 24
-65 26 -60 4 13 -56 178 -88 242 -46 90 -144 233 -218 316 -197 225 -499 394
-799 449 -86 16 -343 28 -413 19z"/>
                                <path d="M3740 3236 c0 -3 9 -10 20 -16 11 -6 20 -8 20 -6 0 3 -9 10 -20 16
-11 6 -20 8 -20 6z"/>
                                <path d="M2963 2875 c-46 -46 -61 -55 -92 -55 -30 0 -121 -32 -121 -42 0 -2
23 -4 51 -5 55 -1 96 -15 147 -49 30 -20 36 -20 72 -8 34 12 46 12 79 0 36
-12 42 -11 68 6 45 31 74 40 143 48 l65 6 -45 22 c-25 12 -62 22 -83 22 -30 0
-45 7 -68 31 -16 17 -29 35 -29 40 0 15 -58 39 -96 39 -31 0 -45 -8 -91 -55z"/>
                                <path d="M3418 2695 c5 -52 -11 -106 -45 -159 -21 -33 -24 -43 -14 -59 16 -24
17 -88 2 -116 -10 -18 -8 -26 8 -50 30 -42 43 -79 50 -146 l6 -59 17 26 c10
14 22 54 27 88 9 55 15 66 61 109 45 43 50 51 50 91 0 40 -5 48 -50 90 -44 41
-51 53 -61 105 -18 97 -57 158 -51 80z"/>
                                <path d="M2679 2695 c-9 -22 -19 -61 -23 -88 -6 -40 -14 -53 -51 -84 -82 -68
-85 -137 -10 -198 44 -36 65 -76 65 -124 1 -14 9 -41 19 -60 l18 -34 6 62 c3
42 15 78 36 116 25 45 29 59 21 80 -13 35 -13 78 1 109 9 20 8 29 -8 53 -30
43 -45 88 -52 151 l-6 57 -16 -40z"/>
                                <path d="M3024 2680 c-58 -24 -73 -113 -28 -155 31 -29 87 -33 121 -10 28 20
46 75 34 106 -19 51 -81 79 -127 59z"/>
                                <path d="M2815 2475 c-54 -53 -16 -145 60 -145 49 0 85 36 85 85 0 49 -36 85
-85 85 -25 0 -44 -8 -60 -25z"/>
                                <path d="M3185 2475 c-53 -52 -15 -145 59 -145 78 0 118 90 65 146 -31 33 -91
33 -124 -1z"/>
                                <path d="M4482 2400 c0 -8 4 -26 8 -40 6 -20 8 -21 8 -5 0 11 -3 29 -8 40 -5
12 -8 14 -8 5z"/>
                                <path d="M4502 2310 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z"/>
                                <path d="M3019 2305 c-32 -18 -52 -63 -43 -99 8 -35 49 -66 86 -66 40 0 88 48
88 89 0 63 -76 107 -131 76z"/>
                                <path d="M4512 2245 c0 -16 2 -22 5 -12 2 9 2 23 0 30 -3 6 -5 -1 -5 -18z"/>
                                <path d="M1692 2220 c0 -19 2 -27 5 -17 2 9 2 25 0 35 -3 9 -5 1 -5 -18z"/>
                                <path d="M4523 2165 c0 -22 2 -30 4 -17 2 12 2 30 0 40 -3 9 -5 -1 -4 -23z"/>
                                <path d="M1680 2095 c-2 -122 1 -211 9 -265 4 -25 5 38 3 140 -4 207 -9 260
-12 125z"/>
                                <path d="M4463 2075 c0 -33 2 -45 4 -27 2 18 2 45 0 60 -2 15 -4 0 -4 -33z"/>
                                <path d="M2918 2088 c-44 -22 -72 -29 -119 -30 l-61 -1 30 -19 c17 -10 55 -23
85 -28 64 -10 91 -25 109 -58 13 -25 50 -49 83 -52 51 -6 69 2 114 49 36 37
58 51 87 56 48 8 122 34 129 45 3 5 -22 9 -55 9 -47 0 -75 7 -122 30 -56 28
-63 30 -103 19 -34 -9 -50 -9 -70 0 -35 16 -41 15 -107 -20z"/>
                                <path d="M4521 1904 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z"/>
                                <path d="M1702 1760 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z"/>
                                <path d="M1712 1715 c0 -21 25 -107 27 -90 0 6 -6 33 -13 60 -8 28 -14 41 -14
30z"/>
                                <path d="M2225 1708 c-3 -8 -5 -50 -3 -94 3 -71 5 -79 23 -79 14 0 21 8 23 28
4 32 28 36 37 6 7 -21 50 -43 66 -33 16 9 10 32 -11 39 -24 7 -25 23 -5 49 35
46 4 83 -73 93 -40 4 -53 2 -57 -9z m90 -53 c0 -13 -8 -21 -22 -23 -19 -3 -23
1 -23 23 0 22 4 26 23 23 14 -2 22 -10 22 -23z"/>
                                <path d="M2425 1695 c-19 -18 -25 -35 -25 -70 0 -90 80 -126 142 -65 27 28 30
36 25 73 -11 79 -91 114 -142 62z m81 -30 c18 -27 12 -76 -12 -96 -36 -29 -67
66 -35 105 18 22 28 20 47 -9z"/>
                                <path d="M2627 1700 c-71 -56 -28 -178 59 -168 39 4 40 33 1 33 -34 1 -47 18
-47 66 0 41 20 64 49 54 23 -7 39 14 20 26 -23 15 -55 10 -82 -11z"/>
                                <path d="M2767 1713 c-4 -3 -7 -46 -7 -95 0 -81 2 -88 20 -88 13 0 20 7 20 18
0 10 6 26 13 36 13 17 15 16 35 -18 13 -23 29 -36 42 -36 26 0 26 5 -11 62
l-31 48 25 34 c24 31 26 46 5 46 -5 0 -22 -14 -38 -32 -31 -34 -30 -34 -46 20
-4 13 -17 16 -27 5z"/>
                                <path d="M3032 1712 c-9 -6 -12 -32 -10 -93 3 -76 5 -84 23 -84 14 0 21 8 25
30 4 23 12 31 36 36 17 3 36 9 42 13 16 10 15 71 0 84 -18 14 -100 24 -116 14z
m82 -48 c8 -21 -1 -34 -25 -34 -14 0 -19 7 -19 25 0 29 34 36 44 9z"/>
                                <path d="M3254 1712 c-12 -8 -64 -144 -64 -168 0 -21 33 -17 53 6 20 24 62 21
82 -6 7 -10 19 -15 28 -11 14 5 13 15 -10 84 -14 43 -30 84 -36 91 -11 13 -36
16 -53 4z m40 -74 c9 -35 8 -38 -14 -38 -20 0 -25 15 -14 44 9 23 21 20 28 -6z"/>
                                <path d="M3408 1714 c-5 -4 -8 -47 -8 -96 0 -87 1 -89 22 -86 16 2 24 12 28
33 4 24 11 30 39 36 18 4 37 13 42 21 16 24 10 67 -11 78 -26 14 -103 24 -112
14z m85 -46 c7 -21 -4 -38 -24 -38 -14 0 -19 7 -19 25 0 18 5 25 19 25 11 0
21 -6 24 -12z"/>
                                <path d="M3584 1707 c-2 -8 -4 -49 -2 -93 l3 -79 58 -3 c52 -3 57 -1 57 18 0
16 -6 20 -35 20 -41 0 -49 24 -10 34 14 4 25 13 25 21 0 9 -10 15 -25 15 -18
0 -25 5 -25 20 0 16 7 20 36 20 28 0 35 3 32 18 -4 23 -105 31 -114 9z"/>
                                <path d="M3753 1714 c-9 -4 -13 -33 -13 -95 0 -81 2 -89 19 -89 14 0 21 8 23
27 3 30 38 47 38 19 0 -16 37 -46 57 -46 21 0 15 30 -9 50 -22 17 -22 19 -5
37 20 23 23 66 5 81 -15 12 -98 23 -115 16z m75 -60 c2 -12 -4 -24 -12 -27
-19 -7 -40 18 -32 39 8 22 40 13 44 -12z"/>
                                <path d="M1760 1547 c0 -13 42 -118 46 -115 2 2 -6 29 -17 59 -20 52 -29 70
-29 56z"/>
                                <path d="M2310 1423 c-19 -10 -44 -33 -56 -51 -41 -60 -40 -175 0 -237 46 -70
190 -82 251 -21 20 20 23 32 20 87 -1 35 -3 67 -4 72 0 4 -26 7 -56 7 -51 0
-55 -2 -55 -24 0 -13 7 -29 15 -36 33 -27 12 -80 -32 -80 -50 0 -84 81 -69
163 12 66 38 80 117 64 34 -7 38 -6 47 22 13 36 5 40 -83 47 -46 4 -68 1 -95
-13z"/>
                                <path d="M2613 1433 c-10 -3 -13 -49 -13 -179 l0 -175 113 3 112 3 3 32 c4 36
-5 41 -88 45 l-45 3 -3 131 c-2 127 -3 132 -25 138 -25 7 -37 7 -54 -1z"/>
                                <path d="M2939 1417 c-98 -65 -97 -263 2 -321 46 -27 140 -27 177 1 87 64 107
217 39 292 -50 55 -158 69 -218 28z m140 -70 c20 -25 25 -108 8 -149 -28 -67
-85 -69 -112 -3 -47 111 36 233 104 152z"/>
                                <path d="M3277 1433 c-16 -4 -17 -19 -15 -176 l3 -172 40 0 40 0 3 47 c3 47
22 75 42 63 6 -3 20 -24 31 -47 15 -29 32 -45 65 -60 57 -25 74 -19 74 27 0
30 -4 37 -35 49 -49 21 -53 40 -16 81 41 48 43 102 4 145 -22 24 -41 33 -88
40 -62 10 -116 11 -148 3z m141 -79 c43 -30 13 -100 -40 -92 -19 2 -24 10 -26
42 -2 21 -1 44 2 52 7 18 36 18 64 -2z"/>
                                <path d="M3607 1433 c-13 -12 -7 -31 38 -112 39 -70 45 -90 45 -139 0 -94 6
-104 54 -100 l41 3 5 80 c5 73 9 87 53 162 26 45 47 87 47 93 0 5 -19 10 -43
10 -43 0 -44 -1 -68 -52 -13 -29 -30 -53 -38 -53 -8 0 -20 18 -28 40 -7 22
-23 48 -34 58 -21 17 -60 23 -72 10z"/>
                                <path d="M1870 1310 c6 -11 13 -20 16 -20 2 0 0 9 -6 20 -6 11 -13 20 -16 20
-2 0 0 -9 6 -20z"/>
                                <path d="M1900 1260 c6 -11 13 -20 16 -20 2 0 0 9 -6 20 -6 11 -13 20 -16 20
-2 0 0 -9 6 -20z"/>
                                <path d="M1940 1196 c0 -2 8 -10 18 -17 15 -13 16 -12 3 4 -13 16 -21 21 -21
13z"/>
                                <path d="M1998 1125 c17 -22 66 -74 109 -115 74 -72 73 -70 -17 25 -127 135
-128 136 -92 90z"/>
                                <path d="M2215 910 c10 -11 20 -20 23 -20 3 0 -3 9 -13 20 -10 11 -20 20 -23
20 -3 0 3 -9 13 -20z"/>
                                <path d="M2250 886 c0 -2 8 -10 18 -17 15 -13 16 -12 3 4 -13 16 -21 21 -21
13z"/>
                                <path d="M2968 603 c6 -2 18 -2 25 0 6 3 1 5 -13 5 -14 0 -19 -2 -12 -5z"/>
                            </g>
                        </svg>
                    </div>
                    <div className="header__profile profile__nav"
                         style={{marginRight: '5rem'}}>{translate('nav.profile')}</div>
                </div>
                <div className="header__count">
                    <span className="header__count__image"></span>
                    <span className="header__count__text">{notif_number < 10 ? `0${notif_number}` : notif_number}</span>
                    <span className="header__count__image"></span>
                </div>
            </header>
            <main className="main">
                <div className="wrapper">
                    {mainContent === '' && <>
                        <div className="icons">
                            <div className="icons__item">
                                <div className="icons__item__circle" style={{
                                    backgroundImage: 'url(/game_session.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}></div>
                                <div className="icons__item__text">{translate('game.session')}</div>
                            </div>
                            <div className="icons__item">
                                <div className="icons__item__circle librarium" style={{
                                    backgroundImage: 'url(/librarium.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}></div>
                                <div className="icons__item__text">{translate('game.librarium')}</div>
                            </div>
                        </div>
                        <div className="icons">
                            <div className="icons__item">
                                <div className="icons__item__circle" style={{
                                    backgroundImage: 'url(/group_chat.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}></div>
                                <div className="icons__item__text">{translate('game.groupchat')}</div>
                            </div>
                            <div className="icons__item justify-end">
                                <div className="icons__item__text">{translate('game.startgame')}</div>
                            </div>
                            <div className="icons__item">
                                <div className="icons__item__circle" style={{
                                    backgroundImage: 'url(/news.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}></div>
                                <div className="icons__item__text">{translate('game.news')}</div>
                            </div>
                        </div>
                        <Carousel children={
                            cards.map(
                                (card, index) => (
                                    <CardItem key={index} background__img={card.background__img} title={card.title}
                                              date={card.date}/>
                                )
                            )
                        } displayedNumbers={3}/>
                    </>}
                    {mainContent === 'parties' && <>
                        <h1>PARTIES</h1>
                    </>}
                    {mainContent === 'contentCreators' && <><h1>contentCreators</h1></>}
                    {mainContent === 'community' && <><h1>community</h1></>}
                </div>
            </main>
            <footer className="footer"></footer>
            <Modal isOpen={openTools} title={translate('nav.tools')}
                   content={<p>mockup du bordel de contenu de merde</p>} footer={
                <button onClick={closeTools}>Close</button>
            } onClose={closeTools}/>
        </div>
    )
        ;
}
