//CLIENT ROUTES
const HOME_URL: string = "/"
const ABOUT_URL: string = "/about"
const SERVICES_URL: string = "/services"
const CONTACT_URL: string = "/contact"



//AUTH ROUTE
const LOGIN_URL: string = "/auth/login"
const REGISTER_URL: string = "/auth/register"
const VERIFY_OTP_URL: string = "/auth/verify-otp"
const FORGOT_PASSWORD_URL: string = "/auth/forgot-password"
const RESET_PASSWORD_URL: string = "/reset-password"

// DASHBOARD_URL constants
const DASHBOARD_URL: string = "/dashboard";
const BOOKING_URL: string = `${DASHBOARD_URL}/bookings`
const CUSTOMER_URL: string = `${DASHBOARD_URL}/customers`
const SETTING_URL: string = `${DASHBOARD_URL}/settings`
const CREATE_BOOKING_URL: string = `${DASHBOARD_URL}/create-booking`
const ADMINCONTACT_URL: string = `${DASHBOARD_URL}/contact-info`
const ZONE_CREATION_URL: string = `${DASHBOARD_URL}/zone-creation`
//Booking journey
const TICKET_MASTER_URL: string = '/ticket-master'
const AIRPORT_PICK_UP_DROP_OFF_URL: string = '/airport-pick-up-drop-off'
const AIRPORT_PICK_UP_DROP_OFF_BOOKING_URL: string = '/airport-pick-up-drop-off/booking'
const ACCOMMODATION_URL: string = '/accommodation'
const TRAINING_URL: string = '/training'
const DEDICATED_RIDES_URL: string = '/dedicated-rides'
const CHECKOUT_URL: string = '/checkout'

// Back Office

export {
  HOME_URL,
  ABOUT_URL,
  SERVICES_URL,
  CONTACT_URL,
  // Booking journey
  TICKET_MASTER_URL,
  AIRPORT_PICK_UP_DROP_OFF_URL,
  AIRPORT_PICK_UP_DROP_OFF_BOOKING_URL,

  ACCOMMODATION_URL,
  TRAINING_URL,
  DEDICATED_RIDES_URL,
  CHECKOUT_URL,
  // Back Office

  // DASHBOARD_URL constants
  DASHBOARD_URL,
  BOOKING_URL,
  CUSTOMER_URL,
  ADMINCONTACT_URL,
  CREATE_BOOKING_URL,
  SETTING_URL,
  LOGIN_URL,
  REGISTER_URL,
  VERIFY_OTP_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  ZONE_CREATION_URL,
}