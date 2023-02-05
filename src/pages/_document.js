import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <script async src="https://widgets.ifood.com.br/widget.js"/>
        <script async src="ifood.js"/>

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
