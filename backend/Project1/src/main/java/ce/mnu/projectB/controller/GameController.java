package ce.mnu.projectB.controller;

import ce.mnu.projectB.domain.Game;
import ce.mnu.projectB.domain.Genre;
import ce.mnu.projectB.domain.Review;
import ce.mnu.projectB.domain.SiteUser;
import ce.mnu.projectB.service.GameService;
import ce.mnu.projectB.service.GenreService;
import ce.mnu.projectB.service.ReviewService;
import ce.mnu.projectB.service.SiteUserService;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/projectB/game")
public class GameController {

    @Autowired
    private GameService gameService;

    @Autowired
    private GenreService genreService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private SiteUserService siteUserService;

    @GetMapping("/list")
    public String listGames(Model model,
                            @RequestParam(required = false) String keyword,
                            @RequestParam(required = false) Long genreId,
                            @RequestParam(required = false) String sort,
                            @RequestParam(defaultValue = "0") int page) {

        Pageable pageable = PageRequest.of(page, 9);
        Page<Game> games;

        if ("popular".equals(sort)) {
            Page<Game> allGames = gameService.getAllGames(PageRequest.of(0, 1000));
            for (Game g : allGames) {
                g.setAvgRating(reviewService.getAverageRatingByGameId(g.getId()));
            }
            List<Game> filtered = allGames.getContent();
            if (genreId != null) {
                filtered = filtered.stream()
                        .filter(g -> g.getGenre().getId().equals(genreId))
                        .collect(Collectors.toList());
            }
            if (keyword != null && !keyword.isEmpty()) {
                filtered = filtered.stream()
                        .filter(g -> g.getTitle().toLowerCase().contains(keyword.toLowerCase()))
                        .collect(Collectors.toList());
            }
            List<Game> sorted = filtered.stream()
                    .sorted(Comparator.comparingDouble((Game g) -> g.getAvgRating() != null ? g.getAvgRating() : 0.0).reversed())
                    .collect(Collectors.toList());

            int start = Math.min(page * 9, sorted.size());
            int end = Math.min((page + 1) * 9, sorted.size());
            games = new PageImpl<>(sorted.subList(start, end), pageable, sorted.size());

        } else if ("recent".equals(sort)) {
            pageable = PageRequest.of(page, 9, Sort.by(Sort.Direction.DESC, "releaseYear"));
            if (genreId != null && keyword != null && !keyword.isEmpty()) {
                Genre genre = genreService.getById(genreId);
                games = gameService.findByGenre(genre, PageRequest.of(0, 1000));
                List<Game> filtered = games.getContent().stream()
                        .filter(g -> g.getTitle().toLowerCase().contains(keyword.toLowerCase()))
                        .collect(Collectors.toList());
                int start = Math.min(page * 9, filtered.size());
                int end = Math.min((page + 1) * 9, filtered.size());
                games = new PageImpl<>(filtered.subList(start, end), pageable, filtered.size());
            } else if (genreId != null) {
                Genre genre = genreService.getById(genreId);
                games = gameService.findByGenre(genre, pageable);
            } else if (keyword != null && !keyword.isEmpty()) {
                games = gameService.searchByTitle(keyword, pageable);
            } else {
                games = gameService.getAllGames(pageable);
            }
        } else {
            if (genreId != null && keyword != null && !keyword.isEmpty()) {
                Genre genre = genreService.getById(genreId);
                games = gameService.findByGenre(genre, PageRequest.of(0, 1000));
                List<Game> filtered = games.getContent().stream()
                        .filter(g -> g.getTitle().toLowerCase().contains(keyword.toLowerCase()))
                        .collect(Collectors.toList());
                int start = Math.min(page * 9, filtered.size());
                int end = Math.min((page + 1) * 9, filtered.size());
                games = new PageImpl<>(filtered.subList(start, end), pageable, filtered.size());
            } else if (genreId != null) {
                Genre genre = genreService.getById(genreId);
                games = gameService.findByGenre(genre, pageable);
            } else if (keyword != null && !keyword.isEmpty()) {
                games = gameService.searchByTitle(keyword, pageable);
            } else {
                games = gameService.getAllGames(pageable);
            }
        }

        for (Game game : games) {
            Double avg = reviewService.getAverageRatingByGameId(game.getId());
            game.setAvgRating(avg);
        }

        model.addAttribute("games", games);
        model.addAttribute("genres", genreService.getAllGenres());
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", games.getTotalPages());
        model.addAttribute("selectedSort", sort);
        model.addAttribute("keyword", keyword);
        model.addAttribute("genreId", genreId);

        return "game_list";
    }

    @GetMapping("/detail/{id}")
    public String gameDetail(@PathVariable Long id,
                             @RequestParam(defaultValue = "0") int reviewPage,
                             @RequestParam(required = false) String keyword,
                             @RequestParam(required = false) String sort,
                             @RequestParam(required = false) Long genreId,
                             @RequestParam(required = false) Integer page,
                             Model model,
                             HttpSession session) {

        Game game = gameService.getGameById(id);
        Double avgRating = reviewService.getAverageRatingByGameId(id);

        Pageable pageable = PageRequest.of(reviewPage, 4);
        Page<Review> reviewPageResult = reviewService.getReviewsByGamePaged(game, pageable);

        boolean hasReviewed = false;
        String email = (String) session.getAttribute("email");
        if (email != null) {
            SiteUser user = siteUserService.findByEmail(email);
            hasReviewed = reviewService.hasUserReviewedGame(user, game);
        }

        model.addAttribute("game", game);
        model.addAttribute("avgRating", avgRating);
        model.addAttribute("reviews", reviewPageResult.getContent());
        model.addAttribute("reviewPage", reviewPageResult);
        model.addAttribute("hasReviewed", hasReviewed);

        model.addAttribute("page", page);
        model.addAttribute("keyword", keyword);
        model.addAttribute("sort", sort);
        model.addAttribute("genreId", genreId);

        return "game_detail";
    }

    @GetMapping("/main")
    public String startPage(HttpSession session, Model model) {
        String email = (String) session.getAttribute("email");

        if (email != null) {
            SiteUser user = siteUserService.findByEmail(email);
            Long favoriteGenreId = user.getFavoriteGenre().getId();

            List<Game> genreGames = gameService.getGamesByGenreId(favoriteGenreId);

            for (Game g : genreGames) {
                g.setAvgRating(reviewService.getAverageRatingByGameId(g.getId()));
            }

            List<Game> top3 = genreGames.stream()
                    .sorted((a, b) -> Double.compare(
                            b.getAvgRating() != null ? b.getAvgRating() : 0.0,
                            a.getAvgRating() != null ? a.getAvgRating() : 0.0
                    ))
                    .limit(3)
                    .collect(Collectors.toList());

            model.addAttribute("recommendedGames", top3);
        }

        return "start";
    }
}