import React from "react";
import { useMutation } from "@apollo/client";

import "./App.css";
import { LoginDocument } from "./gql/generated/graphql";

function App() {
  const [mutationFunction, { data, loading, error }] = useMutation(LoginDocument, { variables: { email: 'george.trichopoulos@gmail.com', password: 'giorgos' } })

  if (loading) return (<div>'Submitting...'</div>);
  if (error) return (<div>`Submission error! ${error.message}`</div>);

  return (
    <div>
      <p>{data?.login?.token}</p>
      <form
        onSubmit={e => {
          e.preventDefault();
          mutationFunction({ variables: { email: 'george.trichopoulos@gmail.com', password: 'giorgos' } });
        }}
      >
        <button type="submit">Login</button>
      </form>
    </div>
  );}

export default App
