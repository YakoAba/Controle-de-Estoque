/**
 * Interface que representa o preço de um item, incluindo o valor e uma lista de preços por escala.
 * @interface
 */
export interface PriceInterface {
    /**
     * Valor do item.
     * @type {number}
     */
    value: number;
    /**
  * Lista de preços por escala.
  * @type {Array<{ scale: number, price: number }>}
  */
    scalePrices: Array<{}>;
}

/**

Interface que representa uma opção disponível para um item, incluindo informações como o ID, o nome, o ID do produto, o estado, a sequência e o preço.
@interface OptionInterface
*/
interface OptionInterface {
    /**
    *ID da opção.
    *@type {string}
    */
    id: string;

    /**
    *Nome da opção.
    *@type {string}
    */
    name: string;

    /**
    *ID do produto.
    *@type {string}
    */
    productId: string;

    /**
    *Estado da opção.
    *@type {string}
    */
    status: string;

    /**
    *Sequência da opção.
    *@type {number}
    */
    sequence: number;

    /**
    *Índice da opção.
    *@type {number}
    */
    index: number;

    /**
    *Preço da opção.
    *@type {PriceInterface}
    */
    price: PriceInterface;
}


// OptionGroupInterface: representa um grupo de opções, incluindo informações como o ID, o nome, o número mínimo e máximo de opções selecionáveis, a sequência, o estado e as opções disponíveis.
interface OptionGroupInterface {
    id: string;
    name: string;
    min: number;
    max: number;
    sequence: number;
    index: number;
    status: string;
    options: Array<OptionInterface>;
}

// ShiftInterface: representa um turno de trabalho, incluindo informações como a hora de 
//início e fim, quais dias da semana o turno está disponível.
interface ShiftInterface {
    startTime: string;
    endTime: string;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
}

// ItemInterface: representa um item disponível para compra, incluindo informações como o ID, o nome, a descrição, o código externo, o estado, a sequência, o ID do produto, o caminho da imagem, o preço, os turnos disponíveis, as restrições alimentares, os grupos de opções e se tem grupos de opções.
export interface ItemInterface {
    id: string;
    name: string;
    description: string;
    externalCode: string;
    status: string;
    sequence: number;
    index: number;
    productId: string;
    imagePath: string;
    price: PriceInterface;
    shifts: Array<ShiftInterface>;
    serving: string;
    dietaryRestrictions: Array<{}>;
    optionGroups: Array<OptionGroupInterface>;
    hasOptionGroups: boolean;
}

// CategoriaInterface: representa uma categoria de itens, incluindo informações como o ID, o nome, o estado, a sequência e a lista de itens disponíveis.
interface CategoriaIfoodInterface {
    id: string;
    name: string;
    status: string;
    sequence: number;
    index: number;
    template: string;
    items: Array<ItemInterface>;
}

// CategoriasIfoodInterface: representa o resultado da API, incluindo informações de sucesso da API e uma lista de categorias.
export interface CategoriaDataApiIfood {
    success: boolean;
    categorias?: Array<CategoriaIfoodInterface>;
}

// GridCategoriasProps: representa as propriedades que são passadas para o componente GridCategorias, incluindo a resposta da API e se os dados estão sendo carregados.
export interface GridCategoriasProps {
    data: CategoriaDataApiIfood;
    isLoading: boolean;
}