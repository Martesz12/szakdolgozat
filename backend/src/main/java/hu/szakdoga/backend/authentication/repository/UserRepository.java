package hu.szakdoga.backend.authentication.repository;

import hu.szakdoga.backend.authentication.data.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    @Query("SELECT user FROM UserEntity user WHERE user.id IN ?1")
    List<UserEntity> findUsersByIds(List<Long> id);

    @Query("SELECT user FROM UserEntity user WHERE ?1 IN (SELECT token.token FROM Token token)")
    Optional<UserEntity> findUserByToken(String token);
}
