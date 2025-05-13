import { useEffect, useState } from "react";
import api from "../../Services/services";

//Importar o sweet alert:
import Swal from "sweetalert2";

//importação de componentes:
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

const CadastroGenero = () => {

    //nome do genero
    const [genero, setGenero] = useState("");

    function alerta(icone, mensagem){
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

    async function cadastrarGenero(e) {
        e.preventDefault();
        //Verificar se o input esta vindo vazio
        if (genero.trim() != "") {
            //try => tentar(o esperado)
            //catch => pega a exceção
            try {
                //cadastrar um gênero: post
                await api.post("genero", { nome: genero })
                alerta("success", "Cadastro realizado com sucesso!")
                setGenero("")
            }
            catch (error){
                alerta("error", "Erro! Entre em contato com o suporte!")
                console.log(error);
            }
        }
        else{}

    }

    //Teste do useEffect
    // useEffect(() => {
    //    console.log(genero)
    // }, [genero]);

    return (
        <>

            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="gênero"

                    //Atribuindo a função:
                    funcCadastro={cadastrarGenero}
                    //Atribuindo o valor ao input:
                    valorInput={genero}
                    //Atribuindo a função que atualiza o meu genero:
                    setValorInput={setGenero}

                />

                <Lista
                    tituloLista="Lista de Gêneros"
                    visibilidadeColuna="none"
                />
            </main>
            <Footer />

        </>
    )
}

export default CadastroGenero;