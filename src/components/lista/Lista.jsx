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
                            <th style={{display:props.visibilidadeColuna}}>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.lista && props.lista.length > 0 ? (
                            props.lista.map((item) => (
                            <tr className="item_lista" key={item.idGenero}>
                            <td data-cell="Nome">{item.nome}</td>
                            <td data-cell="Gênero" style={{display:props.visibilidadeColuna}}></td>
                            <td data-cell="Editar"><img src={Editar} alt="Imagem de uma caneta" /></td>
                            <td data-cell="Excluir"><img src={Excluir} alt="Imagem de uma caixa de lixo" onClick={() => props.deletar(item.idGenero)} style={{cursor:"pointer"}}/></td>
                            </tr>
                            ))
                        ) 
                        : (
                            <p>Nenhum gênero foi encontrado.</p>
                        )}
                        
                
                    </tbody>
                </table>
            </div>
        </section>
        </>
    )
}
export default Lista;