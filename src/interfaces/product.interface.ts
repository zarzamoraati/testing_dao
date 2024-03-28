export interface Product{
    _id?:string,
    name:string,
    price?:Number
}

export interface Payload {
    new_name: string;
    old_name: string;
}
