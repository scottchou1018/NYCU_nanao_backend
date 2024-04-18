import { PartialType } from '@nestjs/mapped-types';
import { CreateYearformDto } from './create-yearform.dto';

export class UpdateYearformDto extends PartialType(CreateYearformDto) {}
