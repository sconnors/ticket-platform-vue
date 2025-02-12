export interface Ticket {
    id: string;
    name: string; 
    description: string;
    isVIP: boolean;
    count: number;
    price: number;
    amount: number;
}

export interface ErrorMessage {
    message: string;
}

export interface Error {
    [key: string]: ErrorMessage[];
}

export interface GenericValue {
    [key: string] : string;
}

export interface HeroProps {
    title: string;
    subtitle: string;
}