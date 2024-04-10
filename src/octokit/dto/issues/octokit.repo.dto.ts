import { dateToNumber } from '../../../util/date.util';

export interface IOctokitRepoDto {
  id: number;
  name: string;
  private: boolean;
  url: string;
  fork: boolean;
  createdAt: number;
  updatedAt: number;
  pushedAt: number;
}

export class OctokitRepoDto implements IOctokitRepoDto {
  createdAt: number;
  fork: boolean;
  id: number;
  name: string;
  private: boolean;
  pushedAt: number;
  updatedAt: number;
  url: string;

  static of(repo: any): IOctokitRepoDto {
    return {
      createdAt: dateToNumber(repo.created_at),
      fork: repo.fork,
      id: repo.id,
      name: repo.name,
      private: repo.private,
      pushedAt: dateToNumber(repo.pushed_at),
      updatedAt: dateToNumber(repo.updated_at),
      url: repo.url,
    };
  }

  static ofList(repos: any): IOctokitRepoDto[] {
    const repoList: IOctokitRepoDto[] = [];

    for (const repo of repos) {
      repoList.push(OctokitRepoDto.of(repo));
    }

    return repoList;
  }
}
