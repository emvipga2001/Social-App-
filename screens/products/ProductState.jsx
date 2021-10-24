import { atom } from "recoil";

export const productListState = atom({
    key: 'productListState',
    default: [
        {id:1,name:'Coffe',price:'50'},
        {id:2,name:'Pizza',price:'50'},
        {id:3,name:'Coffe',price:'50'},
        {id:4,name:'Pizza',price:'50'},
    ],
  });

