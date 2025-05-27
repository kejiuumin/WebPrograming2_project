import ReviewItem from "./ReviewItem";
export default function ReviewList({ reviews, onEdit, onDelete }) {
  return (
    <div>
      {reviews.length === 0 && (
        <div className="text-gray-400 text-center py-6">
          아직 작성된 리뷰가 없습니다.
        </div>
      )}
      {reviews.map((review) => (
        <ReviewItem
          key={review.review_id}
          review={review}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
