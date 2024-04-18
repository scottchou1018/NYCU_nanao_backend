import { PartialType } from '@nestjs/mapped-types';
import { CreateWeekformDto } from './create-weekform.dto';

export class UpdateWeekformDto extends PartialType(CreateWeekformDto) {}
