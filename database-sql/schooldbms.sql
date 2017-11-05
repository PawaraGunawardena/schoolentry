-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 05, 2017 at 03:36 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `schooldbms`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicant`
--

CREATE TABLE `applicant` (
  `applicant_id` varchar(10) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `age` int(11) NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `gender` enum('M','F') DEFAULT 'M',
  `guardian_nic_no` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `applicant_applies_school`
--

CREATE TABLE `applicant_applies_school` (
  `applicant_id` varchar(10) NOT NULL,
  `medium` enum('S','T','E') NOT NULL DEFAULT 'S',
  `distance` int(11) NOT NULL,
  `school_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `applicant_interview_school`
--

CREATE TABLE `applicant_interview_school` (
  `applicant_id` varchar(10) NOT NULL,
  `medium` enum('S','T','E') NOT NULL DEFAULT 'S',
  `distance` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `marks_for_distance` int(11) NOT NULL DEFAULT '0',
  `marks_for_reference_student` int(11) NOT NULL DEFAULT '0',
  `marks_for_documents` int(11) NOT NULL DEFAULT '0',
  `marks_for_present_reference_student` int(11) NOT NULL DEFAULT '0',
  `total_marks` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `applicant_referencing_new_student`
--

CREATE TABLE `applicant_referencing_new_student` (
  `applicant_id` varchar(10) NOT NULL,
  `new_student_id` varchar(10) NOT NULL,
  `kinship` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `applicant_referencing_old_student`
--

CREATE TABLE `applicant_referencing_old_student` (
  `applicant_id` varchar(10) NOT NULL,
  `old_student_id` varchar(10) NOT NULL,
  `kinship` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `guardian`
--

CREATE TABLE `guardian` (
  `guardian_nic_no` varchar(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `age` int(11) NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `gender` enum('M','F') DEFAULT 'M',
  `Number_of_the_home` varchar(5) NOT NULL,
  `street` varchar(20) DEFAULT NULL,
  `town` varchar(20) DEFAULT NULL,
  `city` varchar(20) NOT NULL,
  `residential_district` varchar(30) NOT NULL,
  `province` varchar(20) NOT NULL,
  `divisional_secretary_area` varchar(15) NOT NULL,
  `grama_niladhari_division` varchar(15) NOT NULL,
  `occupation` varchar(20) NOT NULL,
  `civil_status` enum('M','U') DEFAULT 'M'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `new_student_entered_from_interview`
--

CREATE TABLE `new_student_entered_from_interview` (
  `new_student_id` varchar(10) NOT NULL,
  `applicant_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `new_student_school`
--

CREATE TABLE `new_student_school` (
  `new_student_id` varchar(10) NOT NULL,
  `school_id` int(11) NOT NULL,
  `medium` enum('S','T','E') DEFAULT 'S',
  `admission_no` varchar(10) NOT NULL,
  `date_of_admission` date NOT NULL,
  `leaving_date` date DEFAULT NULL,
  `learning_period` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `officer_ministry_of_education`
--

CREATE TABLE `officer_ministry_of_education` (
  `officer_moe_id` int(11) NOT NULL,
  `post` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `age` int(11) NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `gender` enum('M','F') DEFAULT 'M',
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `old_student`
--

CREATE TABLE `old_student` (
  `old_student_id` varchar(10) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `age` int(11) NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `gender` enum('M','F') DEFAULT 'M',
  `guardian_nic_no` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `old_student_school`
--

CREATE TABLE `old_student_school` (
  `old_student_id` varchar(10) NOT NULL,
  `school_id` int(11) NOT NULL,
  `admission_no` varchar(10) NOT NULL,
  `date_of_admission` date NOT NULL,
  `medium` enum('S','T','E') DEFAULT 'S',
  `leaving_date` date DEFAULT NULL,
  `learning_period` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `principle`
--

CREATE TABLE `principle` (
  `school_principle_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `age` int(11) NOT NULL,
  `nic_no` varchar(11) NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `gender` enum('M','F') DEFAULT 'M',
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `school_id` int(11) NOT NULL,
  `starting_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `school_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `postal_number` varchar(10) NOT NULL,
  `road` varchar(50) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `Province` varchar(50) NOT NULL,
  `max_value_of_grade_one_entries` int(11) NOT NULL,
  `buddhism_precentage` int(11) NOT NULL DEFAULT '100',
  `christianity_precentage` int(11) NOT NULL DEFAULT '0',
  `islam_precentage` int(11) NOT NULL DEFAULT '0',
  `Hindu_percentage` int(11) NOT NULL DEFAULT '0',
  `religion_others_precentage` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_admin`
--

CREATE TABLE `school_admin` (
  `school_admin_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `age` int(11) NOT NULL,
  `nic_no` varchar(11) NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `gender` enum('M','F') DEFAULT 'M',
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `school_id` int(11) NOT NULL,
  `starting_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school_clerk`
--

CREATE TABLE `school_clerk` (
  `school_clerk_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `age` int(11) NOT NULL,
  `nic_no` varchar(11) NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `gender` enum('M','F') DEFAULT 'M',
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `school_id` int(11) NOT NULL,
  `starting_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'dasunpubudumal', '$2a$08$8nwn8uE.LQTmQpxNC3zvDuGCoXOFUcBKfv84fCjX6o4e9uenq.CO.'),
(3, 'pawara', 'pawaraspaw'),
(4, 'Oshada', 'oshadaspw'),
(5, 'heshan', '[object Promise]'),
(6, 'Oshada', 'oshadaspw'),
(7, 'killer', '[object Promise]'),
(8, 'Oshada', 'oshadaspw'),
(9, 'moron', '[object Promise]'),
(11, 'pamoda', '$2a$08$ia2sx0D7NZgo5GJRWU8g7eTANUe0JTj5G.FnCs1VdbnmLv3mkaTMi'),
(12, 'pamoda', '$2a$08$AMLrSz2z3ugrTG43w15DKurT27w3o7xhQUk8DfmWwCHGs7UNBQauS'),
(13, 'kavindy', '$2a$08$gLSw487a0gtVZ0i23F.LOeuEGJiIXLmOwMOWJx.Ul9LJhKjzKXvFO'),
(14, 'kavindy', '$2a$08$SP.V.MGqs03sII6QL1/RoOXtOySsjXa23Pu/KM0szyf1Z8j4eRZP6'),
(15, 'kavindy', '$2a$08$LG8gdHkgwnbUbML7Gl3DQuLeRgz2TNO9zQFfxBgNJ7hMEPRur5Wy.'),
(16, 'kavindy', '$2a$08$Ct235VYYMD4aVXjCApdo/ODtfvsSQe7d4Xw.IpfYMdP3Gvw12kM7u'),
(17, 'username', '$2a$08$oedtevW.Txk2oOr1xseuOOcuqR9Sx9qHbU7gfnNFsbBqgIbpSa6Nq'),
(18, 'username', '$2a$08$nFRupBTGxLxVwxSKpnEL9.slCHJ4DIT3Umlwo7nWAKoBWNhhMFnUS'),
(19, 'sahan', '$2a$08$RL7J5o2d6g8G5V5dPCOwje51cTxMwpdhbQrkXKTFVDAPzdbsHS2GW'),
(20, 'akitha', '$2a$08$4oEv1haTGzdl.w.W2//l0ucSeIl/aKh0LEMgfMNxQ93wj1iGp9pDS'),
(21, 'sandun', '$2a$08$YgL/RUKmeELF8BBS7AZ/au2KRlOpvwkyztqqqMTJoeexurqBv.lo6');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicant`
--
ALTER TABLE `applicant`
  ADD PRIMARY KEY (`applicant_id`),
  ADD KEY `guardian_nic_no` (`guardian_nic_no`);

--
-- Indexes for table `applicant_applies_school`
--
ALTER TABLE `applicant_applies_school`
  ADD PRIMARY KEY (`applicant_id`,`medium`,`school_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `applicant_interview_school`
--
ALTER TABLE `applicant_interview_school`
  ADD PRIMARY KEY (`applicant_id`,`medium`,`school_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `applicant_referencing_new_student`
--
ALTER TABLE `applicant_referencing_new_student`
  ADD PRIMARY KEY (`applicant_id`,`new_student_id`),
  ADD KEY `new_student_id` (`new_student_id`);

--
-- Indexes for table `applicant_referencing_old_student`
--
ALTER TABLE `applicant_referencing_old_student`
  ADD PRIMARY KEY (`applicant_id`,`old_student_id`),
  ADD KEY `old_student_id` (`old_student_id`);

--
-- Indexes for table `guardian`
--
ALTER TABLE `guardian`
  ADD PRIMARY KEY (`guardian_nic_no`),
  ADD UNIQUE KEY `first_name` (`first_name`,`last_name`,`Number_of_the_home`,`street`,`town`,`city`,`residential_district`,`province`);

--
-- Indexes for table `new_student_entered_from_interview`
--
ALTER TABLE `new_student_entered_from_interview`
  ADD PRIMARY KEY (`new_student_id`),
  ADD KEY `applicant_id` (`applicant_id`);

--
-- Indexes for table `new_student_school`
--
ALTER TABLE `new_student_school`
  ADD PRIMARY KEY (`new_student_id`,`school_id`),
  ADD UNIQUE KEY `school_id` (`school_id`,`admission_no`);

--
-- Indexes for table `officer_ministry_of_education`
--
ALTER TABLE `officer_ministry_of_education`
  ADD PRIMARY KEY (`officer_moe_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `old_student`
--
ALTER TABLE `old_student`
  ADD PRIMARY KEY (`old_student_id`),
  ADD KEY `guardian_nic_no` (`guardian_nic_no`);

--
-- Indexes for table `old_student_school`
--
ALTER TABLE `old_student_school`
  ADD PRIMARY KEY (`old_student_id`,`school_id`),
  ADD UNIQUE KEY `school_id` (`school_id`,`admission_no`);

--
-- Indexes for table `principle`
--
ALTER TABLE `principle`
  ADD PRIMARY KEY (`school_principle_id`),
  ADD UNIQUE KEY `nic_no` (`nic_no`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`school_id`),
  ADD UNIQUE KEY `name` (`name`,`postal_number`,`road`,`city`,`Province`);

--
-- Indexes for table `school_admin`
--
ALTER TABLE `school_admin`
  ADD PRIMARY KEY (`school_admin_id`),
  ADD UNIQUE KEY `nic_no` (`nic_no`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `school_clerk`
--
ALTER TABLE `school_clerk`
  ADD PRIMARY KEY (`school_clerk_id`),
  ADD UNIQUE KEY `nic_no` (`nic_no`),
  ADD UNIQUE KEY `nationality` (`nationality`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applicant`
--
ALTER TABLE `applicant`
  ADD CONSTRAINT `applicant_ibfk_1` FOREIGN KEY (`guardian_nic_no`) REFERENCES `guardian` (`guardian_nic_no`);

--
-- Constraints for table `applicant_applies_school`
--
ALTER TABLE `applicant_applies_school`
  ADD CONSTRAINT `applicant_applies_school_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  ADD CONSTRAINT `applicant_applies_school_ibfk_2` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`);

--
-- Constraints for table `applicant_interview_school`
--
ALTER TABLE `applicant_interview_school`
  ADD CONSTRAINT `applicant_interview_school_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  ADD CONSTRAINT `applicant_interview_school_ibfk_2` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`);

--
-- Constraints for table `applicant_referencing_new_student`
--
ALTER TABLE `applicant_referencing_new_student`
  ADD CONSTRAINT `applicant_referencing_new_student_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  ADD CONSTRAINT `applicant_referencing_new_student_ibfk_2` FOREIGN KEY (`new_student_id`) REFERENCES `new_student_entered_from_interview` (`new_student_id`);

--
-- Constraints for table `applicant_referencing_old_student`
--
ALTER TABLE `applicant_referencing_old_student`
  ADD CONSTRAINT `applicant_referencing_old_student_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`),
  ADD CONSTRAINT `applicant_referencing_old_student_ibfk_2` FOREIGN KEY (`old_student_id`) REFERENCES `old_student` (`old_student_id`);

--
-- Constraints for table `new_student_entered_from_interview`
--
ALTER TABLE `new_student_entered_from_interview`
  ADD CONSTRAINT `new_student_entered_from_interview_ibfk_1` FOREIGN KEY (`applicant_id`) REFERENCES `applicant` (`applicant_id`);

--
-- Constraints for table `new_student_school`
--
ALTER TABLE `new_student_school`
  ADD CONSTRAINT `new_student_school_ibfk_1` FOREIGN KEY (`new_student_id`) REFERENCES `new_student_entered_from_interview` (`new_student_id`),
  ADD CONSTRAINT `new_student_school_ibfk_2` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`);

--
-- Constraints for table `old_student`
--
ALTER TABLE `old_student`
  ADD CONSTRAINT `old_student_ibfk_1` FOREIGN KEY (`guardian_nic_no`) REFERENCES `guardian` (`guardian_nic_no`);

--
-- Constraints for table `old_student_school`
--
ALTER TABLE `old_student_school`
  ADD CONSTRAINT `old_student_school_ibfk_1` FOREIGN KEY (`old_student_id`) REFERENCES `old_student` (`old_student_id`),
  ADD CONSTRAINT `old_student_school_ibfk_2` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`);

--
-- Constraints for table `principle`
--
ALTER TABLE `principle`
  ADD CONSTRAINT `principle_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`);

--
-- Constraints for table `school_admin`
--
ALTER TABLE `school_admin`
  ADD CONSTRAINT `school_admin_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`);

--
-- Constraints for table `school_clerk`
--
ALTER TABLE `school_clerk`
  ADD CONSTRAINT `school_clerk_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
