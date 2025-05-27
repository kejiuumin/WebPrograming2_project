package ce.mnu.projectB.service;

import ce.mnu.projectB.domain.SiteUser;
import ce.mnu.projectB.domain.Genre;
import ce.mnu.projectB.repository.SiteUserRepository;
import ce.mnu.projectB.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SiteUserService {

    @Autowired
    private SiteUserRepository siteUserRepository;

    @Autowired
    private GenreRepository genreRepository;

    public void registerUser(SiteUser user) {
        siteUserRepository.save(user);
    }
    public void updateUser(SiteUser user) {
        siteUserRepository.save(user);
    }

    public SiteUser findByEmail(String email) {
        return siteUserRepository.findByEmail(email).orElse(null);
    }

    public Genre getFavoriteGenre(Long genreId) {
        return genreRepository.findById(genreId).orElse(null);
    }
}