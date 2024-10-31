import React from 'react';
import styles from './ListItem.module.css';
import CloseButton from "../CloseButton";

interface ListItemProps {
    repo: {
        id: number;
        name: string;
        description: string;
        html_url: string;
    };
    onDelete: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ repo, onDelete }) => {
    return (
        <div className={styles.item}>
            <div className={styles.info}>
                <div>
                    <h3><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></h3>
                    <p>{repo.description}</p>
                </div>
                <CloseButton onClick={onDelete} />
            </div>
        </div>
    );
};

export default ListItem;
