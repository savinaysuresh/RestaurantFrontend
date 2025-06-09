import React from 'react';

const OrdersBoard = ({ orders, updateStatus }) => {
  const createButton = (text, className, handler) => (
    <button className={className} onClick={handler}>{text}</button>
  );

  return (
    <div id="orders">
      {orders.map(order => (
        <div key={order.table} className="order-card" data-status={order.status}>
          <div className="order-header">
            <strong>Table {order.table}</strong>
            <em className={`status-label ${order.status}`}>{order.status}</em>
          </div>
          <ul className="order-items">
            {order.items.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
          <div className="buttons">
            {order.status === 'ordered' && (
              <>
                {createButton('Accept', 'accept', () => updateStatus(order.table, 'preparing'))}
                {createButton('Decline', 'decline', () => updateStatus(order.table, 'declined'))}
              </>
            )}
            {order.status === 'preparing' &&
              createButton('Prepared', 'ready', () => updateStatus(order.table, 'prepared'))}
            {order.status === 'prepared' &&
              createButton('Taken', 'take', () => updateStatus(order.table, 'taken'))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersBoard;
