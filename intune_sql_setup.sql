-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2022 at 12:48 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `intune`
--

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `tr_name` char(255) NOT NULL,
  `ar_name` char(255) NOT NULL,
  `user` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `tr_name`, `ar_name`, `user`) VALUES
(41, 'Poor Me Blues', 'Edna Hicks', 'user'),
(42, 'April Kisses', 'Eddie Lang', 'user'),
(43, 'A Lazy Farmer Boy', 'Buster Carter And Preston Young', 'user'),
(44, 'Im Sober Now', 'Pine Top Smith', 'user'),
(45, 'Pinetops Boogie Woogie', 'Pine Top Smith', 'user'),
(46, 'Little Bits', 'Johnny Dodds Trio', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `t_id` int(11) NOT NULL,
  `track_name` char(255) NOT NULL,
  `artist_name` char(255) NOT NULL,
  `album_name` char(255) NOT NULL,
  `year` int(11) NOT NULL,
  `artwork` varchar(999) NOT NULL,
  `track_ref` varchar(999) NOT NULL,
  `owner` char(255) NOT NULL,
  `yes_count` int(255) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`t_id`, `track_name`, `artist_name`, `album_name`, `year`, `artwork`, `track_ref`, `owner`, `yes_count`) VALUES
(44, 'In The Dark Flashes', 'Jess Stacy', 'Best of the Public Domain', 1930, '4945fd44-fc30-4a60-bee5-4bcbeca43256-phpic.png', 'a739717e-6373-4933-ad40-1f86d8827b86-In_The_Dark_Flashes.mp3', 'user', 1),
(45, 'April Kisses', 'Eddie Lang', 'Best of the Public Domain', 1929, 'fe7da9ba-ec15-4782-ab16-484d1698c361-phpic.png', '752c9dc2-686e-48a3-9a8d-bc412e798306-April_Kisses.mp3', 'user', 1),
(46, 'Little Bits', 'Johnny Dodds Trio', 'Best of the Public Domain', 1929, 'f5edc3f6-4cce-4364-b09a-6a0e0509896b-phpic.png', '23769d4f-bcee-4c33-ad5e-344657b74fd9-Little_Bits.mp3', 'user', 1),
(47, 'A Lazy Farmer Boy', 'Buster Carter And Preston Young', 'Best of the Public Domain', 1931, '55439c84-1817-42cc-b078-a874f4bdd9d3-phpic.png', 'd9981a87-042d-4275-9349-db84c35c620a-A Lazy Farmer Boy by Buster Carter And Preston Young.mp3', 'user', 1),
(48, 'Dont Go Way Nobody', 'George Lewis and His New Orleans Stompers', 'Best of the Public Domain', 1943, '78c767f9-508a-466c-a195-6af6c20ca54c-phpic.png', '760329db-c863-461f-aa4d-04438edf8771-Dont_Go_Way_Nobody.mp3', 'user', 1),
(49, 'Im Sober Now', 'Pine Top Smith', 'Best of the Public Domain', 1929, '7481810b-c5a5-417e-a832-627a619ab35f-phpic.png', '1e0d48b8-fa02-43a4-958b-5a45e53fe4b2-Im_Sober_Now.mp3', 'user', 1),
(50, 'Pinetops Boogie Woogie', 'Pine Top Smith', 'Best of the Public Domain', 1928, 'bc096e22-3710-4357-a6a8-b0fa057b0532-phpic.png', 'db23c599-be25-442d-b868-2e650eaa7950-Pinetops_Boogie_Woogie.mp3', 'user', 2),
(51, 'Waiting For A Train', 'Jimmy Rodgers', 'Best of the Public Domain', 1928, 'd727beda-2d6c-404e-8938-c8e64c92010e-phpic.png', 'adc8312c-b57d-48a2-970f-4a43285f835c-Waiting_For_A_Train.mp3', 'user', 0),
(52, 'Poor Me Blues', 'Edna Hicks', 'Best of the Public Domain', 1929, 'f4f5e40f-311d-4883-9245-376de31d6315-phpic.png', '67e6a007-13bd-412a-9b0d-f3ee555e6e0f-Poor_Me_Blues.mp3', 'user', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` char(25) NOT NULL,
  `email` char(255) NOT NULL,
  `password` char(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(35, 'user', 'root@user.test', '$2b$10$asptyyFeAX26StSLmkTe8O6vYWnwLGzdgJskd03pP5K9i3reM0Ify');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`);

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`t_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `t_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
