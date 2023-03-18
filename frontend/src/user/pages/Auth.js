import React, { useState, useContext } from 'react'

import Card from '../../shared/UIElements/Card'
import { Input } from '../../shared/FormElements/Input'
import { Button } from '../../shared/FormElements/Button'
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from '../../shared/utils/validators'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hooks'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'

import './Auth.css'

export const Auth = () => {
    const auth = useContext(AuthContext)

    const [isLoginMode, setIsLoginMode] = useState(true)
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState()
    const [isLoading, error, sendRequest, clearError] = useHttpClient()

    const { formState, inputHandler, setFormData } = useForm(
        {
            email: {
                value: '',
                isValid: false,
            },
            password: {
                value: '',
                isValid: false,
            },
        },
        false
    )
    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            )
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false,
                    },
                },
                false
            )
        }
        setIsLoginMode((prevMode) => !prevMode)
    }

    const authSubmitHandler = async (event) => {
        event.preventDefault()
        // setIsLoading(true)
        if (isLoginMode) {
            try {
                // const response = await fetch(
                //     'http://localhost:5000/api/users/login',
                //     {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'Application/json',
                //         },
                //         body: JSON.stringify({
                //             email: formState.inputs.email.value,
                //             password: formState.inputs.password.value,
                //         }),
                //     }
                // )

                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        'Content-Type': 'Application/json',
                    }
                )

                // const data = await response.json()
                // if (!response.ok) {
                //     throw new Error(data.message)
                // }
                // setIsLoading(false)
                auth.login()
                console.log(responseData)
            } catch (err) {
                // console.log(err)
                // setIsLoading(false)
                // setError(
                //     err.message || 'Something went wrong, please try again'
                // )
            }
        } else {
            try {
                // setIsLoading(true)
                // const response = await fetch(
                //     'http://localhost:5000/api/users/signup',
                //     {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'Application/json',
                //         },
                //         body: JSON.stringify({
                //             name: formState.inputs.name.value,
                //             email: formState.inputs.email.value,
                //             password: formState.inputs.password.value,
                //         }),
                //     }
                // )
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                    }),
                    {
                        'Content-Type': 'Application/json',
                    }
                )

                // const data = await response.json()
                // if (!response.ok) {
                //     throw new Error(data.message)
                // }
                // console.log(data)
                // setIsLoading(false)
                console.log(responseData)
                auth.login()
            } catch (err) {
                console.log(err)
                // setIsLoading(false)
                // setError(
                //     err.message || 'Something went wrong, please try again'
                // )
            }
        }
    }

    // const errorHandler = () => {
    //     setError(null)
    // }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverLay />}
                <h2>Login Required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && (
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a name."
                            onInput={inputHandler}
                        />
                    )}
                    <Input
                        element="input"
                        id="email"
                        type="email"
                        label="E-Mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email address."
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid password, at least 5 characters."
                        onInput={inputHandler}
                    />
                    {/* <Button type="submit" disabled={!formState.isValid}> */}
                    <Button type="submit">
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
                <Button inverse onClick={switchModeHandler}>
                    SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
                </Button>
            </Card>
        </React.Fragment>
    )
}
