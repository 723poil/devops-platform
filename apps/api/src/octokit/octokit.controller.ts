import { Controller, Get } from '@nestjs/common';
import { OctokitService } from 'nestjs-octokit';

@Controller('octokit')
export class OctokitController {

  constructor(
    private readonly octokitService: OctokitService,
  ) {
  }

  @Get()
  async getRepos(): Promise<string> {
    return (await this.octokitService.rest.search.users({q: '723poil'})).data.items[0]?.login;
  }
}
