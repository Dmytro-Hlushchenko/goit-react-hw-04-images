import styles from 'styles.module.css'
import React from "react";
import { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import { getPictures } from "API";
import  Button  from "./Button";
import Loader from './Loader';

export const App = () => {

    const [errore, setErrore] = useState(false);
    const [pictures, setPictures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (search === '') {
            return
         }
        async function getSearch() {
            try {
                setLoading(true);
                setErrore(false);
                const pictures = await getPictures(search, page);
                setPictures(prevState => [...prevState, ...pictures.hits]);
                setLoadMore(page < Math.ceil(pictures.totalHits / 12));
                  
          } catch(error) {
            setErrore(true)
          }
          
          finally {
              setLoading(false)
            }

        };
        getSearch();
    }, [search, page]);

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

            {loading && <Loader></Loader>}
            {errore && <b>Errore..try reload page.....</b>}
        
            <ImageGallery
                pictures={pictures}
            >
            </ImageGallery>

            {loadMore && (
                <Button
                    onClick={onLoadMore}>
                </Button>
            )}
        </div>
    );
};