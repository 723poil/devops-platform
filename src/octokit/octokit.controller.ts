import { Controller, Get } from '@nestjs/common';
import { OctokitService } from 'nestjs-octokit';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Github Api')
@Controller('octokit')
export class OctokitController {

  constructor(
    private readonly octokitService: OctokitService,
  ) {
  }

  @Get('issues')
  async getRepos(): Promise<any> {
    return this.octokitService.paginate(
      this.octokitService.rest.issues.listForRepo,
      {
        owner: '723poil',
        repo: 'devops-platform',
        per_page: 100,
      },
    );
  }
}
