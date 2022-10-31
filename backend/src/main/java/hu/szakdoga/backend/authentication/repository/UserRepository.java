package hu.szakdoga.backend.authentication.repository;

import hu.szakdoga.backend.authentication.data.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

}
