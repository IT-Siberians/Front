import { Button, Form, Input, notification, Card } from 'antd';
import { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import FullLotCard from './FullLotCard'
import axios from 'axios';

function SearchForm(props) {
    const { index } = props;
    const [fullInfo, setFullInfo] = useState([]);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const fetchCardLotId = (id) => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                const response = res.data
                if (response && Object.keys(response).length > 0) {
                    setFullInfo(response)
                } else {
                    api.error({
                        message: "Ошибка:",
                        description: `Запись ${id} не найдена`,
                    });
                }
            })
            .catch((error) => {
                api.error({
                    message: "Ошибка:",
                    description: `Запись ${error} не найдена`,
                });
            });

    }

    const menuFunctions = {
        3: fetchCardLotId,
    };

    const typeName = {
        3: "Card Lot By Id",
    };

    const onFinish = (values) => {
        menuFunctions[index](values.id)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        setFullInfo();
        form.resetFields();
    }, [index, form]);

    return (
        <div className="size-full mx-3 my-3">
            {contextHolder}
            <Card
                title={<p>Поиск {typeName[index]}</p>}
                style={{
                    width: "fit-contener",
                }}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                    className='flex item-center'
                >
                    <Form.Item
                        label="ID"
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: 'Введите id для поиска!',
                            },
                        ]}
                        className='size-3/4'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 20,
                        }}
                    >
                        <Button icon={<SearchOutlined />} type="primary" htmlType="Найти">
                            Найти
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {fullInfo  && Object.keys(fullInfo).length > 0 && (
                <Card title={<p>Результат поиска</p>} style={{ marginTop: 20 }}>
                    <FullLotCard fullInfo={fullInfo} />
                </Card>
            )}
        </div>
    );
}

export default SearchForm;