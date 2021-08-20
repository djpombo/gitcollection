import React from 'react';
import { Title, Form, Repos } from './styles';
import { FiChevronRight } from 'react-icons/fi';
import { api } from '../../services/api';

import logo from '../../assets/logo.svg';
import { useState } from 'react';


interface GithubRepository {
    full_name: string,
    description: string,
    owner:{
        login: string,
        avatar_url: string
    }
}

export const Dashboard: React.FC = () => {
    const [repos, setRepos] = useState<GithubRepository[]>([]);
    const [newRepo, setNewRepo] = useState<string>('');

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) : void {
        setNewRepo(event.target.value);
    }

    async function handleAddRepo(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const response = await api.get<GithubRepository>(`/repos/${newRepo}`);
        
        const repository = response.data;
        setRepos([...repos, repository]);
        setNewRepo('');
    }

    return (
        <>
            <img src={logo} alt="GitCollection" />
            <Title>Catalogo de repositórios do Github</Title>
            <Form onSubmit={ handleAddRepo }>
                <input placeholder="username/repository_name"
                    value={newRepo}
                    onChange={ handleInputChange } />
                <button type="submit" >Buscar</button>
            </Form>

            <Repos>
                {repos.map(item =>(
                    <a href="/repositories" key={item.full_name}>
                    <img src={item.owner.avatar_url}
                     alt={item.owner.login} />
                    <div>
                        <strong>{item.full_name}</strong>
                        <p>{item.description}</p>
                    </div>
                    <FiChevronRight size={20}/>
                </a>
                ))}
            </Repos>
        </>

    );
};