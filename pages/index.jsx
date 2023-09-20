import Head from "next/head";
import {Inter} from "next/font/google";
import Login from "@/components/Form";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  return (
    <>
      <Head>
        <title>Image Gallery</title>
        <meta name='description' content='Image Gallery' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Login />
    </>
  );
}
