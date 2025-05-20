import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista"
import api from "../../Services/services";
import Swal from "sweetalert2";
import { useState, useEffect, useActionState } from "react";
import { Fragment } from "react";

const CadastroFilme = () => {

    const [filme, setFilme] = useState("");
    const [genero, setGenero] = useState("");
    
    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    async function listarGenero() {
        try {
            const resposta = await api.get("genero");
            setListaGenero(resposta.data);
        } catch (error) {

        }
    }

    async function cadastrarFilme() {
        if (filme.trim() !== "") {
            try {
                await api.post("filme", { titulo: filme, idGenero: genero });
                alertar("success", "Filme cadastrado!")
                setFilme("")
                setGenero("")
            } catch (error) {
                console.log(error);
            }
        } else {
            alertar("error", "Erro! Campo vazio!")
        }

    }


    useEffect(() => {
        listarGenero();
    }, [])


    return (

        <> {/*Fragment, o pai da estrutura e a forma melhor e mais segura pra não dar pau no seu codigo**/}
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Filme"
                    placeholder="filme"

                    valorInput={filme}
                    setValorInput={setFilme}

                    valorSelect={genero}
                    setValorSelect={setGenero}
                    funcCadastro={cadastrarFilme}

                    lista={listaGenero}
                />
                <Lista
                    tituloLista="Lista de Filmes"
                // lista={listaFilme}
                />
            </main>
            <Footer />
        </>
    )
}
export default CadastroFilme;