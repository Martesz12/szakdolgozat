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

    @Query("select user from UserEntity user inner join Token token on token.user.id = user.id where token.token = :token and (token.expired = false or token.revoked = false)")
    Optional<UserEntity> findUserByToken(String token);
}
