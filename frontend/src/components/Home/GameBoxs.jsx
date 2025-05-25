import { Link } from "react-router-dom";
import GameBox from "../GameBox";

export default function GameBoxs({ games, title }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mx-10 mt-10 mb-2">
        <h3 className="text-2xl/loose font-bold">{title}</h3>
        <Link
          to="/games"
          className="px-5 py-2  text-white bg-black block rounded-sm"
        >
          더 보기
        </Link>
      </div>
      <div className="w-full flex items-center justify-center">
        {games.map((game, idx) => (
          <GameBox key={idx} game={game} />
        ))}
      </div>
    </div>
  );
}
