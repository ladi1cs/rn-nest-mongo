
export interface IBeverageSize {
    _id: string,
    size: string,
    price: number
}

export interface IBeverage {
    _id: string,
    name: string,
    sizes: IBeverageSize[]
}

export interface IOrderItem {
    beverage: IBeverage,
    size: IBeverageSize,
    quantity: number
}