import {
  BOARDING_HOUSES_FETCH_SUCCESS,
  BOARDING_HOUSES_FETCH_USER_SUCCESS,
  BOARDING_HOUSE_BY_ID_FETCH_USER_SUCCESS,
} from "../action/actionType";

const initialState = {
  boardingHouses: [],
  boardingHouse: {
    id: 4,
    name: "Kost Margonda Kramat",
    price: 1100000,
    CategoryId: 1,
    CityId: 1,
    totalRoom: 5,
    UserId: 1,
    description:
      "Kost ini terdiri dari 2 lantai. Tipe kamar B berada di lantai berada di lantai 1 dan lantai 2. Semua kamar di kamar ini memiliki jendela yang menghadap secara langsung ke arah koridor.Tersedia juga layanan pembersihan AC secara rutin setiap 3 bulan sekali. ",
    location: {
      type: "Point",
      coordinates: [-6.131164, 106.85564],
    },
    slug: "kost-margonda-kramat",
    mainImg:
      "https://ibukotakita.com/files/2019/10/Balikpapan-Kost-Herman-D.jpg",
    address: null,
    Category: {
      name: "Kos Putri",
    },
    City: {
      name: "Jakarta",
    },
    User: {
      id: 1,
      fullName: "Admin 1",
      email: "admin@mail.com",
      address: "Jalan boulevard 1 no 12",
      role: "Admin",
      phoneNumber: "086363628781",
    },
    Images: [
      {
        imgUrl:
          "https://infokost.b-cdn.net/wp-content/uploads/2022/02/04022022164399527344.jpeg",
      },
      {
        imgUrl:
          "https://infokost.b-cdn.net/wp-content/uploads/2022/02/04022022164399527327.jpeg",
      },
      {
        imgUrl:
          "https://infokost.b-cdn.net/wp-content/uploads/2022/02/04022022164399527380.jpeg",
      },
    ],
    BoardingHouseFacilities: [],
    BoardingHouseRules: [],
  },
};

function boardingHousesReducer(state = initialState, action) {
  switch (action.type) {
    case BOARDING_HOUSES_FETCH_SUCCESS:
      return { ...state, boardingHouses: action.payload };

    case BOARDING_HOUSES_FETCH_USER_SUCCESS:
      return { ...state, boardingHouses: action.payload };

    case BOARDING_HOUSE_BY_ID_FETCH_USER_SUCCESS:
      return { ...state, boardingHouse: action.payload };

    default:
      return state;
  }
}

export default boardingHousesReducer;
