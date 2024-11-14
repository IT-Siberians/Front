import { useEffect, useState } from 'react'
import LotCard from './components/LotCard'
import Default from './components/Default'
import SearchLotCard from './components/SearchLotCard'
import EditLotCard from './components/EditLotCard'
import { Col, Row } from 'antd';
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
const items = [
  {
    key: 'g1',
    label: 'Lots',
    type: 'group',
    children: [
      {
        key: '1',
        label: 'GetAll (this Seller)',
      },
      {
        key: '2',
        label: 'Add',
      },
      {
        key: '3',
        label: 'GetById',
      },

    ],
  },
];
const App = () => {
  const [lotCards, setLotCards] = useState([])
  const [itemMenu, setItemMenu] = useState()

  const fetchCardLots = () => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setLotCards(res.data)
        console.log(res.data)
      })
  }  

  const menuFunctions = {
    1: fetchCardLots,
  };

  useEffect(() => {
    if (itemMenu in menuFunctions) {
      menuFunctions[itemMenu]();
    }
  }, [itemMenu]);

  const onClick = (e) => {
    setItemMenu(e.key)
  };

  const getComponent = (key) => {
    switch (key) {
      case '1':
        return (<div className='mx-3 my-10'>
          <Row gutter={16}>
          {lotCards.map((lotCard, index) => (
            <Col key={index}>
              <LotCard lot={lotCard} />
            </Col>
          ))}
        </Row></div>);
      case '2':
        return <EditLotCard/>
      case '3':
        return <SearchLotCard index={key} />;
      default:
        return <Default />;
    }
  };

  return (
    <div className='flex'>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
        className='h-screen'
      />
        {getComponent(itemMenu)}
    </div>
  );
};
export default App;