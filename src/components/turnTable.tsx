import { Table, Popconfirm, notification } from 'antd';
import { IFilter } from '../models/filterTurn';
import { useSelector,useDispatch } from 'react-redux';
import API from '../helper/api';
import { fetchTurns } from '../redux/turnsGetSlice';
import { setFilterValue} from "../redux/turnFilterValuesSlice";

export default function TurnTable() {
  
  const turns= useSelector((state:any)=>state.turns);
  const filterValues = useSelector((state:any) => state.turnFilterValues);
  const dispatch:any =useDispatch();

  const deletePopOnConfirm = (id:any) => {
    const forDeletingEntity = {
      id: id,
      deletoryId: crypto.randomUUID()
    }
    API.delete('/turn/', {
      data: forDeletingEntity
    }).then(function () {
      notification.open({
        message: 'Silme İşlemi Başarılı',
      });
     dispatch(fetchTurns(filterValues.value));
     
    }).catch(function (error) {
      notification.open({
        message: 'Hata',
        description:
          error.response.data,
      });
    });
  };
 function paginationOnChange(page:any){
  var filterValuesPagination: IFilter = {
    machineId: filterValues.value.machineId,
    studentId: filterValues.value.studentId,
    date: filterValues.value.date,
    pageNo: page
  };
  dispatch(setFilterValue(filterValuesPagination));
  dispatch(fetchTurns(filterValuesPagination));
  }

  const columns:any = [
    {
      id:'dateCol',
      title: 'Tarih',
      dataIndex: 'date',
      key: 'date',
      sorter: (a:any, b:any) => a.date.localeCompare(b.date),
    },
    {
      id:'hourCol',
      title: 'Saat',
      dataIndex: 'hour',
      key: 'hour',
      sorter: (a:any, b:any) => a.hour.localeCompare(b.date),

    },
    {
      id:'machineCol',
      title: 'Makine',
      dataIndex: 'machineNo',
      key: 'machineNo',
      sorter: (a:any, b:any) => a.machineNo - b.machineNo,
    },
    {
      id:'nameCol',
      title: 'Öğrenci Adı',
      dataIndex: 'studentName',
      key: 'studentName',
      sorter: (a:any, b:any) => a.studentName.localeCompare(b.studentName),

    },
    {
      id:'surnameCol',
      title: 'Soyadı',
      dataIndex: 'studentSurname',
      key: 'studentSurname',
      sorter: (a:any, b:any) => a.studentSurname.localeCompare(b.studentSurname),

    },
    {
      id:'roomNoCol',
      title: 'Oda',
      dataIndex: 'studentRoomNo',
      key: 'studentRoomNo',
      sorter: (a:any, b:any) => a.studentRoomNo - b.studentRoomNo,
    },
    {
      id:'deleteCol',
      fixed: 'right',
      title: 'İşlem',
      dataIndex: 'operation',
      render: (_:any, record:any) =>
        turns.data.item1.length >= 1 ? (
          <Popconfirm
            id="deletePop"
            title="Silmek istediğine emin misin?"
            okText="Evet"
            cancelText="Hayır"
            onConfirm={() => deletePopOnConfirm(record.id)}>
            <a id='deleteButton'>Sil</a>
          </Popconfirm>
        ) : null,
    }
  ];
  return (
    <Table
      id='turnTable'
      dataSource={turns.data.item1}
      columns={columns}
      pagination={{defaultPageSize: 3,total:turns.data.item2,onChange:paginationOnChange}}
      rowKey="id" 
      scroll={{
        x: 1300,
      }}
      footer={() =>  turns.data.item2 != undefined ? 'Toplam kayıt: ' + turns.data.item2 : 'Toplam kayıt: 0'}
      ></Table>
      
  );
}