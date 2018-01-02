-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 35.188.193.23    Database: kayak
-- ------------------------------------------------------
-- Server version	5.7.14-google-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED='f6be16cc-cb71-11e7-a9d7-42010a8004e9:1-1459239';

--
-- Table structure for table `billingaddress`
--

DROP TABLE IF EXISTS `billingaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billingaddress` (
  `username` varchar(50) NOT NULL,
  `street1` varchar(30) NOT NULL,
  `street2` varchar(30) DEFAULT NULL,
  `postalcode` varchar(10) NOT NULL,
  `city` varchar(20) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`username`,`street1`,`postalcode`),
  CONSTRAINT `billingaddress_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `carbooking`
--

DROP TABLE IF EXISTS `carbooking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carbooking` (
  `bookingId` mediumint(10) NOT NULL AUTO_INCREMENT,
  `carId` varchar(100) NOT NULL,
  `noOfDays` int(10) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `ticketPrice` float NOT NULL,
  `totalAmount` float NOT NULL,
  `username` varchar(50) NOT NULL,
  `hostId` mediumint(6) NOT NULL,
  `bill_day` varchar(45) DEFAULT NULL,
  `bill_month` varchar(45) DEFAULT NULL,
  `bill_year` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bookingId`),
  KEY `username_idx` (`username`),
  CONSTRAINT `username_hotelbooking` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `flightbooking`
--

DROP TABLE IF EXISTS `flightbooking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flightbooking` (
  `bookingId` mediumint(10) NOT NULL AUTO_INCREMENT,
  `flightId` varchar(100) NOT NULL,
  `noOfPassengers` int(3) NOT NULL,
  `flightClass` varchar(50) NOT NULL,
  `tripType` varchar(10) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date DEFAULT NULL,
  `ticketPrice` float NOT NULL,
  `totalAmount` float NOT NULL,
  `username` varchar(50) NOT NULL,
  `hostId` mediumint(6) NOT NULL,
  `bill_day` varchar(45) DEFAULT NULL,
  `bill_month` varchar(45) DEFAULT NULL,
  `bill_year` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bookingId`),
  KEY `username_idx` (`username`),
  CONSTRAINT `flightbooking_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `host`
--

DROP TABLE IF EXISTS `host`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `host` (
  `hostId` mediumint(9) NOT NULL AUTO_INCREMENT,
  `hostName` varchar(100) NOT NULL,
  `serviceType` enum('flight','hotel','car') NOT NULL,
  PRIMARY KEY (`hostId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hotelbooking`
--

DROP TABLE IF EXISTS `hotelbooking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotelbooking` (
  `bookingId` mediumint(10) NOT NULL AUTO_INCREMENT,
  `hotelId` varchar(100) NOT NULL,
  `noOfPeople` int(1) NOT NULL,
  `roomType` varchar(10) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `ticketPrice` float NOT NULL,
  `totalAmount` float NOT NULL,
  `username` varchar(50) NOT NULL,
  `hostId` mediumint(6) NOT NULL,
  `bill_day` varchar(45) DEFAULT NULL,
  `bill_month` varchar(45) DEFAULT NULL,
  `bill_year` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bookingId`),
  KEY `username_idx` (`username`),
  CONSTRAINT `hotelbooking_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `paymentdetails`
--

DROP TABLE IF EXISTS `paymentdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymentdetails` (
  `username` varchar(50) NOT NULL,
  `nameoncard` varchar(50) NOT NULL,
  `creditCardNumber` varchar(45) NOT NULL,
  `validThrough` varchar(45) NOT NULL,
  `cvv` varchar(3) NOT NULL,
  PRIMARY KEY (`creditCardNumber`),
  KEY `username_idx` (`username`),
  CONSTRAINT `paymentdetails_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `travelerdetails`
--

DROP TABLE IF EXISTS `travelerdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `travelerdetails` (
  `travelerId` mediumint(10) NOT NULL AUTO_INCREMENT,
  `bookingtype` varchar(20) NOT NULL,
  `bookingId` mediumint(10) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phonenumber` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`travelerId`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `accessInd` varchar(10) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userprofile`
--

DROP TABLE IF EXISTS `userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userprofile` (
  `username` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `street` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zipCode` varchar(50) DEFAULT NULL,
  `phoneNumber` varchar(45) DEFAULT NULL,
  `profileImage` varchar(100) DEFAULT NULL,
  `dateofbirth` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-03 23:45:29
