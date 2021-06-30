import React, { useState } from "react"
import { Container, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import FormInput from "lib/components/inputs/formInput"
import { auth, signInWithGoogle } from "lib/utils/firebase"
import { NotificationManager } from "react-notifications";

export default () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async event => {
        if (event) event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setEmail("")
            setPassword("")
            NotificationManager.success("Successfully signed in")

        } catch (error) {
            NotificationManager.error(error.message)
        }
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    handleChange={e => setEmail(e.target.value)}
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

                <Button type="submit">Sign In</Button>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>

                <Link to="/signup"><Button>Sign Up</Button></Link>
                
            </form>
        </Container>
    )
}