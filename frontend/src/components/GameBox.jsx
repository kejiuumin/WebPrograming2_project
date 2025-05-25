export default function GameBox({ game }) {
  return (
    <div className="w-1/4 mx-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer">
      <img
        src={game.image}
        alt={game.title}
        className="object-cover w-full h-[180px] rounded-t-2xl"
      />
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="font-bold text-lg truncate">{game.title}</h2>
        <div className="text-gray-500 text-sm flex items-center gap-1">
          <span>장르:</span>
          <span className="font-medium">{game.genre}</span>
        </div>
        <div className="text-gray-500 text-sm flex items-center gap-1">
          <span>출시일:</span>
          <span>{game.release_date}</span>
        </div>
        <div className="flex items-center gap-1 mt-auto">
          <span className="text-yellow-400">★</span>
          <span className="font-semibold text-gray-700">{game.rating}</span>
        </div>
      </div>
    </div>
  );
}
