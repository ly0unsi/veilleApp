import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDemandes } from '../../../actions/UserAction';
import './demande.css'
import DemandeItem from './DemandeItem';
import Pagination from '../../../components/Pagination';
import { ImSpinner2 } from 'react-icons/im';
import { Empty } from 'antd';
const Demandes = () => {
    const dispatch = useDispatch()
    const { demandes } = useSelector((state) => state.adminUser)
    useEffect(() => {
        dispatch(getDemandes())
    }, [])

    return (


        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="mb-3">

                        <h5 className="card-title">Liste des demandes <span className="text-muted fw-normal ms-2">({demandes.total})</span></h5>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="">
                        <div className="table-responsive">
                            <table className="table project-list-table table-nowrap align-middle table-borderless">
                                <thead>
                                    <tr>
                                        <th scope="col" className="ps-4" style={{ width: "50px" }}>
                                            <div className="form-check font-size-16"><input type="checkbox" className="form-check-input" id="contacusercheck" /><label className="form-check-label" htmlFor="contacusercheck"></label></div>
                                        </th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Email</th>

                                        <th scope="col" style={{ width: '200px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {demandes.total >= 0
                                        ? demandes.total > 0 ?
                                            demandes.data?.map((demande) => (
                                                <DemandeItem demande={demande} />
                                            )) :
                                            <td className='bg-white' colSpan={5}>
                                                <Empty
                                                    description={
                                                        <span>
                                                            Touts les comptes sont verifiés
                                                        </span>
                                                    }
                                                />
                                            </td>
                                        :
                                        (
                                            <ImSpinner2 className='mx-auto animate-spin my-1 text-xl' />
                                        )

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {
                demandes.total > 0
                && <Pagination demandes={demandes} />
            }



        </div >
    )
}

export default Demandes