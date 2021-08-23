import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { Header, RepoInfo, Issues } from './styles';

import { api } from '../../services/api'

import logo from '../../assets/logo.svg'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useEffect } from 'react';
import { useState } from 'react';

interface RepositoryParams {
    repository: string;
}

interface RepositoryData {
    full_name: string;
    description: string;
    forks_count: number;
    stargazers_count: number;
    open_issues_count: number;
    owner: {
        avatar_url: string;
        id: number;
    }

}

interface GithubIssue {
    id: number;
    title: string;
    html_url: string;
    login: string;


}

const Repo: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();

    const [repo, setRepo] = useState<RepositoryData | null>(null);
    const [issues, setIssues] = useState<GithubIssue[]>([]);

    useEffect(() => {
        api.get(`repos/${params.repository}`)
            .then(response => {

                setRepo(response.data);
            });

        api.get(`repos/${params.repository}/issues`)
            .then(response => {
                setIssues(response.data);
            });
    }, [params.repository])
    return (
        <>
            <Header>
                <img src={logo} alt="Git collection" />
                <Link to="/">
                    <FiChevronLeft size={20} />
                    Voltar
                </Link>

            </Header>

            {repo && (
                <RepoInfo>
                    <header>
                        <img src={repo.owner.avatar_url} alt={repo.full_name} />
                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repo.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repo.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repo.open_issues_count}</strong>
                            <span>Issues</span>
                        </li>
                    </ul>
                </RepoInfo>
            )}

            {issues && (
                <Issues>
                    {issues.map(issue => {
                        return (
                            <a href={issue.html_url} key={issue.id}>
                                <div>
                                    <strong>{issue.title}</strong>
                                    <p>{issue.login}</p>
                                </div>
                                <FiChevronRight size={20} />

                            </a>
                        )
                    })}
                </Issues>
            )}

        </>

    );
};

export default Repo;