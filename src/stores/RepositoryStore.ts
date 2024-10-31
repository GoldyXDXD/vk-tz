import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import React from "react";

interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
}

class RepositoryStore {
    repositories: Repository[] = [];
    isLoading: boolean = false;
    page: number = 1;

    constructor() {
        makeAutoObservable(this);
    }

    // Для загрузки репозиториев
    fetchRepositories = async () => {
        this.isLoading = true;
        try {
            const response = await axios.get(`https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${this.page}`);
            this.repositories = response.data.items;
            this.page += 1;
        } catch (error) {
            console.error('Failed to fetch repositories:', error);
        } finally {
            this.isLoading = false;
        }
    };

    // Загружаем доп элементы
    fetchMoreRepositories = async () => {
        if (this.isLoading) return;

        this.isLoading = true;
        try {
            const response = await axios.get(`https://api.github.com/search/repositories?q=javascript&sort=stars&order=asc&page=${this.page}`);
            this.repositories.push(...response.data.items);
            this.page += 1;
        } catch (error) {
            console.error('Failed to fetch more repositories:', error);
        } finally {
            this.isLoading = false;
        }
    };

    deleteRepository = (id: number) => {
        this.repositories = this.repositories.filter(repo => repo.id !== id);
    };
}

export const repositoryStore = new RepositoryStore();
export const RepositoryContext = React.createContext(repositoryStore);
