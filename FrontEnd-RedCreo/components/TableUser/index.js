import { useEffect, useState } from "react";
import { getUserCourses } from "../../actions/user";
import { Button, Table } from "react-bootstrap";
export default function TableUser(props) {
  const [userCourses, setUserCourses] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const dataCourses = await getUserCourses();
      setUserCourses(dataCourses.data);
    };
    getUserData();
  }, []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Credencial</th>
            <th>Fecha de obtención</th>
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

                </tr>
              );
            })}
        </tbody>
      </Table>
      <Button onClick={() => props.setOpenTable(false)}>Cerrar</Button>

    </>
  );
}
