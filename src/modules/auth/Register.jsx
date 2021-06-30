import React, { useState } from "react"
import { Container, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import FormInput from "lib/components/inputs/formInput"
import { auth, createUserProfileDocument } from "lib/utils/firebase"
import { NotificationManager } from "react-notifications";

export default () => {

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            NotificationManager.error("passwords don't match")
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email.trim(), password);
            await createUserProfileDocument(user, { displayName });

            setDisplayName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            NotificationManager.success("Successfully signed up")

        } catch (error) {
            NotificationManager.error(error.message)
        }
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>

                <FormInput
                    type="text"
                    name="displayName"
                    handleChange={e => setDisplayName(e.target.value)}
                    value={displayName}
                    label="Display Name"
                    required />

                <FormInput
                    type="email"
                    name="email"
                    handleChange={e => setEmail(e.target.value)}
                    value={email}
                    label="Email"
                    required
                />

                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    handleChange={e => setPassword(e.target.value)}
                    label="Password"
                    required
                />

                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    handleChange={e => setConfirmPassword(e.target.value)}
                    label="Confirm Password"
                    required
                />

                <Button type="submit">Sign Up</Button>

                <Link to="/signin"><Button>Sign in</Button></Link>
                    
            </form>
        </Container>
    )
}