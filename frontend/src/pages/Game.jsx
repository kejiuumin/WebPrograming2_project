import { useState } from "react";
// import { useParams } from "react-router-dom";
import GameDetails from "../components/Game/GameDetails";
import ReviewForm from "../components/Game/ReviewForm";
import ReviewList from "../components/Game/ReviewList";

export default function Game() {
  // const { id } = useParams();
  const [form, setForm] = useState({ rating: "", comment: "" });
  const [editing, setEditing] = useState(null);

  const game = {
    id: 1,
    title: "Five Nights at Freddy's",
    genre: "공포",
    release_date: "2014. 8. 18.",
    description:
      "수리공을 부르는 것보다 당신을 경비원으로 고용하는 것이 훨씬 저렴했기 때문이죠. 과연 5일 밤을 무사히 살아남을 수 있을까요?",
    image:
      "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDNfMjY4%2FMDAxNjQ4OTg0NDU2NDE1.Gegg1rX5zTyzAFUAu2lGdUg2qi_aTNbJyfIbGaVeR9cg._xCF4d0oFiWWCQtaVO88MipHTqAy3G6YlXKCxK11LiYg.JPEG.eeuu1133%2F%25C7%25C1%25B7%25B9%25B5%25F0%25C0%25C7%25C7%25C7%25C0%25DA%25B0%25A1%25B0%25D4_8.jpg&type=sc960_832",
    rating: "97.1",
  };

  // 임시 리뷰 데이터
  const [reviews, setReviews] = useState([
    {
      review_id: 1,
      user_id: 1,
      username: "게이머1",
      rating: 9,
      comment: "정말 무서웠지만 중독성 있어요!",
      created_at: "2025-05-27T10:00:00",
    },
    {
      review_id: 2,
      user_id: 2,
      username: "게이머2",
      rating: 7,
      comment: "처음 2일은 재밌는데 뒤에 좀 지루해요.",
      created_at: "2025-05-27T11:30:00",
    },
  ]);

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 리뷰 작성/수정
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.rating || !form.comment) return;
    if (editing !== null) {
      setReviews(
        reviews.map((r) =>
          r.review_id === editing
            ? { ...r, rating: Number(form.rating), comment: form.comment }
            : r
        )
      );
      setEditing(null);
    } else {
      setReviews([
        ...reviews,
        {
          review_id: Date.now(),
          user_id: 999,
          username: "나",
          rating: Number(form.rating),
          comment: form.comment,
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setForm({ rating: "", comment: "" });
  };

  // 리뷰 삭제
  const handleDelete = (review_id) => {
    setReviews(reviews.filter((r) => r.review_id !== review_id));
    if (editing === review_id) {
      setEditing(null);
      setForm({ rating: "", comment: "" });
    }
  };

  // 리뷰 수정 모드 진입
  const handleEdit = (review) => {
    setEditing(review.review_id);
    setForm({ rating: review.rating, comment: review.comment });
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <GameDetails game={game} />

      {/* 리뷰 섹션 */}
      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">리뷰</h2>
        <ReviewForm
          form={form}
          onSubmit={handleSubmit}
          onFormChange={handleFormChange}
          onCancel={() => {
            setEditing(null);
            setForm({ rating: "", comment: "" });
          }}
          isEditing={editing !== null}
        />
        <ReviewList
          reviews={reviews}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
