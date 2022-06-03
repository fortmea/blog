import axios from "axios";
import useSWR from "swr";
import utilStyles from '../styles/utils.module.css'

export default function Comentarios({ identi }) {
    const address = `https://flaskpylocaldb.fortmea.repl.co/comments/list/?id=${identi}`;
    const fetcher = async (url) => {
        const response = await axios.get(url);
        return response.data;
    }
    const data = useSWR(address, fetcher).data;
    console.log(data)
    return (<div>
        <h5>Comentários:</h5>
        <ul className={utilStyles.list}>
            { data && Object.values(data).map(({ nome, conteudo, id }) => (
                <div className='card' key={id}>
                    <div className='container'>
                        <li className={utilStyles.listItem} >
                        
                           <h5><i className="fa fa-user-circle" aria-hidden="true"></i> {nome}</h5>
                            <h4>{conteudo}</h4>
                            <hr></hr>
                        </li></div>
                </div>
            ))}
        </ul>
    </div>
    )
}