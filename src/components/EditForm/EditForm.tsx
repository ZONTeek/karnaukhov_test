import { Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Button, Form, Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { addOrder, editOrder, selectAddresses, selectCurrentOrder } from "../../store/OrderSlice";

import { CurrentOrder, Order } from "../../types/types";
import './styles.css';


export const EditForm = ({toggleEditForm}: EditFormPropTypes): JSX.Element => {
    const currentOrder = useSelector(selectCurrentOrder);
    const addresses = useSelector(selectAddresses);
    const dispatch = useDispatch();

    const { order, startAddress, finishAddress } = currentOrder as CurrentOrder ?? {
        order: {
            id: Date.now(),
            description: "",
            notes: ""
        },
        startAddress: addresses[0],
        finishAddress: addresses[1]
    };

    console.log(order, startAddress, finishAddress);

    const formik = useFormik({
        initialValues: {
            notes: order.notes ,
            description: order.description,
            start: startAddress.name,
            finish: finishAddress.name,
        },
        onSubmit: (values) => {
            const newOrder = values as Order;
            newOrder.id = order.id;
            if (currentOrder) {
                dispatch(editOrder(newOrder))
            } else {
                dispatch(addOrder(newOrder));
            }
            toggleEditForm(false);
        }
    })

    const handleSelectChange = (value: string, target: string) => {
        formik.setFieldValue(target, value)
    }

    return <>
        {<div className="editform-wrapper">
            <div className="editform">
                <CloseOutlined className="editform-closeBtn" onClick={() => toggleEditForm(false)}/>
                <Form onFinish={formik.handleSubmit}>
                    <span>Описание доставки</span>
                    <Input  placeholder="Описание груза" 
                            name="description"
                            value={formik.values.description} 
                            onChange={formik.handleChange} />
                    <span>Примечания</span>
                    <Input  placeholder="Примечания" 
                            name="notes"
                            value={formik.values.notes} 
                            onChange={formik.handleChange}/>
                    <div className="editform-cityselect">
                        <div>
                            <p>Точка отправки</p>
                            <Select defaultValue={formik.values.start} onChange={(value) => handleSelectChange(value, 'start')}>
                                {addresses.map(address => 
                                    <Select.Option 
                                        key={address.name} 
                                        value={address.name} 
                                        disabled={address.name===formik.values.finish}>
                                            {address.name}
                                    </Select.Option>)}
                            </Select>
                        </div>
                        <div>
                            <p>Точка доставки</p>
                            <Select defaultValue={formik.values.finish} onChange={(value) => handleSelectChange(value, 'finish')}>
                            {addresses.map(address => 
                                <Select.Option 
                                        key={address.name} 
                                        value={address.name}
                                        disabled={address.name===formik.values.start}>
                                            {address.name}
                                </Select.Option>)}
                            </Select>
                        </div>
                    </div>
                    <Button type="primary" htmlType="submit">Сохранить</Button>
                </Form>
            </div>
        </div>}
    </>
}

type EditFormPropTypes = {
    toggleEditForm: Dispatch<SetStateAction<boolean>>;
}