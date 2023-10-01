export interface chef{
    _id: string,
    name: string;
    image: string;
    summary: string;
    popularity: number;
    restaurants: restaurant[];
    isNew: boolean;
}

export interface restaurant{
    _id: string;
    name: string;
    chef: chef;
    rating: string;
    popularity: number;
    image: string;
    address: string;
    from: string;
    to: string;
    openingDate: string;
    dishes: dish[];
    averagePrice: number;
    lat: number;
    long: number;
    distance: number;
}


export interface dish{
    _id: string;
    name: string;
    image: string;
    ingredients: string;
    icon: string;
    price: number;
    changes: string[];
    side: string[];
    restaurant: restaurant;
    mealType: string[];
}