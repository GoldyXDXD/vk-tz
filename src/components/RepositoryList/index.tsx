import React, { useEffect, useCallback, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RepositoryContext } from '../../stores/RepositoryStore';
import ListItem from '../ListItem';
import Loader from '../Loader';
import { debounce } from '../../utils/debounce';
import styles from './RepositoryList.module.css';

const RepositoryList: React.FC = observer(() => {
    const repositoryStore = useContext(RepositoryContext);

    const loadMoreRepositories = useCallback(
        debounce(() => {
            if (!repositoryStore.isLoading) {
                repositoryStore.fetchMoreRepositories();
            }
        }, 300), // Задержка 300 мс
        [repositoryStore]
    );

    useEffect(() => {
        repositoryStore.fetchRepositories();

        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                loadMoreRepositories();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreRepositories, repositoryStore]);

    if (repositoryStore.isLoading && repositoryStore.repositories.length === 0) {
        return <Loader />;
    }

    return (
        <div className={styles.list}>
            {repositoryStore.repositories.map(repo => (
                <ListItem key={repo.id} repo={repo} onDelete={() => repositoryStore.deleteRepository(repo.id)} />
            ))}
            {repositoryStore.isLoading && <Loader />}
        </div>
    );
});

export default RepositoryList;
