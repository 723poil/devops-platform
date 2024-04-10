import { dateToNumber } from '../../../util/date.util';

export interface IOctokitIssueDto {
  url: string;
  issueNum: number;
  id: number;
  repositoryUrl: string;
  title: string;
  labels: string[];
  state: string;
  createdAt: number;
  updatedAt: number;
  closedAt: number;
  repoNm: string;
  repoId: number;
}

export class OctokitIssueDto implements IOctokitIssueDto {
  closedAt: number;
  createdAt: number;
  id: number;
  issueNum: number;
  labels: string[];
  repoNm: string;
  repoId: number;
  repositoryUrl: string;
  state: string;
  title: string;
  updatedAt: number;
  url: string;

  static of(octokitResponse: any): OctokitIssueDto {
    const labels: string[] = [];

    for (const label of octokitResponse.labels) {
      labels.push(label.name);
    }

    return {
      closedAt: dateToNumber(octokitResponse.closed_at),
      createdAt: dateToNumber(octokitResponse.created_at),
      updatedAt: dateToNumber(octokitResponse.updated_at),
      id: octokitResponse.id,
      issueNum: octokitResponse.number,
      repoNm: octokitResponse.repository.name,
      repoId: octokitResponse.repository.id,
      repositoryUrl: octokitResponse.html_url,
      state: octokitResponse.state,
      title: octokitResponse.title,
      url: octokitResponse.url,
      labels: labels,
    };
  }

  static ofList(octokitResponse: any[]): OctokitIssueDto[] {
    const octokitIssues: OctokitIssueDto[] = [];

    for (const octokitRes of octokitResponse) {
      octokitIssues.push(OctokitIssueDto.of(octokitRes));
    }

    return octokitIssues;
  }
}
