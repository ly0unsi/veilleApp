import React, { useState } from 'react'
import { Popconfirm, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import UserApi from '../../../api/userApi';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { getDemandes } from '../../../actions/UserAction';
import { toast } from 'react-toastify';
const DemandeItem = ({ demande }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const dispatch = useDispatch()

    const confirm = async () => {
        setConfirmLoading(true);
        await UserApi.confirmUser(demande.id)
        setConfirmLoading(false);
        dispatch(getDemandes())
        toast.success('Utilisateur confirmé ', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const cancel = (e) => {
        console.log(e);
    };

    const items = [
        {
            label: <a href="https://www.antgroup.com">1st menu item</a>,
            key: '0',
        },
        {
            label: <a href="https://www.aliyun.com">2nd menu item</a>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    return (
        <tr>
            <th scope="row" className="ps-4">
                <div className="form-check font-size-16"><input type="checkbox" className="form-check-input" id="contacusercheck1" /><label className="form-check-label" htmlFor="contacusercheck1"></label></div>
            </th>
            <td className='flex gap-2 items-center'><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="avatar-sm rounded-circle me-2" /><a href="#" className="text-body">{demande.firstname} {demande.lastname}</a></td>
            <td><span className="font-medium mb-0">{demande.role.name}</span></td>

            <td>
                {
                    demande.emailVerified ? <span className="badge badge-soft-success mb-0">
                        <CheckCircleOutlined className='mr-1' />
                        {demande.email}
                    </span> : <span className="badge badge-soft-danger mb-0">
                        <CloseCircleOutlined className='mr-1' />
                        {demande.email}
                    </span>
                }

            </td>

            <td>
                <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                        <Popconfirm
                            placement="leftTop"
                            title="Confirmer compte"
                            description={`Etes vous sure de confirmer ${demande.firstname} ${demande.lastname} ?`}
                            onConfirm={confirm}
                            onCancel={cancel}
                            okButtonProps={{ loading: confirmLoading, className: 'bg-primary' }}
                            okText="Confirmer"
                            cancelText="Annuler"
                        >
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" className="px-2 text-primary"> <i class='bx bx-check font-size-18'></i></a>
                        </Popconfirm>

                    </li>
                    <li className="list-inline-item">
                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" className="px-2 text-danger"><i className="bx bx-trash-alt font-size-18"></i></a>
                    </li>
                    <li className="list-inline-item dropdown">
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <a onClick={(e) => e.preventDefault()} className='cursor-pointer'>
                                <Space>
                                    <i className="bx bx-dots-vertical-rounded"></i>
                                </Space>
                            </a>
                        </Dropdown>

                    </li>
                </ul>
            </td>

        </tr >
    )
}

export default DemandeItem