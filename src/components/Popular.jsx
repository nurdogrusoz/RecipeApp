import { useEffect, useState } from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import {Link} from "react-router-dom";

function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect(() => { getPopular(); } ,[]);

    const getPopular = async () => {

        const check = localStorage.getItem('popular');

        if(check){
            setPopular(JSON.parse(check));
        }
        else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
            const data = await api.json();

            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
            console.log(data.recipes);
        }
    };


  return (
    <div> 
        <Wrapper>
            <h2>Popular Picks</h2>
                <Splide options={{
                    perPage: 5,
                    arrows: true,
                    pagination: false,
                    drag: "free",
                    gap: "1.5rem",   
                }}>
                    {popular.map ((recipe) => {
                        return (
                            <SplideSlide key={recipe.id}>
                                <Card>
                                    <Link to={"/recipe/" + recipe.id}>
                                    <img src={recipe.image} alt={recipe.title} /> 
                                    </Link>
                                </Card>
                                <p>{recipe.title}</p>
                            </SplideSlide>
                        );
                    })}
                </Splide>
       </Wrapper>
  </div>
  );
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 21rem;
    max-width: 17rem;
    border-radius:  16px;
    overflow: hidden;
    position: relative;
    grid-margin: 3rem;
}
    
    img{
        border-radius: 16px;;
        position: absolute;
        left: 0;
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
        line-height: 1.5;
        max-height: 3em; /* 2 lines, given the line height is 1.5em */
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        line-height: 1.2em;
        font-size: 20px;
        font-weight: 600;
        overflow-wrap: normal;
        color: rgb(0, 0, 0);
        letter-spacing: 0.02em;
    }
`;



    ;
export default Popular;
