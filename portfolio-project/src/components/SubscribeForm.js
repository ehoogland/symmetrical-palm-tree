import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
// If you want the built-in styles, import the CSS once in your app (e.g., in index.css):
// import 'react-phone-number-input/style.css';

const validate = values => {
  const errors = {};

  // Email validation (simple + sanity checks)
  if (!values.email) {
    errors.email = 'Required';
  } else {
    const basicEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmail.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  }

  // Phone validation: optional, but if present must be valid per isValidPhoneNumber
  if (values.phone) {
    try {
      if (!isValidPhoneNumber(values.phone)) {
        errors.phone = 'Enter a valid phone number';
      }
    } catch (e) {
      errors.phone = 'Enter a valid phone number';
    }
  }

  return errors;
};

export default function SubscribeForm({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    // focus the email input when the form mounts
    emailRef.current?.focus?.();
  }, []);

  return (
    <div style={{ maxWidth: 480, margin: '1rem auto', padding: '1rem', background: 'var(--vegan-light)', borderRadius: 12, border: '1px solid var(--vegan-accent)' }}>
      {!submitted ? (
        <Formik
          initialValues={{ email: '', phone: '', optInEmail: true, optInSMS: false }}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={true}
          onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
            setSubmitting(true);
            // values.phone from PhoneInput is already E.164 when possible
            const payload = { ...values, phone: values.phone || '' };
            console.log('Subscribe form submitted (payload):', payload);

            // Fake API: simulate server-side validation error for certain emails
            setTimeout(() => {
              if (payload.email === 'reject@example.com') {
                setErrors({ email: 'This email is already subscribed' });
                setSubmitting(false);
                return;
              }
              setSubmitted(true);
              setSubmitting(false);
              resetForm();
            }, 600);
          }}
        >
          {({ isSubmitting, errors, touched, setFieldValue }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field name="email">
                  {({ field }) => (
                    <input
                      {...field}
                      type="email"
                      id="email"
                      className="form-control"
                      ref={emailRef}
                    />
                  )}
                </Field>
                <div className="text-danger">{touched.email && errors.email ? errors.email : null}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone (optional)</label>
                <Field name="phone">
                  {({ field, form }) => (
                    <PhoneInput
                      {...field}
                      id="phone"
                      className="form-control"
                      defaultCountry="US"
                      onChange={value => form.setFieldValue('phone', value)}
                      onBlur={() => {}}
                    />
                  )}
                </Field>
                <div className="text-danger">{touched.phone && errors.phone ? errors.phone : null}</div>
              </div>

              <div className="form-check mb-2">
                <Field className="form-check-input" type="checkbox" name="optInEmail" id="optInEmail" />
                <label className="form-check-label" htmlFor="optInEmail">I agree to receive emails</label>
              </div>

              <div className="form-check mb-3">
                <Field className="form-check-input" type="checkbox" name="optInSMS" id="optInSMS" />
                <label className="form-check-label" htmlFor="optInSMS">I agree to receive text messages (SMS)</label>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-vegan" disabled={isSubmitting}>Subscribe</button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="text-center">
          <h5 style={{ color: 'var(--vegan-primary)' }}>Thanks — you're subscribed!</h5>
          <p style={{ color: 'var(--vegan-dark)' }}>We'll send updates to your email/phone as requested.</p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-vegan" onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
// end SubscribeForm
