export type Order = {
    id: number;
    start: string,
    finish: string,
    description: string;
    notes: string;
}

export type Location = {
    lat: number;
    lng: number;
}

export type OrdersStateType = {
    value: Order[],
    currentOrder: CurrentOrder | undefined;
    addresses: Address[]
}

export type Address = {
    cityId: number,
    name: string,
    coords: Location
}

export type CurrentOrder = {
    order: Order;
    startAddress: Address;
    finishAddress: Address;
}