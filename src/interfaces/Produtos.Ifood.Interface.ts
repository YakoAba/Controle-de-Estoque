
export interface Weight {
    quantity: number;
    unit: string;
}

export interface Element {
    id: string;
    name: string;
    description: string;
    externalCode: string;
    image: string;
    serving: string;
    dietaryRestrictions: string[];
    multipleImages: any[];
    weight: Weight;
}

export interface Produtos {
    page: number;
    count: number;
    limit: number;
    elements: Element[];
}

export interface RootObject {
    success: boolean;
    produtos: Produtos;
}


export interface GridProdutosProps {
    data: RootObject;
    isLoading: boolean;
}