import { Button, Card, Col, Row, Image, Typography } from 'antd';

const { Title, Paragraph } = Typography;

function FullLotCard(props) {
    const { fullInfo } = props;
    return (
        <Card style={{ marginTop: 20, width: '60%' }}>
            <Row >
                <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image.PreviewGroup

                        items={[
                            fullInfo.image,
                            'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
                            'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
                        ]}
                    >
                        <Image
                            width={200}
                            src={fullInfo.image}
                        />
                    </Image.PreviewGroup>
                </Col>
                <Col span={16} style={{ padding: '0 20px' }}>
                    <Title level={4}>{fullInfo.title}</Title>
                    <Paragraph>{fullInfo.description}</Paragraph>
                    <div className='flex items-center'>
                        <Paragraph className="p-2" style={{ fontSize: '18px' }} mark ><strong>Блиц-цена: </strong> {fullInfo.price} ₽</Paragraph>
                        <Paragraph className="p-2"><strong>Шаг ставки:</strong> 100 ₽</Paragraph>
                    </div>
                    <Paragraph style={{ fontSize: '25px' }} type="success"><strong>Текущая цена: </strong> 50 ₽</Paragraph>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'right' }}>
                        <Button type="primary" danger>Выкупить</Button>
                        <Button type="primary">Сделать ставку</Button>
                    </div>
                </Col>
            </Row>
        </Card >
    );
}

export default FullLotCard;