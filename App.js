import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MovieHomeScreen from './screens/MovieHomeScreen';
import SearchScreen from './screens/SearchScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import SeatSelectionScreen from './screens/SeatSelectionScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import BookingConfirmedScreen from './screens/BookingConfirmedScreen';
import MyTicketsScreen from './screens/MyTicketsScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleNavigateToDetail = (movie) => {
    setSelectedMovie(movie);
    setCurrentScreen('Detail');
  };

  const handleNavigateToCheckout = (seats, total) => {
    setSelectedSeats(seats);
    setTotalPrice(total);
    setCurrentScreen('Checkout');
  };

  const handleNavigateToConfirmed = () => {
    setCurrentScreen('BookingConfirmed');
  };

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <>
      {currentScreen === 'Home' && (
        <MovieHomeScreen onNavigate={handleNavigate} onSelectMovie={handleNavigateToDetail} />
      )}
      {currentScreen === 'Search' && (
        <SearchScreen onNavigate={handleNavigate} onSelectMovie={handleNavigateToDetail} />
      )}
      {currentScreen === 'Detail' && (
        <MovieDetailScreen onNavigate={handleNavigate} movie={selectedMovie} />
      )}
      {currentScreen === 'Selection' && (
        <SeatSelectionScreen onNavigate={handleNavigate} onCheckout={handleNavigateToCheckout} />
      )}
      {currentScreen === 'Checkout' && (
        <CheckoutScreen onNavigate={handleNavigate} selectedSeats={selectedSeats} totalPrice={totalPrice} onConfirmed={handleNavigateToConfirmed} />
      )}
      {currentScreen === 'BookingConfirmed' && (
        <BookingConfirmedScreen onNavigate={handleNavigate} selectedSeats={selectedSeats} totalPrice={totalPrice} />
      )}
      {currentScreen === 'MyTickets' && (
        <MyTicketsScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === 'Profile' && (
        <ProfileScreen onNavigate={handleNavigate} />
      )}
      <StatusBar style="light" />
    </>
  );
}
