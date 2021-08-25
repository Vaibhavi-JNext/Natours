import axios from 'axios';
import { showAlert } from './alerts';
// const { Stripe } = require('stripe');
const stripe = Stripe(
  'pk_test_51JRbTXSInBetGapY0MpcIcV7rXo1bNdUKxC6Ke4H6iT53LveMqBbt1LQONQtMHAP8u3NyIqQW8Pb25qNQJCHbhm100MRgfQ6af'
);

export const bookTour = async (tourId) => {
  //1) get check out sesion from API
  try {
    const session = await axios(
      `http://127.0.0.1:4001/api/v1/bookings/checkout-session/${tourId}`
    );
    //2) create checkout form+process creditcard
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
    console.log(session);
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
