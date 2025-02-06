export interface Ticket {
    id: string;
    name: string; 
    description: string;
    isVIP: boolean;
    count: number;
    price: number;
    date?: Date; 
    amount: number;
}

export interface ErrorMessage {
    message: string;
}

export interface Error {
    [key: string]: ErrorMessage[];
}