import React, { useState } from 'react';
import { Paper, TextField, Button } from '@material-ui/core';
import Axios from 'axios';

import './EmailContainer.css';

const EmailContainer = () => {
    const [destinationEmail, setDestinationEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const send = () => {
        console.log('current state', {
            destinationEmail,
            subject,
            text,
        });

        if (!destinationEmail) {
            setErrorMessage('Missing email addresss');
            return;
        }
        if (!subject) {
            setErrorMessage('Missing email subject');
            return;
        }
        if (!text) {
            setErrorMessage('Missing email text');
            return;
        }
        setErrorMessage('');

        Axios.post('', {
            to: destinationEmail,
            subject,
            text,
            from: 'manoj.reloaded007@gmail.com',
        })
            .then(() => {
                setText('');
                setDestinationEmail('');
                setSubject('');
                setSuccessMessage('You Email was sent!');
            })
            .catch(error => {
                console.log('error in axios post', error);
                setSuccessMessage('');
                setErrorMessage(error.message || 'Unable to send the email');
            });
    };

    return (
        <div className="emailContainer">
            <Paper>
                <form>
                    <TextField
                        id="destinationEmailAddress"
                        label="Destination Email Address"
                        value={destinationEmail}
                        onChange={e => setDestinationEmail(e.target.value)}
                    />
                    <TextField
                        id="emailSubject"
                        label="Email Subject"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                    />
                    <TextField
                        id="emailContent"
                        label="Email Content"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />

                    {errorMessage ? <div className="errorMessage">{errorMessage}</div> : null}
                    {successMessage ? <div className="successMessage">{successMessage}</div> : null}

                    <Button variant="contained" color="primary" onClick={send}>
                        Send Email
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default EmailContainer;