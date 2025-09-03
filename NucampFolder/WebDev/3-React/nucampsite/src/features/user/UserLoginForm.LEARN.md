UserLoginForm - Expanded Learning Notes

This companion file explains Formik concepts used in `UserLoginForm.js`, shows small code examples, and gives testing/troubleshooting tips.

Overview / contract
- Input: username, password
- Output: calls onSubmit(values, helpers) where helpers includes resetForm
- Success criteria: validation passes for username (6-15 chars) and password (>=8); on submit the Redux store receives the user and the modal closes.

1) Common Formik props used
- initialValues: starting values for fields. Example: { username: '', password: '' }
- validate(values): synchronous validator returning an object of error messages, e.g. { username: 'Required' }
- validateOnMount: run validate immediately so `isValid` reflects initial validity
- onSubmit(values, formikHelpers): called when the form is submitted; `formikHelpers` contains helpers like `resetForm`, `setSubmitting`, `setErrors`.

2) The "Formik bag" (render-prop or useFormik)
In `UserLoginForm.js` we use the render-prop pattern for quick access to form state:

{({ isValid, touched, values, errors, dirty }) => ( <Form> ... )}

- isValid: true when validation returns an empty object
- touched: object where keys are fields the user blurred/interacted with. Helpful to avoid showing errors before interaction.
- values: current form values
- errors: current validation errors object
- dirty: true when form values differ from initialValues

Example: enable submit only after user touched a field and form is valid

```js
<Button type="submit" disabled={!isValid || Object.keys(touched).length === 0}>Login</Button>
```

3) Validator pattern (the one used here)

```js
export function validateUserLoginForm(values) {
  const errors = {};
  if (!values.username) errors.username = 'Required';
  else if (values.username.length < 6) errors.username = 'Must be 6-15 characters';
  if (!values.password) errors.password = 'Required';
  else if (values.password.length < 8) errors.password = 'Must be at least 8 characters';
  return errors;
}
```

Formik considers the form valid when Object.keys(errors).length === 0.

4) ErrorMessage and field-level rendering

ErrorMessage simplifies rendering an error for one field. The child can be a render function:

```jsx
<Field name="username" />
<ErrorMessage name="username">{msg => <div className="text-danger">{msg}</div>}</ErrorMessage>
```

5) onSubmit helpers: resetForm and setSubmitting

Formik passes helpers into onSubmit. Common usage:

```js
const handleLogin = (values, { resetForm, setSubmitting }) => {
  setSubmitting(true);
  // dispatch or async call...
  resetForm(); // clears values and touched/errors
  setSubmitting(false);
}
```

6) Testing tips (React Testing Library + Jest)

- Wrap components that use React Router in a `MemoryRouter` in tests (we updated `App.test.js`).
- Prefer role-based queries for stable selections: `getByRole('heading', { name: /home/i })`.
- Use `screen` from `@testing-library/react` rather than destructuring results from `render`.
- For form interactions, use `user-event` for realistic typing:

```js
import userEvent from '@testing-library/user-event'

userEvent.type(screen.getByLabelText(/username/i), 'myuser')
userEvent.type(screen.getByLabelText(/password/i), 'mypassword')
userEvent.click(screen.getByRole('button', { name: /login/i }))
```

7) Troubleshooting common issues

- "useHref() may be used only in the context of a <Router> component": wrap component in `MemoryRouter` for tests.
- Tests failing to find elements: check if text is duplicated. Use role-based queries or `getAllBy*`.
- Formik render errors: verify `validate` returns an object and that Field `name` matches validator keys.

8) Small experiments you can try

- Make the Login button enabled only when form is dirty (user changed values): `disabled={!isValid || !dirty}`
- Show live validation messages only after a field is touched: `{touched.username && errors.username && <div>{errors.username}</div>}`

9) Files referenced
- `src/utils/validateUserLoginForm.js` — validator implementation
- `src/features/user/UserLoginForm.js` — component wired to Formik

If you want, I can add short runnable unit tests that exercise the happy path + one validation error for this form.

