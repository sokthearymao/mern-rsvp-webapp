import React, { useReducer } from 'react'
import GuestContext from './guestContext'
import guestReducer from './guestReducer'
import {
    TOGGLE_FILTER,
    SEARCH_GUEST,
    CLEAR_SEARCH,
    ADD_GUEST,
    REMOVE_GUEST,
    UPDATE_GUEST,
    EDIT_GUEST,
    CLEAR_EDIT
} from '../types'

const GuestState = (props) => {
    const initialState = {
        filterGuest: false,
        search: null,
        editAble: null,
        guests: [
            {
                id: 1,
                name: "Jake Smith",
                phone: "333 444 9999",
                dietary: 'Vegan',
                isconfirmed: false
            },
            {
                id: 2,
                name: "Merry Williams",
                phone: "222 777 6666",
                dietary: 'Non-Veg',
                isconfirmed: true
            },
            {
                id: 3,
                name: "Azhaan Idrees",
                phone: "333 777 5555",
                dietary: 'Pescatarian',
                isconfirmed: true
            },
        ]
    }
    const [state, dispatch] = useReducer(guestReducer, initialState)

    // ADD GUEST
    const addGuest = (guest) => {
        guest.id = Date.now()
        guest.isconfirmed = false
        dispatch({
            type: ADD_GUEST,
            payload: guest
        })
    }

    // REMOVE GUEST
    const removeGuest = (id) => {
        dispatch({
            type: REMOVE_GUEST,
            payload: id
        })
    } 
       
    

    // UPDATE GUEST
    const updateGuest = (guest) => {
        dispatch({
            type: UPDATE_GUEST,
            payload: guest
        })
    }

    // EDIT GUEST
    const editGuest = (guest) => {
        dispatch({
            type: EDIT_GUEST,
            payload: guest
        })
    }

    // CLEAR EDIT
    const clearEdit = () => {
        dispatch({
            type: CLEAR_EDIT
        })
    }

    const toggleFilter = () => {
        dispatch({
            type: TOGGLE_FILTER
        })
    }
    const searchGuest = (guest) => {
        dispatch({
            type: SEARCH_GUEST,
            payload: guest
        })
    }
    const clearSearch = () => {
        dispatch({
            type: CLEAR_SEARCH
        })
    }
    return (
        <GuestContext.Provider
            value={{
                guests: state.guests,
                filterGuest: state.filterGuest,
                search: state.search,
                editAble: state.editAble,
                addGuest,
                removeGuest,
                updateGuest,
                editGuest,
                clearEdit,
                toggleFilter,
                searchGuest,
                clearSearch
            }}>{props.children}
        </GuestContext.Provider>
    )
}

export default GuestState