import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {SIGN_IN} from "../../app/apollo/graphql/query/sign.in";
import './css/sign.in.css';

const SignIn: React.FC<{ handleSubmit: (fn: () => void) => void }> = ({handleSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signIn, {data, loading, error}] = useLazyQuery(SIGN_IN);

    const handleSignIn = () => {
        signIn({variables: {email, password}}).then(r => console.log(r));
    };

    useEffect(() => {
        handleSubmit(handleSignIn);
    }, [handleSubmit, handleSignIn]);

    return (
        <>
            <div style={{width: '300px', margin: 'auto', marginTop: '20px', textAlign: 'center'}}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                       required className='input-modal'/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password" className='input-modal'
                       required />

                {
                    error && <div style={{color: 'red', marginTop: '20px'}}>
                        <p>Error: {error.message}</p>
                    </div>
                }

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
            </div>
        </>
    );
};

export default SignIn;
