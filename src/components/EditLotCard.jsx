import { InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, notification, Card, message, Upload } from 'antd';
import axios from 'axios';
const { TextArea } = Input;
const { Dragger } = Upload;


const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} является обязательным!',
    types: {
        number: '${label} не является действительным числом!',
    },
    number: {
        range: '${label} должно быть между ${min} и ${max}',
    },
};

const EditLotCard = () => {
    const [api, contextHolder] = notification.useNotification();

    const onFinish = (values) => {

        const formData = {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        };

        axios.post(`https://fakestoreapi.com/products`, formData)
            .then((response) => {
                api.success({
                    message: 'Успешно добавлено!',
                    description: `Настройки успешно добавлены. ${response.data.id}`,
                })
                console.log(response)
            })
            .catch((error) => {
                const { data } = error.response;
                const { errors } = data;

                Object.keys(errors).forEach((key) => {
                    const errorMessages = errors[key];
                    errorMessages.forEach((message) => {
                        api.error({
                            message: `Error: ${key}`,
                            description: message,
                        });
                    });
                });
            });
    };

    return (
        <div className="size-full mx-3 my-3">
            {contextHolder}
            <Card
                title={<p>Добавить Lot Card</p>}
                style={{
                    width: 700,
                }}
            >
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                    }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name="title"
                        label="Название"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Описание"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <TextArea rows={4} placeholder="Введите текст описания" />
                    </Form.Item>
                    <Form.Item
                        name="startingPrice"
                        label="Стартовая цена"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                                min: 0,
                                max: 100000000,
                            },
                        ]}
                    >
                        <InputNumber suffix="₽" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="priceStep"
                        label="Шаг ставки"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                                min: 100,
                                max: 10000000,
                            },
                        ]}
                    >
                        <InputNumber suffix="₽" style={{ width: '100%' }} />
                    </Form.Item>
                    <Dragger {...props} style={{ width: '100%' }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Нажмите или перетащите файл в эту область, чтобы загрузить</p>
                        <p className="ant-upload-hint">Поддержка одиночной или массовой загрузки. Строго запрещено загружать данные компании или другие запрещенные файлы.</p>
                    </Dragger>
                    <Form.Item>
                        
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 8,
                        }}
                    >
                        <Button type="primary" htmlType="Добавить">
                            Добавить
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default EditLotCard;