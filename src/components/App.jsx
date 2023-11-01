import styles from 'styles.module.css'
import React from "react";
import { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import { getPictures } from "API";
import  Button  from "./Button";
import Loader from './Loader';

export const App = () => {

    const [isErrore, setErrore] = useState(false);
    const [isPictures, setPictures] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isLoadMore, setLoadMore] = useState(false);
    const [isSearch, setSearch] = useState('');
    const [isPage, setPage] = useState(1);

    useEffect(() => {
        if (isSearch === '') {
            return
         }
        async function getSearch() {
            try {
                setLoading(true);
                setErrore(false);
                const pictures = await getPictures(isSearch, isPage);
                setPictures(prevState => [...prevState, ...pictures.hits]);
                setLoadMore(isPage < Math.ceil(pictures.totalHits / 12));
                  
          } catch(error) {
            setErrore(true)
          }
          
          finally {
              setLoading(false)
            }

        };
        getSearch();
    }, [isSearch, isPage]);

    const onSubmit = query => {
        setSearch(query);
        setPictures([]);
        setPage(1);
    }

    const onLoadMore = () => {
        setPage(prevState => prevState +1);
    }


    return (
        <div className={styles.App}>
            <Searchbar
                onSearchBtn={onSubmit}>
            </Searchbar>

            {isLoading && <Loader></Loader>}
            {isErrore && <b>Errore..try reload page.....</b>}
        
            <ImageGallery
                pictures={isPictures}
            >
            </ImageGallery>

            {isLoadMore && (
                <Button
                    onClick={onLoadMore}>
                </Button>
            )}
        </div>
    );
};