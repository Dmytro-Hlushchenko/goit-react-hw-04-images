import styles from 'styles.module.css'
import React, { useState } from 'react';
import { ImageModal } from 'components/Modal';

export const ImageGalleryItem = ({picture}) => {
    const [isModalOpen, setModalWindow] = useState(false);

    const toggle = () => {
        setModalWindow(true);
    };

    return (
        <>
            <li className={styles.ImageGalleryItem}>
                <img className={styles['ImageGalleryItem-image']}
                    src={picture.webformatURL}
                    alt={picture.tags}
                    onClick={toggle}
                />
            </li>
       
            <ImageModal
                isOpenModal={isModalOpen}
                largeImg={picture.largeImageURL}
                isCloseModal={toggle}
                tags={picture.tags}
            />
        </>
    )
};