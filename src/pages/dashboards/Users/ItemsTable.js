import React, {useEffect, useState, Fragment} from "react";
import PropTypes from 'prop-types';
// import isEqual from 'lodash.isempty'

import {
  // Card,
  CardHeader,
  // CardTitle,
  Table,
  Button, ButtonGroup
} from "reactstrap";

import {Check} from "react-feather";


const ItemsTable = ({itemsLoading, itemsList, changeItemsFilter, currentFilter}) => {
  // =====getters====
  const getUserClient = user => user.isClient ? user.company : '';
  const getUserGroup = user => user.isAdmin ? 'Администраторы' : 'Пользователи';
  // =================
  // console.log(currentFilter)
  const initialFilters = {
    'isClient': null,
    'isActive': null
  }
  const [filters, setFilter] = useState(initialFilters);
  
  const handleFilterSelect = (value) => {
    const { name, val } = value;

    if (filters[name] !== val) {
      setFilter({...filters, [name]: val})
    }
  }

  useEffect(() => {
    console.log('table: ', filters);
    changeItemsFilter(filters);
  },[filters])

  return (
    // <Card>
    <Fragment>
      {  !itemsLoading && itemsList.length ? 
        ( 
        <div className="table-wrapper">
          <CardHeader>
            <p>isActiveFilter: { filters.isActive }</p>
            {/*<CardTitle tag="h4">Все пользователи</CardTitle>*/}
            <ButtonGroup className="items-filterbar">
              <Button color="primary" size="lg" onClick={()=>handleFilterSelect({name:'isClient', val:null})} active={currentFilter.isClient === null }>Все</Button>
              <Button color="primary" size="lg" onClick={()=>handleFilterSelect({name:'isClient', val:'1'})} active={currentFilter.isClient === '1'}>Внешние</Button>
              <Button color="primary" size="lg" onClick={()=>handleFilterSelect({name:'isClient', val:'0'})} active={currentFilter.isClient === '0'}>Внутренние</Button>
            </ButtonGroup>
      
            <ButtonGroup className="items-filterbar">
              <Button color="primary" size="lg" onClick={()=>handleFilterSelect({name:'isActive', val:null})} active={currentFilter.isActive === null }>Все</Button>
              <Button color="primary" size="lg" onClick={()=>handleFilterSelect({name:'isActive', val:'1'})} active={currentFilter.isActive === '1' }>активные</Button>
              <Button color="primary" size="lg" onClick={()=>handleFilterSelect({name:'isActive', val:'0'})} active={currentFilter.isActive === '0'}>не активные</Button>
            </ButtonGroup>
          </CardHeader>
      
          <Table bordered size="sm" striped className="standard-table centered">
            <thead>
              <tr>
                <th className="id">ID</th>
                <th className="name">Логин</th>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Клиент</th>
                <th>Телефон</th>
                <th>Группа пользователей</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
            { itemsList.map( (user, userIndex) => 
              ( <tr key={'user_item-'+userIndex}>
                  <td>{user.id}</td>
                  <td>{user.login}</td>
                  <td>{user.last_name}</td>
                  <td>{user.first_name}</td>
                  <td>{user.second_name}</td>
                  <td>{getUserClient(user)}</td>
                  <td>{user.phone}</td>
                  <td>{getUserGroup(user)}</td>
                  <td>{user.isActive && <Check size={20} className="text-success" /> }</td>
                </tr>
              ) )
            }          
            </tbody>
          </Table>
        </div>
        ) : null
      }
    </Fragment>
    // </Card>
  );
}

ItemsTable.propTypes = {
  itemsList: PropTypes.array.isRequired,
  changeItemsFilter: PropTypes.func.isRequired,
  currentFilter: PropTypes.object
};

export default ItemsTable