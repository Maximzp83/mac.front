import React, { Fragment } from "react";
import PropTypes from 'prop-types';

import {
  // Card,
  // CardHeader,
  // CardTitle,
  Spinner,
  Table,
} from "reactstrap";

import { Check } from "react-feather";


const ItemsTable = ({itemsLoading, itemsList, currentFilter, itemsNames}) => {
  // =====getters====
  const getUserClient = user => user.isClient ? user.company : '';
  const getUserGroup = user => user.isAdmin ? 'Администраторы' : 'Пользователи';
  // =================
  // console.log(currentFilter)
  /*const initialFilters = {
    'isClient': null,
    'isActive': null
  }
  const [filters, setFilter] = useState(initialFilters);*/
  
  /*const handleFilterSelect = (value) => {
    const { name, val } = value;

    if (currentFilter[name] !== val) {
      let newFilters = {...currentFilter, [name]: val}
      changeItemsFilter(newFilters);
    }
  }*/

/*  useEffect(() => {
    console.log('table: ', filters);
    changeItemsFilter(filters);
  },[filters])*/

  return (
    // <Card>
    <Fragment>

      { itemsLoading ? 
        ( <div className="text-center">
            <span className="align-middle"><Spinner size="sm" color="primary"/></span>
            <span className="align-middle preloader-text"> Загрузка {itemsNames.itemsNameMult2}...</span>
          </div>
        ) : 
        !itemsList.length ?
        ( <div className="text-center preloader-text">{itemsNames.itemsNameMult2} не обнаружено</div>) : null
      }

      { !itemsLoading && itemsList.length ? 
        (
          <div className="table-wrapper">

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
  itemsNames: PropTypes.object,
  itemsLoading: PropTypes.bool
};

export {ItemsTable}