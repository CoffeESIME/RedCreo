import { useEffect, useState } from "react";
import { getUserCourses } from "../../actions/user";
import { Button, Table, Modal } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { AddCourseForm } from "../AddCourseForm";
import { deleteCourse } from "../../actions/admin";
export default function TableCourses(props) {
  const [userCourses, setUserCourses] = useState();
  const [modalAdd, setModalAdd] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const handleModalAdd = () => {
    setModalAdd(!modalAdd);
  };
  const handleDelete = async (course_id) => {
    deleteCourse(course_id).then((response)=>{
        if(response.data.affectedRows===1){
            console.log('Se ha eliminado correctamente')
            setDeleteMessage('Se ha eliminado correctamente')
        }
        else{
            setDeleteMessage('No se pudo eliminar el curso seleccionado')
        }
    });
  };
  useEffect(() => {
    const getUserData = async () => {
      const dataCourses = await getUserCourses(props.user);
      setUserCourses(dataCourses.data);
    };
    getUserData();
  }, [deleteMessage,modalAdd]);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Credencial</th>
            <th>Fecha de obtención</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {userCourses &&
            userCourses.map((course) => {
              return (
                <tr key={course.credential_id}>
                  <th>{course.course_name}</th>
                  <th>{course.credential_id}</th>
                  <th>{course.issue_date.split("T")[0]}</th>
                  <th>
                    <Button onClick={()=>handleDelete(course.credential_id)}>
                      <MdDeleteForever />
                    </Button>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Button onClick={handleModalAdd}>Añadir</Button>
      <Button onClick={() => props.handleModal("")}>Cerrar</Button>
      <Modal show={modalAdd}>
        <AddCourseForm setShow={setModalAdd} user={props.user}/>
      </Modal>
    </>
  );
}
