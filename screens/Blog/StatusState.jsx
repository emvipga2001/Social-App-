import { useState } from 'react';
import { useEffect } from 'react';
import { atom, selector } from 'recoil';
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
export const statusState = atom({
    key: 'status',
    default: [],
});
export function addStatus(status,name){
    firebase.database().ref('status/').push().set({
        Name: name,
    }, function (error) {
        if (error) {
            // The write failed...
            alert('Lỗi')
        } else {
            // Data saved successfully!
            alert('Thành Công !!!')
        }
    });
}




// export const addToCart = (status, item) => {
//     const newCart = [...status];
//     newCart.push({
//         id: item.id,
//         product: item,
//         quantity: 1,
//     });
//     return newCart;
// };