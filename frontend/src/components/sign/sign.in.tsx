import React, {useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {SIGN_IN} from "../../app/apollo/graphql/query/sign.in";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signIn, {data, loading, error}] = useLazyQuery(SIGN_IN);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signIn({variables: {email, password}}).then(r => console.log(r));
    };

    return (
        <>
            <form onSubmit={handleSubmit}
                  style={{width: '300px', margin: 'auto', marginTop: '20px', textAlign: 'center'}}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    style={{width: '100%', padding: '10px', marginBottom: '10px'}}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    style={{width: '100%', padding: '10px', marginBottom: '10px'}}
                />
                <button type="submit" disabled={loading} style={{padding: '10px 20px'}}>Sign In</button>
                {error &&
                    <div style={{color: 'red', marginTop: '20px'}}>
                        <p>Error: {error.message}</p>
                    </div>
                }
            </form>

            {
                data && data.signIn && (
                    data.signIn.success ?
                        <div style={{color: 'green', marginTop: '20px'}}>
                            <p>Success: {data.signIn.message}</p>
                            <p>Data: {JSON.stringify(data.signIn.data)}</p>
                        </div>
                        :
                        <div style={{color: 'red', marginTop: '20px'}}>
                            <p>Error: {data.signIn.message}</p>
                        </div>
                )
            }
        </>
    );
};

export default SignIn;
