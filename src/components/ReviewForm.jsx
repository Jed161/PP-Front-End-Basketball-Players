import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ReviewForm({ reviewDetails, handleSubmit, toggleView, children }) {
  let { id } = useParams();

  const [review, setReview] = useState({
    reviewerName: "",
    content: "",
    favorite: false,
    rookieRating: "",
    player_id: id,
  });

  const handleTextChange = (event) => {
    setReview({ ...review, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setReview({ ...review, favorite: !review.favorite });
  };

  useEffect(() => {
    if (reviewDetails) {
      setReview(reviewDetails);
    }
  }, [id, reviewDetails]);

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(review, id);
    if (reviewDetails) {
      toggleView();
    }
    setReview({
      reviewerName: "",
      content: "",
      favorite: false,
      rookieRating: "",
      player_id: id,
    });
    console.log("what is going on");
  };

  return (
    <div className="Edit">
      {children}
      <form onSubmit={onSubmit}>
        <label htmlFor="reviewerName">Name:</label>
        <input
          id="reviewerName"
          value={review.reviewerName}
          type="text"
          onChange={handleTextChange}
          placeholder="Your name"
          required
        />
        <label htmlFor="content">Review:</label>
        <input
          id="content"
          type="text"
          name="content"
          value={review.content}
          placeholder="Your opinion"
          onChange={handleTextChange}
        />

        <label htmlFor="favorite">Favorite:</label>
        <textarea
          id="favorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={review.favorite}
        />

        <label htmlFor="rookieRating">Rating:</label>
        <input
          id="rookieRating"
          type="number"
          name="rookieRating"
          min="0"
          max="10"
          step="1"
          required
          placeholder="Please enter value between 0 and 10"
          value={review.rookieRating}
          onChange={handleTextChange}
        />
       
        <br />

        <input type="submit" />
      </form>
    </div>
  );
};

export default ReviewForm;