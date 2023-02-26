import { useState } from "react";
import { Box, Stack, Input, Button, IconButton, Flex } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

interface Ingredient {
  name: string;
  quantity: number;
}

const BurgerForm = () => {
  const [burger, setBurger] = useState({
    name: "",
    description: "",
    price: "",
    ingredients: [{ name: "", quantity: 0 }],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBurger((prevBurger) => ({ ...prevBurger, [name]: value }));
  };

  const handleIngredientChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    setBurger((prevBurger) => {
      const ingredients = [...prevBurger.ingredients];
      ingredients[index][name] = value;
      return { ...prevBurger, ingredients };
    });
  };

  const handleAddIngredient = () => {
    setBurger((prevBurger) => ({
      ...prevBurger,
      ingredients: [...prevBurger.ingredients, { name: "", quantity: 0 }],
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    setBurger((prevBurger) => {
      const ingredients = [...prevBurger.ingredients];
      ingredients.splice(index, 1);
      return { ...prevBurger, ingredients };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Faça a requisição para criar um novo registro de hambúrguer no banco de dados
  };

  return (
    <Flex as="form" onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Input
          placeholder="Nome"
          name="name"
          value={burger.name}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Descrição"
          name="description"
          value={burger.description}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Preço"
          name="price"
          value={burger.price}
          onChange={handleInputChange}
        />
        <Stack spacing={2}>
          <p>Ingredientes:</p>
          {burger.ingredients.map((ingredient, index) => (
            <Stack direction="row" alignItems="center" key={index}>
              <Input
                placeholder="Nome"
                name="name"
                value={ingredient.name}
                onChange={(event) => handleIngredientChange(event, index)}
              />
              <Input
                placeholder="Quantidade"
                name="quantity"
                type="number"
                value={ingredient.quantity}
                onChange={(event) => handleIngredientChange(event, index)}
              />
              <IconButton
                aria-label="Remover Ingrediente"
                icon={<MinusIcon />}
                onClick={() => handleRemoveIngredient(index)}
              />
            </Stack>
          ))}
          <IconButton
            aria-label="Adicionar Ingrediente"
            icon={<AddIcon />}
            onClick={handleAddIngredient}
          />
        </Stack>
        <Button type="submit">Salvar</Button>
      </Stack>
    </Flex>
  );
};
export default BurgerForm;
