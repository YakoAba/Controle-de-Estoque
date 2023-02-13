import { ChakraProvider } from "@chakra-ui/react";
import { Provider as GlobalProvider } from "../contexts/GlobalContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </ChakraProvider>
  );
}
