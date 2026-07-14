import SignUp from "./Signup"

// Usage
const faqData = [
  { question: 'What is React?', answer: 'A JavaScript library for building UIs.' },
  { question: 'What is JSX?', answer: 'A syntax extension that looks like HTML in JavaScript.' },
  { question: 'What are hooks?', answer: 'Functions that let you use state in functional components.' },
];



function Login() {
  return (
    <>
      <h1>Login</h1>

      <SignUp items={faqData}></SignUp>

    </>
  )
}

export default Login
