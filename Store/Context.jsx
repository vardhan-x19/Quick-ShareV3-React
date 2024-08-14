import { createContext, useReducer,useState,useEffect } from "react";


export const ContextItems=createContext([]);

const defValues=[{
    userId:1,
    title:"Iam going to hyd",
    body:"Iam very much intersted and its good to go after completing my semister exams I hope i can enjoy a Lot",
    tags:["#happy","#enjoy","#pandagow"],
    reactions: {likes: 0, dislikes: 0}
},
{
    userId:2,
    title:"Pass Hogaya BenStokes",
    body:"After wasting 4 years of enginneing stiil I passed .I Can't Believ it that i really pass the exam?",
    tags:["#proud","#unbelevable","#emotional"],
    reactions: {likes: 0, dislikes: 0}
}
]

function reduceFunc(curValue,action) {
   let updatedValues=curValue;
   if(action.type==="DELETE_ITEM")
   {
    updatedValues=curValue.filter((item)=>item.userId!==action.payload.userId);
   }
   else if(action.type==="Liked")
   {
    updatedValues=curValue.map((item)=>item.id===action.payload.id?{...item,reactions: {
        ...item.reactions,
        likes: action.payload.likes++ 
    }}:item)
   }
   else if(action.type==="addListItems")
   {
    updatedValues=[action.payload,...curValue];
    console.log(updatedValues);
   }
   else if(action.type==="addListItemsDef")
   {
    updatedValues =action.payload.posts;
   }
   else if(action.type==="disLike"){
    updatedValues=curValue.map((item)=>item.id===action.payload.id?{...item,reactions: {
        ...item.reactions,
        dislikes: action.payload.dislikes++
    }}:item)
   }
   return updatedValues;
}
function ContextProvider({children}) {
    
    const[provideItems,dispachItems]=useReducer(reduceFunc,[]);
    const[check,setCheck]=useState(false);

    useEffect(()=>{
        const controller= new AbortController();
        const signal=controller.signal;
        setCheck(true);
        fetch('https://dummyjson.com/posts',{signal})
        .then(res => res.json())
        .then((data)=>{
          addListItemsDef(data.posts)
          setCheck(false);
        }
        );
        return ()=>{
          controller.abort;
        }
      }
      ,[]);

    const addListItems=(posts)=>{
        const changeItems={
            type:"addListItems",
            payload:posts
        }
        dispachItems(changeItems);
    }
    const addListItemsDef=(posts)=>{
        const changeItems={
            type:"addListItemsDef",
            payload:{
                posts
            }
        }
        dispachItems(changeItems);
    }

    const delListItems=(userId)=>{
        const changeItems={
            type:"DELETE_ITEM",
            payload:{userId}
        }
        dispachItems(changeItems);
    }

    const liked=(id,likes)=>{ 
        const changeItems={
            type:"Liked",
            payload:{id,likes}
        }
        dispachItems(changeItems);
    }
    const disLikes=(id,dislikes)=>{ 
        const changeItems={
            type:"disLike",
            payload:{id,dislikes}
        }
        dispachItems(changeItems);
    }
   
    return (
        <ContextItems.Provider 
        value={{provideItems, addListItems,
        delListItems,liked,addListItemsDef,disLikes}}>
        {children}
        </ContextItems.Provider>
    ) 
}


export default ContextProvider;
