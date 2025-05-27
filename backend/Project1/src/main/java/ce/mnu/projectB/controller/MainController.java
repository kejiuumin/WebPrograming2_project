package ce.mnu.projectB.controller;

import ce.mnu.projectB.domain.Game;
import ce.mnu.projectB.domain.Genre;
import ce.mnu.projectB.domain.Review;
import ce.mnu.projectB.domain.SiteUser;
import ce.mnu.projectB.service.GenreService;
import ce.mnu.projectB.service.ReviewService;
import ce.mnu.projectB.service.SiteUserService;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/projectB")
public class MainController {

    @Autowired
    private SiteUserService siteUserService;

    @Autowired
    private GenreService genreService;

    @Autowired
    private ReviewService reviewService;

    // 메인 페이지
    @GetMapping("/")
    public String start(Model model, HttpSession session) {
        String email = (String) session.getAttribute("email");
        if (email != null) {
            SiteUser user = siteUserService.findByEmail(email);
            Long genreId = user.getFavoriteGenre().getId();
            List<Game> all = reviewService.getRecommendedGamesByGenre(genreId);

            for (Game game : all) {
                game.setAvgRating(reviewService.getAverageRatingByGameId(game.getId()));
            }

            List<Game> top3 = all.stream()
                    .sorted(Comparator.comparingDouble((Game g) ->
                            g.getAvgRating() != null ? g.getAvgRating() : 0.0
                    ).reversed())
                    .limit(3)
                    .collect(Collectors.toList());

            model.addAttribute("recommendedGames", top3);
        }

        return "start";
    }

    @GetMapping("/register")
    public String registerForm(Model model) {
        List<Genre> genres = genreService.getAllGenres();
        model.addAttribute("genres", genres);
        model.addAttribute("user", new SiteUser());
        return "register";
    }

    @PostMapping("/register")
    public String registerSubmit(@ModelAttribute SiteUser user) {
        siteUserService.registerUser(user);
        return "redirect:/projectB/login";
    }

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }

    @PostMapping("/login")
    public String loginSubmit(@RequestParam String email,
                              @RequestParam String passwd,
                              HttpSession session,
                              RedirectAttributes redirectAttributes) {
        SiteUser user = siteUserService.findByEmail(email);
        if (user != null && user.getPasswd().equals(passwd)) {
            session.setAttribute("email", user.getEmail());
            session.setAttribute("user", user);
            return "redirect:/projectB/";
        } else {
            redirectAttributes.addFlashAttribute("loginError", true);
            return "redirect:/projectB/login";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/projectB/";
    }

    @GetMapping("/mypage")
    public String mypage(@RequestParam(defaultValue = "0") int reviewPage,
                         HttpSession session,
                         Model model) {
        String email = (String) session.getAttribute("email");
        if (email == null) return "redirect:/projectB/login";

        SiteUser user = siteUserService.findByEmail(email);
        List<Genre> genres = genreService.getAllGenres();

        Pageable pageable = PageRequest.of(reviewPage, 4); // 마이 페이지 내가 작성한 리뷰 한 페이지에 4개씩
        Page<Review> pagedReviews = reviewService.getReviewsByUserPaged(user, pageable);

        model.addAttribute("user", user);
        model.addAttribute("genres", genres);
        model.addAttribute("reviews", pagedReviews.getContent());
        model.addAttribute("reviewPage", pagedReviews);

        return "mypage";
    }

    @PostMapping("/user/update")
    public String updateUserInfo(@RequestParam("passwd") String passwd,
                                 @RequestParam("favoriteGenreId") Long favoriteGenreId,
                                 HttpSession session) {
        String email = (String) session.getAttribute("email");
        if (email == null) return "redirect:/projectB/login";

        SiteUser user = siteUserService.findByEmail(email);

        if (passwd != null && !passwd.isBlank()) {
            user.setPasswd(passwd);
        }

        Genre newGenre = new Genre();
        newGenre.setId(favoriteGenreId);
        user.setFavoriteGenre(newGenre);

        siteUserService.registerUser(user);
        return "redirect:/projectB/mypage";
    }
}