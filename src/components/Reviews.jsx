import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";
import ReviewForm from "./ReviewForm";

const API = import.meta.env.VITE_API_URL;

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
  
    useEffect(() => {
      setLoading(true);
      fetch(`${API}/players/${id}/reviews`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((responseJSON) => {
          setReviews(responseJSON.allReviews);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching reviews:', error);
          setLoading(false);
        });
    }, [id, API]);
  
    const handleAdd = (newReview) => {
      fetch(`${API}/players/${id}/reviews`, {
        method: "POST",
        body: JSON.stringify(newReview),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((responseJSON) => {
          setReviews([...reviews, responseJSON]);
        })
        .catch((error) => console.log(error));
    };
  
    const handleDelete = (reviewId) => {
      fetch(`${API}/players/${id}/reviews/${reviewId}`, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const copyReviewArray = [...reviews];
          const indexDeletedReview = copyReviewArray.findIndex(
            (review) => review.id === reviewId
          );
          copyReviewArray.splice(indexDeletedReview, 1);
          setReviews(copyReviewArray);
        })
        .catch((error) => console.log(error));
    };
  
    const handleEdit = (updatedReview) => {
      fetch(`${API}/players/${id}/reviews/${updatedReview.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedReview),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((responseJSON) => {
          const copyReviewArray = [...reviews];
          const indexUpdatedReview = copyReviewArray.findIndex((review) => {
            return review.id === updatedReview.id;
          });
          copyReviewArray[indexUpdatedReview] = responseJSON;
          setReviews(copyReviewArray);
        })
        .catch((error) => console.log(error));
    };
  
    return (
      <section className="Reviews">
        <h2>Reviews</h2>
        <ReviewForm handleSubmit={handleAdd}>
          <h3>Add a New Review</h3>
        </ReviewForm>
        {loading ? (
          <p>Loading...</p>
        ) : (
          reviews.map((review) => (
            <Review
              key={review.id}
              review={review}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        )}
      </section>
    );
  }
  
  export default Reviews;