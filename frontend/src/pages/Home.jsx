import Banner from "../components/Home/Banner";
import GameBoxs from "../components/Home/GameBoxs";

export default function Home() {
  const games = [
    {
      title: "Five Nights at Freddy's",
      genre: "공포",
      release_date: "2014. 8. 18.",
      description:
        "수리공을 부르는 것보다 당신을 경비원으로 고용하는 것이 훨씬 저렴했기 때문이죠. 과연 5일 밤을 무사히 살아남을 수 있을까요?",
      image:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA0MDNfMjY4%2FMDAxNjQ4OTg0NDU2NDE1.Gegg1rX5zTyzAFUAu2lGdUg2qi_aTNbJyfIbGaVeR9cg._xCF4d0oFiWWCQtaVO88MipHTqAy3G6YlXKCxK11LiYg.JPEG.eeuu1133%2F%25C7%25C1%25B7%25B9%25B5%25F0%25C0%25C7%25C7%25C7%25C0%25DA%25B0%25A1%25B0%25D4_8.jpg&type=sc960_832",
      rating: "97.1",
    },
    {
      title: "The Exit 8",
      genre: "공포",
      release_date: "2023. 11. 29.",
      description:
        '당신은 끝없는 지하 통로에 갇혀있습니다. 주변을 주의 깊게 관찰하여 "8번 출구"에 도달하세요.',
      image:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAyMDVfNiAg%2FMDAxNzA3MTI5MzAzMTk4.pCp4hqKemFUxjXwkQADddKQscgxbRfSEAWkTnZ8UqPYg.hsglHFVXLLACVUcCvA9oJC9F0FPoRFFF_j2YK7QPSvIg.JPEG.mssixx%2FIMG_5773.jpg&type=sc960_832",
      rating: "97.2",
    },
    {
      title: "R.E.P.O.",
      genre: "공포",
      release_date: "2025. 2. 26.",
      description:
        "최대 6명의 플레이어와 함께하는 온라인 협력 호러 게임. 완전한 물리 기반의 값진 물건을 찾아 조심스럽게 다루고, 이를 회수해 탈출하여 창조주의 욕망을 충족시키세요.",
      image:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MjNfMjgy%2FMDAxNzI3MDY3OTczMTIz.FGcLjZI0CWah0rjhXgpnsEn-yl77InBLVIC2SEreExcg.813PimIMtMZbmycAk1ycZLtfvxdR7TW0LdB_OwAKuJgg.JPEG%2F1.jpg&type=sc960_832",
      rating: "97.8",
    },
    {
      title: "Escape the Backrooms",
      genre: "공포",
      release_date: "2022. 8. 12.",
      description:
        "플레이어는 숨어 있는 것의 손아귀에 있으며 탈출하기 위해 필요한 모든 조치를 취해야 합니다.",
      image:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA5MjNfMjgy%2FMDAxNzI3MDY3OTczMTIz.FGcLjZI0CWah0rjhXgpnsEn-yl77InBLVIC2SEreExcg.813PimIMtMZbmycAk1ycZLtfvxdR7TW0LdB_OwAKuJgg.JPEG%2F1.jpg&type=sc960_832",
      rating: "92.1",
    },
  ];

  return (
    <div>
      <div className="max-w-full mx-10">
        <Banner />
        <GameBoxs games={games} title="사용자 추천 게임" />
        <GameBoxs games={games} title="인기 게임" />
        <GameBoxs games={games} title="최신 게임" />
      </div>
    </div>
  );
}
