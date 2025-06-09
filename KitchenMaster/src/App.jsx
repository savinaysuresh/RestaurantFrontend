import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import OrdersBoard from './components/OrdersBoard';
import './App.css';

const sortOrder = {
  ordered: 1,
  preparing: 2,
  prepared: 3,
  taken: 4,
  declined: 5,
};

const App = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = [
        { table: 1, items: ['1 Chicken Noodles', '1 Paneer Tikka'], status: 'ordered' },
        { table: 2, items: ['2 Chicken Biryani', '2 Naan'], status: 'preparing' },
        { table: 3, items: ['1 Veg Burger', '1 Fries'], status: 'prepared' },
        { table: 4, items: ['1 Pizza', '2 Cokes'], status: 'ordered' },
        { table: 5, items: ['1 Grilled Sandwich'], status: 'preparing' },
        { table: 6, items: ['1 Chocolate Cake'], status: 'prepared' }
      ];
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const updateStatus = (table, newStatus) => {
    setOrders(prev =>
      prev
        .map(order =>
          order.table === table ? { ...order, status: newStatus } : order
        )
        .filter(order => order.status !== 'taken')
    );
  };

  const sortedOrders = [...orders].sort((a, b) => sortOrder[a.status] - sortOrder[b.status]);

  return (
    <>
      <Header />
      <main className="main-content">
        <OrdersBoard orders={sortedOrders} updateStatus={updateStatus} />
      </main>
    </>
  );
};

export default App;
