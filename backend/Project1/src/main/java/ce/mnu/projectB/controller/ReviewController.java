package ce.mnu.projectB.controller;

import ce.mnu.projectB.domain.Game;
import ce.mnu.projectB.domain.Review;
import ce.mnu.projectB.domain.SiteUser;
import ce.mnu.projectB.service.GameService;
import ce.mnu.projectB.service.ReviewService;
import ce.mnu.projectB.service.SiteUserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/projectB/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private GameService gameService;

    @Autowired
    private SiteUserService siteUserService;

    @PostMapping("/write")
    public String writeReview(@RequestParam Long gameId,
                              @RequestParam int rating,
                              @RequestParam String content,
                              @RequestParam(required = false) Integer page,
                              @RequestParam(required = false) String keyword,
                              @RequestParam(required = false) String sort,
                              @RequestParam(required = false) Long genreId,
                              HttpSession session) {
        String email = (String) session.getAttribute("email");
        if (email == null) {
            return "redirect:/projectB/login";
        }

        SiteUser user = siteUserService.findByEmail(email);
        Game game = gameService.getGameById(gameId);

        // 이미 작성한 리뷰가 있다면 작성 금지
        if (reviewService.hasUserReviewedGame(user, game)) {
            return buildRedirect(gameId, page, keyword, sort, genreId);
        }

        Review review = new Review();
        review.setGame(game);
        review.setUser(user);
        review.setRating(rating);
        review.setContent(content);

        reviewService.saveReview(review);

        return buildRedirect(gameId, page, keyword, sort, genreId);
    }

    private String buildRedirect(Long gameId, Integer page, String keyword, String sort, Long genreId) {
        StringBuilder url = new StringBuilder("redirect:/projectB/game/detail/" + gameId + "?");

        url.append("page=").append(page != null ? page : 0);
        if (keyword != null && !keyword.isBlank()) url.append("&keyword=").append(keyword);
        if (sort != null && !sort.isBlank()) url.append("&sort=").append(sort);
        if (genreId != null) url.append("&genreId=").append(genreId);

        return url.toString();
    }

    @GetMapping("/edit/{id}")
    public String editReviewForm(@PathVariable Long id, HttpSession session, Model model) {
        String email = (String) session.getAttribute("email");
        if (email == null) return "redirect:/projectB/login";

        Review review = reviewService.getReviewById(id);
        if (!review.getUser().getEmail().equals(email)) return "redirect:/projectB/";

        model.addAttribute("review", review);
        return "review_edit";
    }

    @PostMapping("/edit/{id}")
    public String editReviewSubmit(@PathVariable Long id,
                                   @RequestParam int rating,
                                   @RequestParam String content,
                                   @RequestParam Long gameId,
                                   HttpSession session) {
        String email = (String) session.getAttribute("email");
        if (email == null) return "redirect:/projectB/login";

        Review review = reviewService.getReviewById(id);
        if (review != null && review.getUser().getEmail().equals(email)) {
            review.setRating(rating);
            review.setContent(content);
            reviewService.saveReview(review);
        }

        return "redirect:/projectB/game/detail/" + gameId;
    }

    @PostMapping("/delete/{id}")
    public String deleteReview(@PathVariable Long id,
                               @RequestParam Long gameId,
                               HttpSession session) {

        String email = (String) session.getAttribute("email");
        if (email == null) {
            return "redirect:/projectB/login";
        }

        SiteUser user = siteUserService.findByEmail(email);
        Review review = reviewService.getReviewsByUser(user)
                                     .stream()
                                     .filter(r -> r.getId().equals(id))
                                     .findFirst()
                                     .orElse(null);

        if (review != null) {
            reviewService.deleteReview(id);
        }

        return "redirect:/projectB/game/detail/" + gameId;
    }
}