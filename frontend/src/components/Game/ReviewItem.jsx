export default function ReviewItem({ review, onEdit, onDelete }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 rounded p-4 mb-3">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-blue-600">{review.username}</span>
          <span className="text-yellow-500 font-bold">
            ★ {review.rating}/10
          </span>
          <span className="text-xs text-gray-400 ml-2">
            {new Date(review.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="text-gray-800">{review.comment}</div>
      </div>
      <div className="flex gap-2 mt-2 sm:mt-0">
        <button
          onClick={() => onEdit(review)}
          className="text-blue-500 hover:underline"
        >
          수정
        </button>
        <button
          onClick={() => onDelete(review.review_id)}
          className="text-red-500 hover:underline"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
