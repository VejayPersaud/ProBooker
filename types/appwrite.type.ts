import { Models } from "node-appwrite";

export interface Consumer extends Models.Document {
  email: string; // Email type, required
  phone: string; // String type, required
  userId: string; // String type, required
  name: string; // String type, required
  address: string; // String type
  city: string; // String type
  state: string; // String type
  zipcode: string; // String type
  createon: Date; // Datetime type
  bookings: string[]; // Array of strings
  userType: 'Admin' | 'ServiceProvider' | 'Consumer'; // Enum type, required
  profileImg: string; // URL type
}

export interface Booking extends Models.Document {
  consumer: Consumer;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}