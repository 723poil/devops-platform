import { Controller, Get, Query } from '@nestjs/common';
import { OctokitService } from 'nestjs-octokit';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  IOctokitIssueDto,
  OctokitIssueDto,
} from './dto/issues/octokit.issue.dto';
import { IOctokitRepoDto, OctokitRepoDto } from './dto/issues/octokit.repo.dto';

@ApiTags('Github Api')
@Controller('octokit')
export class OctokitController {
  constructor(private readonly octokitService: OctokitService) {}

  @ApiQuery({
    name: 'repo',
    required: false,
    example: '',
  })
  @Get('issues')
  async getIssues(@Query('repo') repoNm: string): Promise<IOctokitIssueDto[]> {
    const { owner, repos } = await this.getUser();

    const result: IOctokitIssueDto[] = [];

    for (const repo of repos) {
      if (repoNm && repoNm !== repo.name) {
        continue;
      }

      const octokitResponse: any = (
        await this.octokitService.rest.issues.listForRepo({
          owne  r: owner,
          repo: repo.name,
        })
      ).data;

      result.push(
        ...OctokitIssueDto.ofList(octokitResponse, repo.name, +repo.id),
      );
    }

    return result;
  }

  private async getUser(): Promise<{
    owner: string;
    repos: IOctokitRepoDto[];
  }> {
    const res = (await this.octokitService.rest.users.getAuthenticated()).data;

    const repos = (await this.octokitService.request(res.repos_url)).data;

    const repoList: IOctokitRepoDto[] = OctokitRepoDto.ofList(repos);

    return {
      owner: res.login,
      repos: repoList,
    };
  }
}
