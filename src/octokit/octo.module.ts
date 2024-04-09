import { Module } from '@nestjs/common';
import { OctokitController } from './octokit.controller';

@Module({
  imports: [],
  controllers: [OctokitController],
  providers: [],
})
export class OctoModule {}
