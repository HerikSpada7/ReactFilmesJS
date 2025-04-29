import "./Lista.css"
import Editar from "../../assets/img/pen-to-square-solid.svg"
import Excluir from "../../assets/img/trash-can-regular.svg"
const Lista =(props) => {
    return(
        <>
        <section className="layout_grid listagem">
            <h1>{props.tituloLista}</h1>
            <hr />
            <div className="tabela">
                <table>
                    <thead>
                        <tr className="table_cabecalho">
                            <th>Nome</th>
                            <th  style={{display:props.visibilidadeColuna}}>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="item_lista">
                            <td data-cell="Nome">Pânico 5</td>
                            <td data-cell="Gênero" style={{display:props.visibilidadeColuna}}>Terror</td>
                            <td data-cell="Editar"><img src={Editar} alt="Imagem de uma caneta" /></td>
                            <td data-cell="Excluir"><img src={Excluir} alt="Imagem de uma caixa de lixo" /></td>
                        </tr>
                    
                        <tr className="item_lista">
                            <td data-cell="Nome">Solo Leveling - Segundo Despertar</td>
                            <td data-cell="Gênero" style={{display:props.visibilidadeColuna}}>Animação</td>
                            <td data-cell="Editar"><img src={Editar} alt="Imagem de uma caneta" /></td>
                            <td data-cell="Excluir"><img src={Excluir} alt="Imagem de uma caixa de lixo" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
        </>
    )
}
export default Lista;