// components/ServiceDetails.tsx

import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';
import AvailabilityCalendar from './AvailabilityCalendar';
import { Service,ReviewCardProps } from '../types/appwrite.type';
import ReviewCard from './ReviewCard';
import { fetchReviewsForService } from './DataReviewConsumerView';

interface ServiceDetailsProps {
  service: Service;
  onBack: () => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service, onBack }) => {
  const [availableDates, setAvailableDates] = useState<Date[]>([
    // Mocked available dates
    new Date('2024-07-25'),
    new Date('2024-07-26'),
    new Date('2024-07-27'),
  ]);
  const [isBookingSectionVisible, setIsBookingSectionVisible] = useState(false);
  const [reviews, setReviews] = useState<ReviewCardProps[]>([]);

  const toggleBookingSection = () => {
    setIsBookingSectionVisible(!isBookingSectionVisible);
  };

  useEffect(() => {
    const getReviews = async () => {
      const fetchedReviews = await fetchReviewsForService(service.$id);
      setReviews(fetchedReviews);
    };

    getReviews();
  }, [service.$id]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
      <p className="text-gray-600 italic">Provider: {service.providerName}</p>
      <p className="text-gray-600 italic">{service.city}, {service.zipcode}</p>
      <p className="text-gray-700 mb-2">{service.description}</p>
      <p className="text-blue-500 font-bold">Price: ${service.price}</p>

      <button 
        onClick={toggleBookingSection} 
        className={`mt-4 py-2 px-4 rounded ${isBookingSectionVisible ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
        {isBookingSectionVisible ? 'Hide Booking' : 'Book'}
      </button>

      {isBookingSectionVisible && (
        <div className="bg-gray-100 rounded-lg p-6 mt-4">
          <h2 className="text-2xl font-bold mb-4">Booking: {service.name}</h2>
          <AvailabilityCalendar availableDates={availableDates} />
          <BookingForm />
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>

      <button onClick={onBack} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Back to Search</button>
    </div>
  );
};

export default ServiceDetails;
