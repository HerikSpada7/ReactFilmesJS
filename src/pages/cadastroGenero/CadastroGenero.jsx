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
    const [listaGenero, setListarGenero] = useState([]);
    const [deletaGenero, deleteGenero] = useEffect([
        { id: 1, nome: '', valor: 10}
    ]);

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
        else{
            alerta("error", "Erro! Campo vazio!")
        }

    }

    // sincrono => Acontece simultaneamente.
    // assincrono => Esperar algo/resposta para ir para outro bloco de código.
    async function listarGenero(){
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
        catch (error){
            console.log(error);
        }
        
    }

    // função de excluir o genêro
    async function deletarGenero() {
        try {
            const removGenero = await api.remove()
            deleteGenero(removGenero.data)
        } 
        catch (error) {
            console.log(error)
        }
    
    }   
    
    
    
    
    useEffect(() => {
        listarGenero();
    }, [])


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
                    lista = {listaGenero}
                    
                    // Deletar objeto da lista
                    deletar = {deleteGenero}
                />
            </main>
            <Footer />

        </>
    )
    }

export default CadastroGenero;