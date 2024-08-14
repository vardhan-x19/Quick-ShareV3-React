import Card from "./Card";
import { useContext, useEffect, useState } from "react";
import { ContextItems } from "../Store/Context";
import styles from "./Cards.module.css";
import EmptyMsg from "./EmptyMsg";
import Load from "./Load";
import { useLoaderData } from "react-router-dom";

function Cards() {
    const {provideItems}=useContext(ContextItems);
    const {check}=useContext(ContextItems);
    // const provideItems= useLoaderData();
    // if(!provideItems || provideItems===null)
    // {
    //   return <Load></Load>
    // }
    return <div>
    <div>{check===true && <Load></Load>}</div>
    <div className= {styles.cards} >
    {provideItems.length===0 && <EmptyMsg ></EmptyMsg>}
    {provideItems.map((item)=> <Card key={item.id} item={item} ></Card>)}
    </div>
    </div>
}

// export const loaderPosts = async () => {
//   const response = await fetch('https://dummyjson.com/posts');
//   const data = await response.json();
//   return data.posts;
// }

export default Cards;