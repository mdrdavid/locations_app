import React, { useEffect, useState } from 'react'
import { UsersList } from '../components/UsersList'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/http-hooks'

export const Users = () => {
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [loadedUsers, setLoadedUsers] = useState()
    useEffect(() => {
        //     const sendRequest = async () => {
        //         setIsLoading(true)
        //         try {
        //             const response = await fetch('http://localhost:5000/api/users')

        //             const responseData = await response.json()

        //             if (!response.ok) {
        //                 throw new Error(responseData.message)
        //             }
        //             setLoadedUsers(responseData.users)

        //             // setIsLoading(false)
        //         } catch (err) {
        //             setError(err.message)
        //         }
        //         setIsLoading(false)
        //     }
        //     sendRequest()
        // }, [])

        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users'
                )

                setLoadedUsers(responseData.users)
            } catch (err) {}
        }
        fetchUsers()
    }, [sendRequest])

    const errorHandler = () => {
        clearError()
    }

    // const Users = [
    // 	{
    // 		id: "u1",
    // 		name: "David Matovu",
    // 		places: 2,
    // 		image: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300",
    // 	},
    // ];
    // return <UsersList items={Users} />
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner asOverLay />
                </div>
            )}
            {/* don't render if loaded users is undefined */}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </React.Fragment>
    )
}
