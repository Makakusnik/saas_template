import { SetMetadata } from '@nestjs/common';

export const OPTIONAL_KEY = 'OPTIONAL';
export const Optional = () => SetMetadata(OPTIONAL_KEY, true);
