import { useLocation, useNavigate } from "react-router-dom";
import Category from "./../components/Games/Category";

export default function Games() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const sort = query.get("sort") || "popular";

  const handleCategoryClick = (value) => {
    navigate(`/games?sort=${value}`);
  };

  return (
    <div className="max-w-[1200px] mx-auto mt-10">
      <div className="w-full flex items-center justify-between gap-4">
        <Category
          text="인기순"
          to="/games?sort=popular"
          checked={sort === "popular"}
          onClick={() => handleCategoryClick("popular")}
        />
        <Category
          text="최신순"
          to="/games?sort=latest"
          checked={sort === "latest"}
          onClick={() => handleCategoryClick("latest")}
        />
        <Category
          text="장르별"
          to="/games?sort=genre"
          checked={sort === "genre"}
          onClick={() => handleCategoryClick("genre")}
        />
      </div>
    </div>
  );
}
