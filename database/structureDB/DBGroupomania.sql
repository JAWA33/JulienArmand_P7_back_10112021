-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: localhost    Database: groupcom
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gc_comments`
--

DROP TABLE IF EXISTS `gc_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gc_comments` (
  `id_comment` int(11) NOT NULL AUTO_INCREMENT,
  `comment_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_create` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `comment_id_post` int(11) NOT NULL,
  `comment_id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_comment`),
  KEY `fk_gc_comments_gc_posts1_idx` (`comment_id_post`),
  KEY `fk_gc_comments_gc_users1_idx` (`comment_id_user`),
  CONSTRAINT `fk_gc_comments_gc_posts1` FOREIGN KEY (`comment_id_post`) REFERENCES `gc_posts` (`id_post`) ON DELETE CASCADE,
  CONSTRAINT `fk_gc_comments_gc_users1` FOREIGN KEY (`comment_id_user`) REFERENCES `gc_users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gc_instantcom`
--

DROP TABLE IF EXISTS `gc_instantcom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gc_instantcom` (
  `id_instantcom` int(11) NOT NULL AUTO_INCREMENT,
  `instantcom_message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `instantcom_sender` int(11) NOT NULL,
  `instantcom_recipient` int(11) NOT NULL,
  `instantcom_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `instantcom_read` enum('True','False') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'False',
  PRIMARY KEY (`id_instantcom`),
  KEY `fk_gc_instantcoms_has_gc_users_gc_users1_idx` (`instantcom_sender`),
  CONSTRAINT `fk_gc_instantcoms_has_gc_users_gc_users1` FOREIGN KEY (`instantcom_sender`) REFERENCES `gc_users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gc_jobs`
--

DROP TABLE IF EXISTS `gc_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gc_jobs` (
  `id_job` tinyint(100) NOT NULL,
  `job_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_id_service` tinyint(50) NOT NULL,
  `job_position` tinyint(10) NOT NULL,
  PRIMARY KEY (`id_job`),
  UNIQUE KEY `id_job_UNIQUE` (`id_job`),
  KEY `fk_gc_jobs_gc_services1_idx` (`job_id_service`),
  CONSTRAINT `fk_gc_jobs_gc_services1` FOREIGN KEY (`job_id_service`) REFERENCES `gc_services` (`id_service`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gc_likes`
--

DROP TABLE IF EXISTS `gc_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gc_likes` (
  `id_like` int(11) NOT NULL AUTO_INCREMENT,
  `like_id_post` int(11) NOT NULL,
  `like_id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_like`),
  KEY `fk_gc_likes_gc_posts1_idx` (`like_id_post`),
  KEY `fk_gc_likes_gc_users1_idx` (`like_id_user`),
  CONSTRAINT `fk_gc_likes_gc_posts1` FOREIGN KEY (`like_id_post`) REFERENCES `gc_posts` (`id_post`) ON DELETE CASCADE,
  CONSTRAINT `fk_gc_likes_gc_users1` FOREIGN KEY (`like_id_user`) REFERENCES `gc_users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=226 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gc_posts`
--

DROP TABLE IF EXISTS `gc_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gc_posts` (
  `id_post` int(11) NOT NULL AUTO_INCREMENT,
  `post_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `post_text` text COLLATE utf8mb4_unicode_ci,
  `post_url_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_id_user` int(11) NOT NULL,
  `post_video` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_post`),
  KEY `linkId_idx` (`post_id_user`),
  CONSTRAINT `linkId` FOREIGN KEY (`post_id_user`) REFERENCES `gc_users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=246 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gc_services`
--

DROP TABLE IF EXISTS `gc_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gc_services` (
  `id_service` tinyint(50) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_service`),
  UNIQUE KEY `id_service_UNIQUE` (`id_service`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gc_users`
--

DROP TABLE IF EXISTS `gc_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gc_users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `user_firstname` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_lastname` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_age` timestamp NULL DEFAULT NULL,
  `user_bio` text COLLATE utf8mb4_unicode_ci,
  `user_skill` text COLLATE utf8mb4_unicode_ci,
  `user_hobbie` text COLLATE utf8mb4_unicode_ci,
  `user_url_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id_job` tinyint(100) NOT NULL,
  `user_status` enum('Administrateur','Moderateur','Utilisateur') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Utilisateur',
  `user_lastconnect` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-10  9:28:53
