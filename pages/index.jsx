import Head from "next/head";
import {Inter} from "next/font/google";
import Login from "@/components/Form";
import {useEffect} from "react";
import {useAuth} from "@/context/auth";
import {useRouter} from "next/router";

const inter = Inter({subsets: ["latin"]});

export default function Home() {
  const {user, setUser} = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(token);

    !token ? router.push("/") : router.push("/dashboard");
  }, []);

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
