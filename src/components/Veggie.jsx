import React from 'react'
import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';


function Veggie() {
    const [veggie, setVeggie] = useState([]);

    useEffect(() => { getVeggie(); } ,[]);

    const getVeggie = async () => {

        const check = localStorage.getItem('veggie');

        if(check){
            setVeggie(JSON.parse(check));
        }
        else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
            const data = await api.json();

            localStorage.setItem('veggie', JSON.stringify(data.recipes));
            setVeggie(data.recipes);
            console.log(data.recipes);
        }
    };

  return (
    <div> 
        <Wrapper>
            <h2>Veggie Lover's Picks </h2>
                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "2rem",
                }}>
                    {veggie.map ((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={"/recipe/"+recipe.id}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} /> 
                                    </Link>
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
       </Wrapper>
  </div>
  )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 15rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
    border: 1px ;
    
    img{
        border-radius: 2rem;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%,0%);
        color: white;
        width: 100%%;
        text-align:center;
        font-weight: 600;
        font-size: 1.25rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;



export default Veggie
