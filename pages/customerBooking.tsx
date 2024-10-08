// ./pages/customerBooking.tsx

// Purpose: Provide the user with a page to book a service with a provider.
// The page will display the availability of the provider and allow the user to select a date to book a service.
// The page will also display a form for the user to input their information and book the service.
// The page will also have a button to return to the customer profile page.
// ./pages/customerBooking.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import BookingForm from '../components/BookingForm';
import { fetchProviderAvailability } from '../lib/availability.actions';

const CustomerBooking = () => {
  const router = useRouter();
  const { providerId, serviceId } = router.query;
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (providerId) {
        const dates = await fetchProviderAvailability(providerId as string);
        setAvailableDates(dates.map((dateStr: string) => new Date(dateStr)));
      }
    };

    fetchAvailability();
  }, [providerId]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleBookingSubmit = async (formData: any) => {
    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        router.push('/customerProfile?view=bookings');
      } else {
        console.error('Failed to create booking.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  if (!providerId || !serviceId) {
    return <div>Loading...</div>; // Or handle the missing IDs appropriately
  }

  return (
    <div className="flex min-h-screen customer-background">
      <main className="w-full p-8 content-background">
        <h1 className="text-2xl font-bold mb-6">Book a Service</h1>
        <AvailabilityCalendar availableDates={availableDates} onDateChange={handleDateChange} />
        {selectedDate && (
          <BookingForm
            providerId={providerId as string}
            serviceId={serviceId as string}
            selectedDate={selectedDate}
            onSubmit={handleBookingSubmit}
          />
        )}
        <button
          onClick={() => router.push('/customerProfile')}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Back to Profile
        </button>
      </main>
    </div>
  );
};

export default CustomerBooking;
