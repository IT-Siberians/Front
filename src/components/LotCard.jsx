import { EditOutlined, EllipsisOutlined, FieldBinaryOutlined, SearchOutlined, SettingOutlined, SolutionOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row } from 'antd';
const { Meta } = Card;

function LotCard(props) {
    const { lot } = props

    return (
        <Card
            title={lot.title}
            style={{
                width: 300,
            }}
            cover={
                <img className="object-cover h-48 w-96"
                    alt={lot.title}
                    src={lot.image}
                />
            }
            actions={[
                <SearchOutlined />,
                <FieldBinaryOutlined />,
                <SolutionOutlined />
            ]}
        >
            <Meta
                description={
                    <>
                        <p>{lot.description.slice(0, 100) + (lot.description.length > 100 ? '...' : '')}</p>
                        <p className='text-right text-orange-500'><b>{lot.price}	&#x20bd;</b></p>
                    </>
                }

            />
        </Card>
    )
}

export default LotCard