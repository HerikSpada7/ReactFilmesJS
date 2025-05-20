import { useEffect, useState } from "react";
import api from "../../Services/services";

//Importar o sweet alert:
import Swal from "sweetalert2";

//importação de componentes:
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { useFormState } from "react-dom";

// () => {} função anônima/arrow function
// useEffect(() => {}, [] ) 
// hooks: Effect(efeito a partir de uma alteração de estado):efeito colateral
// dependência: Vazio(o efeito acontece na primeira vez que a tela é "montada" ou quando for recarregada, com dependência(toda vez que o state sofrer alteração o efeito acontecerá)
// função: o efeito que queremos que aconteça

const CadastroGenero = () => {

    //nome do genero
    const [genero, setGenero] = useState("");
    const [listaGenero, setListarGenero] = useState([]);


    function alertar(icone, mensagem, warning) {
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
                alertar("success", "Cadastro realizado com sucesso!")
                listarGenero()
            }
            catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte!")
                console.log(error);
            }
        }
        else {
            alertar("error", "Erro! Campo vazio!")
        }

    }

    // sincrono => Acontece simultaneamente.
    // assincrono => Esperar algo/resposta para ir para outro bloco de código.
    async function listarGenero() {
        try {
            // await => Aguarde ter uma resp da solicitação
            const resposta = await api.get("genero");
            // console.log(resposta.data) => puxa um get
            // console.log(resposta.data[1]) => puxa um get apenas de um array especifico

            // Dar um get na base do id 😡
            // console.log(resposta.data[1].idGenero)
            // console.log(resposta.data[1].nome) 
            // Bem simples né? 😊

            setListarGenero(resposta.data);

        }
        catch (error) {
            console.log(error);
        }

    }

    // função de excluir o genêro
    async function removerGenero(idGenero) {
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Você tem certeza?",
            text: "Não será possivel reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, delete isso!",
            cancelButtonText: "Não, cancele!",
            reverseButtons: true
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    //conectar a api
                    //solicitar a exclusao do genero
                    //interpolacao X concatenacao
                    //`genero/${idGenero}`
                    await api.delete(`genero/${idGenero}`)
                    listarGenero();
                }
                catch (error) {
                    console.log(error)
                }
                swalWithBootstrapButtons.fire({
                    title: "Deletado!",
                    text: "Seu genêro foram deletados.",
                    icon: "success"
                });
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado!",
                    text: "Seu gênero não foi excluido",
                    icon: "error"
                });
            }
        });
    }

    // função de paginação


    useEffect(() => {
        listarGenero();
    }, [listarGenero])


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

                    // Atribuir para lista, o meu estado atual:
                    lista={listaGenero}
                    deletar={removerGenero}

                // Deletar objeto da lista
                />
            </main>
            <Footer />

        </>
    )
}


export default CadastroGenero;