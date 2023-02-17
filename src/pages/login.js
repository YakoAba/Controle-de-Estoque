import style from "./login.module.css";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const router = useRouter();

  const onSubmit = (data) => {
    if (data.Senha === "teste" && data.Usuario === data.Senha) {
      toastDeletar();
      router.push("/");
    } else {
      alert("Usuario ou Senha incorreto");
      setAdmin(false);
    }
  };

  function toastDeletar() {
    return toast({
      title: "Buhim Habaim!",
      description: "Seja bem vinda",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  }

  return (
    <div className={style.home}>
      <div className={style.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.image}>
            <Image
              height="220"
              width="280"
              src="/icone512.png"
              alt="logo"
            ></Image>
          </div>

          <label className={style.label}> Usuario:</label>
          <div className={style.usuario}>
            <img src="/user.svg" alt="user" height={45} width={45} />
          </div>
          <input
            type="text"
            placeholder="Usuario"
            {...register("Usuario", { required: true })}
            className={style.input}
          />

          <label className={style.label}> Senha:</label>
          <div className={style.cadeado}>
            <img src="/cadeado.svg" alt="cadeado" height={30} width={30} />
          </div>
          <input
            type="text"
            placeholder="Senha"
            {...register("Senha", { required: true })}
            className={style.input}
          />

          <button className={style.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
}
