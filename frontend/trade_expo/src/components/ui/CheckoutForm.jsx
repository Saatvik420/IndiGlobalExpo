import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Spinner, CreditCard } from '@phosphor-icons/react';
import { ticketService } from '../../services/ticketService';

const CheckoutForm = ({ clientSecret, ticket, onPaymentSuccess, onPaymentError, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      onPaymentError(error.message);
      setIsProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      try {
        const verifiedTicket = await ticketService.verifyPayment(paymentIntent.id);
        onPaymentSuccess(verifiedTicket);
      } catch (err) {
        onPaymentError("Payment was successful but verification failed. Please contact support.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-sm border border-gray-100 mb-6">
        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-4">Credit or Debit Card</label>
        <div className="p-4 bg-white border border-gray-200 rounded-sm">
          <CardElement options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#1a1a1a',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#ef4444',
              },
            },
          }} />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
        <div className="flex items-center gap-2 text-gray-400">
          <CreditCard size={20} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Secure Stripe Payment</span>
        </div>
        <button 
          type="submit" 
          disabled={isProcessing || !stripe}
          className="w-full sm:w-auto bg-brand-accent text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-dark transition-all interactive flex justify-center items-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isProcessing ? <Spinner size={18} className="animate-spin" /> : null} Pay €{price.toLocaleString()}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
