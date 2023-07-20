const Booking = require("../models/bookingsModel");
const Flight = require("../models/flightModel");
const User = require("../models/usersModel");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
require("dotenv").config();
const moment = require("moment");


// book seat and send email to user with the booking details
const BookSeat = async(req, res) => {
    try {
        const newBooking = new Booking({
            ...req.body, // spread operator to get all the data from the request body
            user: req.params.userId,
        });
        const user = await User.findById(req.params.userId);
        // res.json(user._id)
        await newBooking.save();
        const flight = await Flight.findById(req.body.flight); // get the flight from the request body
        flight.seatsBooked = [...flight.seatsBooked, ...req.body.seats]; // add the booked seats to the flight seatsBooked array in the database

        await flight.save();


        res.status(200).send({
            message: "Seat booked successfully",
            data: newBooking,
            user: user._id,
            success: true,
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            message: "Booking failed",
            data: error,
            success: false,
        });
    }
};

const GetAllBookings = async(req, res) => {
    try {
        const bookings = await Booking.find().populate("flight").populate("user");
        res.status(200).send({
            message: "All bookings",
            data: bookings,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to get bookings",
            data: error,
            success: false,
        });
    }
};

const GetAllBookingsByUser = async(req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.user_Id }).populate([
            "flight",
            "user",
        ]);
        res.status(200).send({
            message: "Bookings fetched successfully",
            data: bookings,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: "Bookings fetch failed",
            data: error,
            success: false,
        });
    }
};

// cancel booking by id and remove the seats from the flight seatsBooked array
const CancelBooking = async(req, res) => {
    try {
        const booking = await Booking.findById(req.params.booking_id);
        const user = await User.findById(req.params.user_id);
        const flight = await Flight.findById(req.params.flight_id);
        if (!booking || !user || !flight) {
            res.status(404).send({
                message: "Booking not found",
                data: error,
                success: false,
            });
        }

        booking.remove();
        flight.seatsBooked = flight.seatsBooked.filter(
            (seat) => !booking.seats.includes(seat)
        );
        await flight.save();
        res.status(200).send({
            message: "Booking cancelled successfully",
            data: booking,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: "Booking cancellation failed",
            data: error,
            success: false,
        });
    }
};
const PayWithStripe = async(req, res) => {

    res.status(200).send({
        message: "Payment successful",
        data: {
            transactionId: "123456789",
        },
        success: true,
        amount: req.body.amount,
    });

};
module.exports = {
    BookSeat,
    GetAllBookings,
    GetAllBookingsByUser,
    CancelBooking,
    PayWithStripe,
};