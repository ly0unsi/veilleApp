import React from 'react'
import { useDispatch } from 'react-redux';
import { getDemandes } from '../actions/UserAction';

const Pagination = ({ demandes }) => {
    const dispatch = useDispatch()
    const handlePaginate = (url) => {
        const pageNumberRegex = /page=(\d+)/;
        const match = url.match(pageNumberRegex);
        const pageNumber = match[1]
        dispatch(getDemandes(pageNumber))
    }
    return (

        <div className="row g-0 align-items-center pb-4">
            <div className="col-sm-6">
                <div><p className="mb-sm-0">Affichant {demandes.from} à {demandes.to} sur {demandes.total} entrées</p></div>
            </div>
            <div className="col-sm-6">
                <div className="float-sm-end">
                    <ul className="pagination mb-sm-0">
                        {demandes.links?.map((link) => (
                            link.url ?
                                link.label.includes("Next") ?
                                    <li className={`page-item ${link.active && "active"}`} > <button onClick={() => handlePaginate(link.url)} className="page-link">Suivant</button></li>
                                    :
                                    link.label.includes("Previous") ?
                                        <li className={`page-item ${link.active && "active"}`} > <button onClick={() => handlePaginate(link.url)} className="page-link">Precedent</button></li>
                                        :
                                        <li className={`page-item ${link.active && "active"}`} > <button onClick={() => handlePaginate(link.url)} className="page-link">{link.label}</button></li>
                                : null
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Pagination