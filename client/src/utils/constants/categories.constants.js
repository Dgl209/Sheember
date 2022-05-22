import {
  faKey,
  faCar,
  faWrench,
  faHammer,
  faMobileScreen,
  faVolleyball,
  faShirt,
  faDog,
  faBabyCarriage,
  faBusinessTime,
  faComputer,
  faGamepad,
} from '@fortawesome/free-solid-svg-icons';
import {
  NotebookImg,
  ComputerImg,
  MonitorImg,
  TabletImg,
  CableAdapterImg,
  ComputerComponentsImg,
  NetworkEquipmentImg,
  HeadphonesImg,
  KeyboardMiceImg,
  LaptopStandImg,
  OfficeEquipmentImg,
  SpeakerSystemImg,
  MicrophoneImg,
} from '../../assets';

const categoriesConstants = [
  {
    icon: faKey,
    name: 'Real estate',
    id: 'real-estate',
  },
  {
    icon: faCar,
    name: 'Auto',
    id: 'auto',
    child: [
      {
        name: 'Cars',
        id: 'cars',
      },
      {
        name: 'Trucks',
        id: 'trucks',
      },
      {
        name: 'Buses',
        id: 'buses',
      },
      {
        name: 'Moto',
        id: 'moto',
      },
      {
        name: 'Agricultural machinery',
        id: 'agricultural-machinery',
      },
      {
        name: 'Water transport',
        id: 'water-transport',
      },
      {
        name: 'Air transport',
        id: 'air-transport',
      },
      {
        name: 'Trailers, motor homes',
        id: 'trailers',
      },
    ],
  },
  {
    icon: faWrench,
    name: 'Spare parts for transport',
    id: 'spare-parts',
  },
  {
    icon: faHammer,
    name: 'Home and garden',
    id: 'home-and-garden',
  },
  {
    icon: faComputer,
    name: 'Notebooks and computers',
    id: 'notebooks-computers',
    child: [
      {
        image: NotebookImg,
        name: 'Notebooks',
        id: 'notebook',
      },
      {
        image: ComputerImg,
        name: 'Computers, candy bars',
        id: 'computers',
      },
      {
        image: MonitorImg,
        name: 'Monitors',
        id: 'monitors',
      },
      {
        image: TabletImg,
        name: 'Tablets',
        id: 'tablets',
      },
      {
        image: CableAdapterImg,
        name: 'Cables and adapters',
        id: 'cables-adapters',
      },
      {
        image: ComputerComponentsImg,
        name: 'Computer components',
        id: 'computer-components',
      },
      {
        image: NetworkEquipmentImg,
        name: 'Network equipment',
        id: 'network-equipment',
      },
      {
        image: HeadphonesImg,
        name: 'Headphones and accessories',
        id: 'headphones-accessories',
      },
      {
        image: KeyboardMiceImg,
        name: 'Keyboards and mice',
        id: 'keyboard-mice',
      },
      {
        image: LaptopStandImg,
        name: 'Electronics accessories',
        id: 'electronics-accessories',
      },
      {
        image: OfficeEquipmentImg,
        name: 'Office equipment',
        id: 'office-equipment',
      },
      {
        image: SpeakerSystemImg,
        name: 'Speaker system',
        id: 'speaker-system',
      },
      {
        image: MicrophoneImg,
        name: 'Microphones',
        id: 'microphones',
      },
    ],
  },
  {
    icon: faMobileScreen,
    name: 'Smartphones, TV and electronics',
    id: 'electronics',
  },
  {
    icon: faGamepad,
    name: 'Goods for gamers',
    id: 'for-gamers',
  },
  {
    icon: faShirt,
    name: 'Clothes, shoes and jewelry',
    id: 'clothes-shoes-jewelry',
  },
  {
    icon: faVolleyball,
    name: 'Sports and hobbies',
    id: 'sport',
  },
  {
    icon: faDog,
    name: 'Animals',
    id: 'animals',
  },
  {
    icon: faBabyCarriage,
    name: "Children's goods",
    id: "children's",
  },
  {
    icon: faBusinessTime,
    name: 'Business and services',
    id: 'business-and-services',
  },
];

export default categoriesConstants;
