import React from 'react';
import { Title, Form, Repos, Error, BtnClear } from './styles';
import { FiChevronRight } from 'react-icons/fi';
import { api } from '../../services/api';

import logo from '../../assets/logo.svg';
import { useState } from 'react';
import { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useRef } from 'react';


interface GithubRepository {
    full_name: string,
    description: string,
    owner: {
        login: string,
        avatar_url: string
    }
}

export const Dashboard: React.FC = () => {
    const [repos, setRepos] = useState<GithubRepository[]>(() => {
        const storageRepos = localStorage.getItem('@GitCollection:repositories');
        if (storageRepos) {
            return JSON.parse(storageRepos);
        } else {
            return [];
        }
    });
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const formEl = useRef<HTMLFormElement | null>(null);


    useEffect(() => {
        localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos))
    }, [repos]);



    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setNewRepo(event.target.value);
    }

    async function handleAddRepo(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        if (!newRepo) {
            setInputError('Informe o username/repositorio');
            return;
        }
        try {
            const response = await api.get<GithubRepository>(`/repos/${newRepo}`);

            const repository = response.data;
            setRepos([...repos, repository]);
            formEl.current?.reset();
            setNewRepo('');
            setInputError('');

        } catch  {
            setInputError('Repositorio nao encontrado no GitHub');
        }
    }

    function handleClear() {
        localStorage.removeItem('@GitCollection:repositories');
        setRepos([]);
    }

    

    return (
        <>
            <img src={logo} alt="GitCollection" />
            <Title>Catalogo de repositórios do Github</Title>
            <Form
                ref={formEl}
                hasError={Boolean(inputError)}
                onSubmit={handleAddRepo}>

                <input placeholder="username/repository_name"
                    onChange={handleInputChange} />
                <button type="submit" >Buscar</button>
            </Form>
            {inputError && <Error>{inputError}</Error>}

            <Repos>
                {repos.map((item, index) => (
                    <Link to={`/repositories/${item.full_name}`} key={item.full_name + index}>
                        <img src={item.owner.avatar_url}
                            alt={item.owner.login} />
                        <div>
                            <strong>{item.full_name}</strong>
                            <p>{item.description}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repos>
            <>
                {repos && <BtnClear onClick={handleClear}>Limpar Cache</BtnClear>}

            </>
        </>

    );
};