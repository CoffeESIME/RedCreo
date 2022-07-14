import Layout from "../../../components/Layout/index.js";
import { useRouter } from "next/router";
import { genericUser, getStars } from "../../../actions/user";
import { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

import ReviewForm from "../../../components/ReviewForm/index.js";
function GenericUser() {
  const Router = useRouter();
  const { id } = Router.query;
  const [data, setData] = useState();
  const [viewReviewModal, setViewReviewModal] = useState(false);
  const [review, setReview] = useState();

  useEffect(() => {
    const getData = async () => {
      const dataPartner = await genericUser(id);
      const dataReview = await getStars(id);
      setData(dataPartner.data);
      let count = 0;
      dataReview.data.results.forEach((e) => {
        count += e.stars_review;
      });
      count = count / dataReview.data.results.length;
      setReview(count);
    };
    if (id) {
      getData();
    }
  }, [id]);

  const handleViewModal = () => {
    setViewReviewModal(!viewReviewModal);
  };
  return (
    <div>
      <Layout>
        {review && (
          <ReactStars
            count={5}
            size={50}
            edit={false}
            value={review}
            isHalf={true}
            activeColor="red"
          />
        )}
        <h1>{data && data.user.user_first_name} </h1>
        Esta validado en AVA con los
        siguientes cursos:
        <Table>
          <thead>
            <tr>
              <th>Curso</th>
              <th>Credencial</th>
              <th>Fecha de obtención</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.courses.map((course) => {
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
        <h2>Calificacion General de clientes</h2>
        <Button onClick={handleViewModal}>Calificar Usuario</Button>
        <Modal show={viewReviewModal}>
          <ReviewForm handleViewModal={handleViewModal} userId={id} />
        </Modal>
      </Layout>
    </div>
  );
}

export default GenericUser;
