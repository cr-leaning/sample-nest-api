import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsPort,
  IsUrl,
  validateSync,
} from 'class-validator';
import { NodeEnvEnum } from '../constants/nodeenv';

export class EnvValidator {
  @IsEnum(NodeEnvEnum)
  NODE_ENV: NodeEnvEnum;

  @IsPort()
  PORT: string;

  @IsUrl()
  @IsNotEmpty()
  API_BASE_URI: string;

  @IsNotEmpty()
  ORDER_API_ENDPOINT: string;

  @IsNotEmpty()
  BILLING_API_ENDPOINT: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvValidator, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: true,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
