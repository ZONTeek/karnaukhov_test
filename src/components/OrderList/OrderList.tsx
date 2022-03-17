import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { removeOrder, selectCurrentOrder, selectOrders, setCurrentOrder } from '../../store/OrderSlice';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { Order } from '../../types/types';
import './styles.css';


export const OrderList = ({openEditForm}: OrderListPropTypes): JSX.Element => {
    const orders: Order[] = useSelector(selectOrders);
    const currentOrder = useSelector(selectCurrentOrder);
    const dispatch = useDispatch();
    
    const columns = [
        {
            title: 'Место погрузки',
            dataIndex: 'start',
            key: 'start'
        },
        {
            title: 'Место разгрузки',
            dataIndex: 'finish',
            key: 'finish',
            width: 250,
            minWidth: 200,
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
            width: 600,
            minWidth: 500
        },
        {
            title: 'Примечание',
            dataIndex: 'notes',
            key: 'notes',
            width: 150,
        },   
        {
            title: <PlusCircleOutlined onClick={() => openEditForm('add')} />,
            width: 100,
            render: (item: Order) => <div className="ordercard-actions">
                        <EditOutlined onClick={() => openEditForm('edit', item)} />
                        <DeleteOutlined onClick={() => deleteOrder(item.id)} />
                    </div>
        },
    ]

    const deleteOrder = (id: number) => {
        dispatch(removeOrder(id));
    }

    const selectOrder = (order: Order): void => {
        dispatch(setCurrentOrder(order))
    }

    return (
        <div className={"order-list-wrapper"}>
           <Table   dataSource={orders} 
                    columns={columns} 
                    rowKey={'id'}
                    rowClassName={(data)=> { return data.id === currentOrder?.order.id ? "highlight" : ""} }
                    onRow={(data: Order) => {
                        return { onClick: () => selectOrder(data) }}} />
        </div>
    )
}

type OrderListPropTypes = {
    openEditForm: (type: string, order?: Order) => void
}