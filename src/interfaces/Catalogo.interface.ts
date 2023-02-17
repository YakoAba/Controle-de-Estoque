export module catalogoModule {

    export interface WeightInterface {
        quantity: number;
        unit: string;
    }

    export interface ElementInterface {
        id: string;
        name: string;
        description: string;
        externalCode: string;
        image: string;
        serving: string;
        dietaryRestrictions: string[];
        multipleImages: any[];
        weight: WeightInterface;
    }

    export interface CatalogoInterface {
        page: number;
        count: number;
        limit: number;
        elements: Element[];
    }


export interface ApiResponseInterface {
    success: boolean;
    elements: Element[];
}

    export interface RootObjectInteface {
        success: boolean;
        catalogo: CatalogoInterface;
    }

}

