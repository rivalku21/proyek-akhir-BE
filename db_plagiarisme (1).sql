-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2021 at 02:01 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_plagiarisme`
--

-- --------------------------------------------------------

--
-- Table structure for table `file_data`
--

CREATE TABLE `file_data` (
  `id` int(50) NOT NULL,
  `title` varchar(200) NOT NULL,
  `author` varchar(50) NOT NULL,
  `nim` bigint(50) NOT NULL,
  `lecture1` varchar(200) NOT NULL,
  `lecture2` varchar(200) NOT NULL,
  `year` year(4) NOT NULL,
  `file` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `file_data`
--

INSERT INTO `file_data` (`id`, `title`, `author`, `nim`, `lecture1`, `lecture2`, `year`, `file`) VALUES
(9, 'PERANCANGAN DAN IMPLEMENTASI SISTEM DETEKSI PLAGIARISME PROYEK AKHIR DENGAN METODE COSINE SIMILARITY', 'Rival Fauzi', 6705184127, 'Muhammad Iqbal', 'Tita haryanti', 2021, 'http://localhost:3001/public/uploads/data/98ee1f4a50b03c081c300783ba44cb3efea7.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `lecture`
--

CREATE TABLE `lecture` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `dosen_code` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lecture`
--

INSERT INTO `lecture` (`id`, `name`, `dosen_code`) VALUES
(1, 'Indrarini Dyah Irawati ', 'IDI'),
(2, 'Radial Anwar', 'RDL'),
(3, 'Hafiduddin', 'HFD'),
(4, 'Agus Ganda Permana', 'AGD'),
(5, 'Asep Mulyana', 'ASM'),
(6, 'Denny Darlis', 'DYD'),
(7, 'Tengku Ahmad Riza', 'TAR'),
(8, 'Hasanah Putri', 'HPT'),
(9, 'Rohmat Tulloh', 'RMT'),
(10, 'Tri Nopiani Damayanti', 'TND'),
(11, 'Yuyun Siti Rohmah', 'YSR'),
(12, 'Suci Aulia', 'SCA'),
(13, 'Dadan Nur Ramadan', 'DUM'),
(14, 'Dwi Andi Nurmantris', 'DNN'),
(15, 'Atik Novianti', 'ATV'),
(16, 'Aris Hartaman', 'AIM'),
(17, 'Yuli Sun Hariyani', 'YSN'),
(18, 'Unang Sunarya', 'USA'),
(19, 'Sugondo Hadiyoso', 'SGO'),
(20, 'Tita haryanti', 'THY'),
(21, 'Muhammad Iqbal', 'MIQ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `file_data`
--
ALTER TABLE `file_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lecture`
--
ALTER TABLE `lecture`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `file_data`
--
ALTER TABLE `file_data`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `lecture`
--
ALTER TABLE `lecture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
