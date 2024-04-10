import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { OctokitService } from 'nestjs-octokit';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { OctokitIssueDto } from './dto/issues/octokit.issue.dto';

@ApiTags('Github Api')
@Controller('octokit')
export class OctokitController {
  constructor(private readonly octokitService: OctokitService) {}

  @ApiQuery({
    name: 'repo',
    required: false,
    example: '',
  })
  @ApiQuery({
    name: 'perPage',
    required: true,
    example: 100,
  })
  @ApiQuery({
    name: 'page',
    required: true,
    example: 1,
  })
  @Get('issues')
  async getRepos(
    @Query('repo') repo: string,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('page', ParseIntPipe) page: number,
  ): Promise<OctokitIssueDto[]> {
    const octokitResponse: any = await this.octokitService.paginate(
      this.octokitService.rest.issues.list,
      {
        owner: '723poil',
        repo: repo,
        per_page: perPage,
        page: page,
      },
    );

    return OctokitIssueDto.ofList(octokitResponse);
  }
}
