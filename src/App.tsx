import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import { MapContainer } from './components/map/MapContainer';
import { OrderList } from './components/OrderList/OrderList';
import { EditForm } from './components/EditForm/EditForm';
import { clearCurrentOrder, setCurrentOrder } from './store/OrderSlice';

import './App.css';
import 'react-splitter-layout/lib/index.css'
import { Order } from './types/types';


const App = () => {
  const [editFormOpen, setEditFormOpen] = useState(false);
  
  const dispatch = useDispatch()

  const openEditForm = (type: string, order?: Order): void => {
    if (type==='edit') {
      dispatch(setCurrentOrder(order!));
    } else {
      dispatch(clearCurrentOrder());
    }
    setEditFormOpen(true)
  }

  return (
      <div className='App'>
        <SplitterLayout customClassName='splitter' vertical={false} percentage primaryIndex={1} primaryMinSize={40} secondaryMinSize={40}>
          <OrderList openEditForm={openEditForm} />
          <MapContainer />
        </SplitterLayout>
        {editFormOpen && <EditForm toggleEditForm={setEditFormOpen} />}
      </div>
  );
}

export default App;
