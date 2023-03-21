import React, { useState } from "react";
import Header from "../components/header";
import Form from "../components/produtos/form";
import GridProdutos from "../components/produtos/grid";
import { modelosBotoes } from "../config/constants";
import { Provider as ProdutoProvider } from "../components/produtos/context";
import { PdvModule } from "../interfaces/Pdv.interface";

interface HomeInterface {
  getHome(): JSX.Element;
}

interface HomeState {
  botoes: {
    a: boolean;
    d: boolean;
    e: boolean;
  };
}

class HomeSingleton
  extends React.Component<HomeInterface, HomeState>
  implements HomeInterface
{
  static instance: HomeSingleton;

  constructor(props: HomeInterface) {
    super(props);
    this.state = {
      botoes: modelosBotoes,
    };
  }

  getHome() {
    return (
      <ProdutoProvider>
        <Header />
        <Form />
        <GridProdutos />
      </ProdutoProvider>
    );
  }

  render() {
    return this.getHome();
  }

  static getInstance(): HomeSingleton {
    if (!HomeSingleton.instance) {
      HomeSingleton.instance = new HomeSingleton({} as HomeInterface);
    }
    return HomeSingleton.instance;
  }
}

const homeInstance = HomeSingleton.getInstance();

export default homeInstance;
